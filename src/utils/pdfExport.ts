
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (
  frameRef: React.RefObject<HTMLDivElement>,
  documentId: number | null,
  documentTitle: string
): Promise<void> => {
  if (!frameRef.current || !documentId) {
    throw new Error('Editor frame not found');
  }
  
  // Get the OnlyOffice frame content
  const frameElement = frameRef.current.querySelector(`#ds-frame-${documentId}`);
  if (!frameElement) {
    throw new Error('Editor frame not found');
  }
  
  // Convert to canvas
  const canvas = await html2canvas(frameElement as HTMLElement, {
    backgroundColor: 'white',
    scale: 2,
    useCORS: true,
    allowTaint: true
  });
  
  // Create PDF
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 210; // A4 width in mm
  const pageHeight = 295; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  
  let position = 0;
  
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;
  
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
  
  // Download the PDF
  pdf.save(`${documentTitle || 'dokumen'}.pdf`);
};
