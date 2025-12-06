import { useState } from "react";

export default function ColorCard({ color }: { color: string }) {
  const [copied, setCopied] = useState(false);

  const copyHex = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div 
      className="
        group flex flex-col items-center gap-2 cursor-pointer 
        transition-transform duration-300 
        hover:scale-105
      "
      onClick={copyHex}
    >
      <div
        className="
          w-12 h-16 rounded-xl shadow 
          transition-all duration-300 
          group-hover:shadow-lg
        "
        style={{ background: color }}
      />

      <div className="text-sm font-mono text-black dark:text-white dark:bg-gray-800 pr-2 py-1 rounded">
        {copied ? "Copié !" : color.toUpperCase()}
      </div>
    </div>
  );
}
