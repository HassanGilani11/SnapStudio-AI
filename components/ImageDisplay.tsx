
import React from 'react';

interface Props {
  original: string | null;
  edited: string | null;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isProcessing: boolean;
}

const ImageDisplay: React.FC<Props> = ({ original, edited, onUpload, isProcessing }) => {
  if (!original) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10">
        <label className="w-full max-w-xl aspect-square flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-3xl hover:border-blue-500/50 hover:bg-white/5 transition-all cursor-pointer group">
          <div className="p-8 rounded-full bg-white/5 mb-6 group-hover:bg-blue-500/10 transition-colors">
            <svg className="w-12 h-12 text-white/20 group-hover:text-blue-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Upload Product Image</h3>
          <p className="text-white/40 text-sm">Drag and drop or click to browse</p>
          <input type="file" className="hidden" accept="image/*" onChange={onUpload} />
        </label>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#050505]">
      <div className="flex-1 p-8 overflow-hidden flex items-center justify-center relative">
        <div className="relative w-full max-w-4xl max-h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Original Card */}
            <div className="flex flex-col gap-3">
               <span className="text-xs font-bold uppercase tracking-widest text-white/30">Original</span>
               <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black flex items-center justify-center relative">
                 <img src={original} alt="Original" className="max-w-full max-h-full object-contain" />
               </div>
            </div>

            {/* Edited Card */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                 <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Edited Output</span>
                 {edited && (
                    <a 
                      href={edited} 
                      download="edited-product.png"
                      className="text-xs font-bold text-white/50 hover:text-white transition-colors"
                    >
                      Download
                    </a>
                 )}
              </div>
               <div className="aspect-square rounded-2xl overflow-hidden border border-blue-500/20 bg-black flex items-center justify-center relative">
                 {isProcessing ? (
                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-10">
                     <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                     <p className="text-sm font-medium animate-pulse text-blue-400">AI is dreaming up your edit...</p>
                   </div>
                 ) : edited ? (
                    <img src={edited} alt="Edited" className="max-w-full max-h-full object-contain animate-in fade-in duration-700" />
                 ) : (
                    <div className="text-white/20 text-sm italic">Edit will appear here</div>
                 )}
               </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tool bar */}
      <div className="p-4 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
        <div className="flex gap-4">
           <button 
             onClick={() => window.location.reload()}
             className="px-4 py-2 text-xs font-medium text-white/40 hover:text-white transition-colors"
           >
             Clear All
           </button>
        </div>
        <div className="flex gap-2">
            <label className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-semibold cursor-pointer transition-all">
                Change Image
                <input type="file" className="hidden" accept="image/*" onChange={onUpload} />
            </label>
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;
