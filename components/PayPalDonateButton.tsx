"use client"

import { ExternalLink } from "lucide-react";

export default function PayPalDonateButton() {
  const handlePayPalClick = () => {
    // Create a form and submit it to open PayPal in new tab
    const form = document.createElement('form');
    form.action = 'https://www.paypal.com/donate';
    form.method = 'post';
    form.target = '_blank';
    
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'hosted_button_id';
    input.value = 'RE826F29VP4FA';
    
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <div className="text-center">
      <button 
        onClick={handlePayPalClick}
        className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-black text-white shadow hover:bg-gray-800 dark:border dark:border-input dark:bg-background dark:shadow-sm dark:hover:bg-accent dark:hover:text-accent-foreground gap-2"
        title="Donate with PayPal"
      >
        Donate with PayPal
        <ExternalLink className="h-4 w-4" />
      </button>
    </div>
  );
} 