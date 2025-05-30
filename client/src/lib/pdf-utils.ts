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
  const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 30;
  const titleSpace = 50;

  for (let i = 0; i < tabs.length; i++) {
    const tab = tabs[i];
    
    // Switch to the tab
    setActiveTab(tab.id);
    
    // Wait for content to load
    await new Promise(resolve => setTimeout(resolve, tab.waitTime || 1500));
    
    const element = document.getElementById('dashboard-content');
    if (!element) {
      console.error(`Dashboard content not found for tab: ${tab.id}`);
      continue;
    }

    // Force layout calculation
    element.style.minHeight = 'auto';
    element.style.height = 'auto';
    await new Promise(resolve => setTimeout(resolve, 500));

    const elementWidth = Math.max(element.scrollWidth, element.offsetWidth, 1200);
    const elementHeight = Math.max(element.scrollHeight, element.offsetHeight);

    const canvas = await html2canvas(element, {
      scale: tab.captureScale || 1.5,
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

    // Add new page for subsequent tabs
    if (i > 0) pdf.addPage();

    // Add title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${tab.label} Dashboard`, pageWidth / 2, 30, { align: 'center' });

    // Calculate consistent dimensions and centering
    const availableWidth = pageWidth - (margin * 2);
    const availableHeight = pageHeight - (margin * 2) - titleSpace;
    
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = Math.min(availableWidth / canvasWidth, availableHeight / canvasHeight);
    
    const imgWidth = canvasWidth * ratio;
    const imgHeight = canvasHeight * ratio;
    
    // Consistent centering for all tabs
    const x = (pageWidth - imgWidth) / 2;
    const y = titleSpace + margin;

    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
  }

  // Restore original tab
  setActiveTab(currentTab);
  
  pdf.save(filename);
};