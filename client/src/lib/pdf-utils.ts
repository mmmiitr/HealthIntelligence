import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface PDFExportOptions {
  elementId: string;
  filename: string;
  title: string;
  pageOrientation?: 'portrait' | 'landscape';
  margin?: number;
  titleSpace?: number;
}

interface TabExportConfig {
  id: string;
  label: string;
  captureScale?: number;
  waitTime?: number;
}

export const exportSinglePageToPDF = async (options: PDFExportOptions): Promise<void> => {
  const {
    elementId,
    filename,
    title,
    pageOrientation = 'portrait',
    margin = 30,
    titleSpace = 50
  } = options;

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with ID ${elementId} not found`);
  }

  // Force layout calculation
  element.style.minHeight = 'auto';
  element.style.height = 'auto';
  await new Promise(resolve => setTimeout(resolve, 500));

  const elementWidth = Math.max(element.scrollWidth, element.offsetWidth, 1200);
  const elementHeight = Math.max(element.scrollHeight, element.offsetHeight);

  const canvas = await html2canvas(element, {
    scale: 1.5,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    width: elementWidth,
    height: elementHeight,
    windowWidth: 1400,
    windowHeight: 800,
    scrollX: 0,
    scrollY: 0
  });

  const pdf = new jsPDF({ orientation: pageOrientation, unit: "pt", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Add title
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text(title, pageWidth / 2, 30, { align: 'center' });

  // Calculate consistent centering
  const availableWidth = pageWidth - (margin * 2);
  const availableHeight = pageHeight - (margin * 2) - titleSpace;
  
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const ratio = Math.min(availableWidth / canvasWidth, availableHeight / canvasHeight);
  
  const imgWidth = canvasWidth * ratio;
  const imgHeight = canvasHeight * ratio;
  
  // Always center horizontally
  const x = (pageWidth - imgWidth) / 2;
  const y = titleSpace + margin;

  const imgData = canvas.toDataURL("image/png");
  pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
  
  pdf.save(filename);
};

export const exportMultipleTabsToPDF = async (
  tabs: TabExportConfig[],
  setActiveTab: (tabId: string) => void,
  currentTab: string,
  filename: string = "dashboard-export.pdf"
): Promise<void> => {
  // Prevent multiple simultaneous downloads
  if ((window as any).pdfExportInProgress) {
    console.log('PDF export already in progress');
    return;
  }
  
  (window as any).pdfExportInProgress = true;
  
  try {
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Fixed positioning constants for consistency
    const MARGIN = 40;
    const TITLE_HEIGHT = 60;
    const CONTENT_START_Y = TITLE_HEIGHT + MARGIN;

    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      
      // Switch to the tab
      setActiveTab(tab.id);
      
      // Wait for content to load and render
      await new Promise(resolve => setTimeout(resolve, tab.waitTime || 2000));
      
      const element = document.getElementById('dashboard-content');
      if (!element) {
        console.error(`Dashboard content not found for tab: ${tab.id}`);
        continue;
      }

      // Force a complete layout recalculation
      element.style.minHeight = 'auto';
      element.style.height = 'auto';
      element.style.width = 'auto';
      
      // Additional wait for layout stabilization
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get actual content dimensions and ensure consistent capture
      const actualWidth = Math.max(element.scrollWidth, element.offsetWidth, 1200);
      const actualHeight = Math.max(element.scrollHeight, element.offsetHeight);
      
      // Direct capture with improved settings for all tabs
      const canvas = await html2canvas(element, {
        scale: 1.2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: actualWidth,
        height: actualHeight,
        windowWidth: 1400,
        windowHeight: Math.max(actualHeight + 200, 1000),
        scrollX: 0,
        scrollY: 0,
        logging: false,
        onclone: (clonedDoc) => {
          // Ensure consistent styling in cloned document
          const clonedElement = clonedDoc.getElementById('dashboard-content');
          if (clonedElement) {
            clonedElement.style.maxWidth = '1200px';
            clonedElement.style.margin = '0 auto';
            clonedElement.style.padding = '24px';
          }
        }
      });

      // Create a properly sized and centered canvas
      const targetWidth = 1200;
      const targetHeight = Math.max(canvas.height, 900);
      
      const centeredCanvas = document.createElement('canvas');
      const ctx = centeredCanvas.getContext('2d')!;
      
      centeredCanvas.width = targetWidth;
      centeredCanvas.height = targetHeight;
      
      // Fill with white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, centeredCanvas.width, centeredCanvas.height);
      
      // Calculate optimal scaling and centering
      const contentMaxWidth = 1120; // Leave margins
      const scaleToFit = Math.min(contentMaxWidth / canvas.width, 1);
      const canvasScaledWidth = canvas.width * scaleToFit;
      const canvasScaledHeight = canvas.height * scaleToFit;
      
      const xOffset = (centeredCanvas.width - canvasScaledWidth) / 2;
      const yOffset = 20; // Consistent top margin
      
      // Draw the scaled and centered content
      ctx.drawImage(
        canvas,
        0, 0, canvas.width, canvas.height,
        xOffset, yOffset, canvasScaledWidth, canvasScaledHeight
      );

      // Use the centered canvas for PDF
      const finalCanvas = centeredCanvas;

      // Add new page for subsequent tabs
      if (i > 0) pdf.addPage();

      // Add centered title
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${tab.label} Dashboard`, pageWidth / 2, 35, { align: 'center' });

      // Calculate scaling to fit within PDF page
      const availableWidth = pageWidth - (MARGIN * 2);
      const availableHeight = pageHeight - CONTENT_START_Y - MARGIN;
      
      const scaleX = availableWidth / finalCanvas.width;
      const scaleY = availableHeight / finalCanvas.height;
      const scale = Math.min(scaleX, scaleY, 1);
      
      const pdfScaledWidth = finalCanvas.width * scale;
      const pdfScaledHeight = finalCanvas.height * scale;
      
      // Always center horizontally
      const x = (pageWidth - pdfScaledWidth) / 2;
      const y = CONTENT_START_Y;

      const imgData = finalCanvas.toDataURL("image/png", 0.95);
      pdf.addImage(imgData, "PNG", x, y, pdfScaledWidth, pdfScaledHeight);
    }

    // Restore original tab
    setActiveTab(currentTab);
    
    // Save the PDF
    pdf.save(filename);
    
  } finally {
    // Reset the flag
    (window as any).pdfExportInProgress = false;
  }
};