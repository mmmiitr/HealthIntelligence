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

      // Direct capture with forced centering using canvas manipulation
      const canvas = await html2canvas(element, {
        scale: 1.3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: Math.max(element.scrollWidth, 1200),
        height: element.scrollHeight,
        windowWidth: 1400,
        windowHeight: element.scrollHeight + 200,
        scrollX: 0,
        scrollY: 0,
        logging: false
      });

      // Create a new centered canvas with consistent dimensions
      const centeredCanvas = document.createElement('canvas');
      const ctx = centeredCanvas.getContext('2d')!;
      
      // Set standard dimensions for all tabs
      centeredCanvas.width = 1200;
      centeredCanvas.height = Math.max(canvas.height, 800);
      
      // Fill with white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, centeredCanvas.width, centeredCanvas.height);
      
      // Calculate centering position
      const sourceWidth = Math.min(canvas.width, 1120); // Max content width
      const xOffset = (centeredCanvas.width - sourceWidth) / 2;
      const yOffset = 40; // Top margin
      
      // Draw the original canvas content centered on the new canvas
      ctx.drawImage(
        canvas,
        0, 0, sourceWidth, canvas.height, // Source dimensions
        xOffset, yOffset, sourceWidth, canvas.height // Destination dimensions
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
      
      const scaledWidth = finalCanvas.width * scale;
      const scaledHeight = finalCanvas.height * scale;
      
      // Always center horizontally
      const x = (pageWidth - scaledWidth) / 2;
      const y = CONTENT_START_Y;

      const imgData = finalCanvas.toDataURL("image/png", 0.95);
      pdf.addImage(imgData, "PNG", x, y, scaledWidth, scaledHeight);
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