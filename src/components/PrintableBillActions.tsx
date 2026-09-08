'use client';

import { Download } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function PrintableBillActions({
  orderId = 'NEW',
  customerName = 'Valued Customer',
  plantName = 'Nursery Plant',
  quantity = 1,
  totalAmount = '₹0',
  paymentMethod = 'Cash on Delivery',
  orderDate = new Date().toLocaleDateString(),
}: {
  orderId?: string;
  customerName?: string;
  plantName?: string;
  quantity?: number;
  totalAmount?: string;
  paymentMethod?: string;
  orderDate?: string;
}) {
  const { success, error: toastError } = useToast();

  const handleDownloadBillImage = () => {
    try {
      const shortId = orderId.length > 8 ? orderId.substring(0, 8).toUpperCase() : orderId;

      // Draw official bill onto an HTML5 Canvas to produce an actual PNG image file download
      const canvas = document.createElement('canvas');
      canvas.width = 750;
      canvas.height = 900;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas context not available');
      }

      // Background Card
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Card Border & Rounded Corners Simulation
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 4;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      // Header Banner (Emerald)
      ctx.fillStyle = '#047857';
      ctx.fillRect(20, 20, canvas.width - 40, 110);

      // Nursery Title
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText('🌱 AI NURSERY', 45, 68);

      ctx.font = '15px sans-serif';
      ctx.fillStyle = '#A7F3D0';
      ctx.fillText('Official Tax Invoice & Receipt', 48, 98);

      // Right Header - Status Badge
      ctx.fillStyle = '#065F46';
      ctx.fillRect(canvas.width - 220, 45, 180, 40);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('✓ CONFIRMED', canvas.width - 180, 70);

      // Order Reference Box
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(40, 150, canvas.width - 80, 75);
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1;
      ctx.strokeRect(40, 150, canvas.width - 80, 75);

      ctx.fillStyle = '#64748B';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('ORDER REFERENCE NO.', 60, 178);

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 24px monospace';
      ctx.fillText(`#${shortId}`, 60, 208);

      ctx.fillStyle = '#64748B';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('INVOICE DATE', canvas.width - 220, 178);

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(orderDate, canvas.width - 220, 205);

      // Billed To & Payment Method Section
      ctx.fillStyle = '#F1F5F9';
      ctx.fillRect(40, 245, canvas.width - 80, 95);

      ctx.fillStyle = '#475569';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('BILLED TO:', 60, 272);

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText(customerName, 60, 298);

      ctx.fillStyle = '#475569';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('PAYMENT METHOD:', canvas.width - 320, 272);

      ctx.fillStyle = '#047857';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText(paymentMethod, canvas.width - 320, 298);

      // Table Header
      ctx.fillStyle = '#E2E8F0';
      ctx.fillRect(40, 360, canvas.width - 80, 45);

      ctx.fillStyle = '#334155';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('ITEM DESCRIPTION', 60, 388);
      ctx.fillText('QTY', canvas.width - 280, 388);
      ctx.fillText('TOTAL AMOUNT', canvas.width - 180, 388);

      // Table Row
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(40, 405, canvas.width - 80, 65);
      ctx.strokeStyle = '#F1F5F9';
      ctx.strokeRect(40, 405, canvas.width - 80, 65);

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(plantName, 60, 442);

      ctx.font = '16px sans-serif';
      ctx.fillText(`${quantity}`, canvas.width - 270, 442);

      ctx.font = 'bold 16px sans-serif';
      ctx.fillStyle = '#047857';
      ctx.fillText(totalAmount, canvas.width - 180, 442);

      // Highlighted Total Amount Banner (Dark Green)
      ctx.fillStyle = '#064E3B';
      ctx.fillRect(40, 500, canvas.width - 80, 110);

      ctx.fillStyle = '#A7F3D0';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('TOTAL PAID / DUE', 65, 538);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 38px sans-serif';
      ctx.fillText(totalAmount, 65, 585);

      ctx.fillStyle = '#6EE7B7';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText('✓ Guarantee Included', canvas.width - 230, 560);

      // Footer Notes
      ctx.fillStyle = '#94A3B8';
      ctx.font = '13px sans-serif';
      ctx.fillText('Thank you for shopping with AI Nursery! 🌱', 40, 650);
      ctx.fillText('For support & care advice visit: http://localhost:3000', 40, 675);

      // Trigger Direct Image Download
      const dataUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `AI_Nursery_Bill_${shortId}.png`;
      downloadLink.href = dataUrl;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      success(`Bill downloaded as AI_Nursery_Bill_${shortId}.png!`);
    } catch (err: any) {
      console.error('Bill image download failed:', err);
      toastError('Could not generate bill image.');
    }
  };

  return (
    <div className="pt-2 print:hidden">
      <button
        onClick={handleDownloadBillImage}
        className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-2xl transition shadow-md flex items-center justify-center gap-2 text-sm"
      >
        <Download className="w-5 h-5 text-emerald-300" /> Download Official Bill Image (PNG)
      </button>
    </div>
  );
}
