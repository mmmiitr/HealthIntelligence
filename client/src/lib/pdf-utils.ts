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
  // Prevent multiple simultaneous downloads with improved checking
  const exportKey = 'pdfExportInProgress_' + Date.now();
  if ((window as any).pdfExportInProgress) {
    console.log('PDF export already in progress');
    return;
  }
  
  (window as any).pdfExportInProgress = true;
  (window as any).currentExportKey = exportKey;
  
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
      
      // Direct capture with forced standardization for all tabs
      const canvas = await html2canvas(element, {
        scale: 1.0,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 1200,
        height: actualHeight,
        windowWidth: 1400,
        windowHeight: Math.max(actualHeight + 200, 1000),
        scrollX: 0,
        scrollY: 0,
        logging: false,
        onclone: (clonedDoc) => {
          // Apply minimal styling for consistent capture
          const clonedElement = clonedDoc.getElementById('dashboard-content');
          if (clonedElement) {
            clonedElement.style.width = '1200px';
            clonedElement.style.maxWidth = '1200px';
            clonedElement.style.padding = '24px';
            clonedElement.style.margin = '0 auto';
            clonedElement.style.boxSizing = 'border-box';
          }
        }
      });

      // Create a standardized canvas to ensure consistent width for all dashboards
      const standardCanvas = document.createElement('canvas');
      const ctx = standardCanvas.getContext('2d')!;
      
      // Set consistent dimensions for all pages
      const TARGET_WIDTH = 1200;
      const TARGET_HEIGHT = Math.max(canvas.height, 800);
      
      standardCanvas.width = TARGET_WIDTH;
      standardCanvas.height = TARGET_HEIGHT;
      
      // Fill with white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, standardCanvas.width, standardCanvas.height);
      
      // Scale and center the content to fit consistently
      const scale = Math.min(TARGET_WIDTH / canvas.width, 1);
      const scaledWidth = canvas.width * scale;
      const scaledHeight = canvas.height * scale;
      
      // Center horizontally
      const x = (TARGET_WIDTH - scaledWidth) / 2;
      const y = 0;
      
      // Draw the original canvas onto the standardized canvas
      ctx.drawImage(canvas, x, y, scaledWidth, scaledHeight);
      
      const finalCanvas = standardCanvas;

      // Add new page for subsequent tabs
      if (i > 0) pdf.addPage();

      // Add centered title
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${tab.label} Dashboard`, pageWidth / 2, 35, { align: 'center' });

      // Calculate scaling to fit within PDF page with reduced margins
      const PDF_MARGIN = 15; // Further reduced margin for maximum width utilization
      const availableWidth = pageWidth - (PDF_MARGIN * 2);
      const availableHeight = pageHeight - CONTENT_START_Y - PDF_MARGIN;
      
      const pdfScaleX = availableWidth / finalCanvas.width;
      const pdfScaleY = availableHeight / finalCanvas.height;
      const pdfScale = Math.min(pdfScaleX, pdfScaleY, 1);
      
      const pdfScaledWidth = finalCanvas.width * pdfScale;
      const pdfScaledHeight = finalCanvas.height * pdfScale;
      
      // Always center horizontally
      const pdfX = (pageWidth - pdfScaledWidth) / 2;
      const pdfY = CONTENT_START_Y;

      const imgData = finalCanvas.toDataURL("image/png", 0.95);
      pdf.addImage(imgData, "PNG", pdfX, pdfY, pdfScaledWidth, pdfScaledHeight);
    }

    // Restore original tab
    setActiveTab(currentTab);
    
    // Add final delay before saving
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Save the PDF
    pdf.save(filename);
    
  } finally {
    // Reset the flags with delay to prevent rapid re-triggering
    setTimeout(() => {
      (window as any).pdfExportInProgress = false;
      (window as any).currentExportKey = null;
    }, 2000);
  }
};