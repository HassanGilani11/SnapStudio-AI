
import React, { useState } from 'react';

interface Props {
  original: string | null;
  edited: string | null;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isProcessing: boolean;
}

const ImageDisplay: React.FC<Props> = ({ original, edited, onUpload, isProcessing }) => {
  const [sliderPos, setSliderPos] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

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
      <div className="flex-1 p-4 md:p-8 overflow-hidden flex items-center justify-center relative">
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
          
          {/* Comparison Container */}
          <div className="relative w-full aspect-square md:h-full md:w-auto bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl group select-none">
            
            {/* Bottom Layer: Original */}
            <div className="absolute inset-0 flex items-center justify-center">
               <img src={original} alt="Original" className="w-full h-full object-contain" />
               <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                 <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Original</span>
               </div>
            </div>

            {/* Top Layer: Edited (Clipped) */}
            {edited && (
              <div 
                className="absolute inset-0 flex items-center justify-center transition-all duration-100 ease-out z-10"
                style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
              >
                <img src={edited} alt="Edited" className="w-full h-full object-contain" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600/50 backdrop-blur-md rounded-full border border-blue-400/20">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white">Edited Output</span>
                </div>
              </div>
            )}

            {/* Loading Overlay */}
            {isProcessing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-30">
                <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                <p className="text-sm font-medium animate-pulse text-blue-400 px-4 text-center">AI is crafting your vision...</p>
              </div>
            )}

            {/* No Edit Placeholder */}
            {!edited && !isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                 <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                   <p className="text-white/40 text-sm font-medium">Use the sidebar to apply edits</p>
                 </div>
              </div>
            )}

            {/* Slider Control Overlay */}
            {edited && !isProcessing && (
              <>
                {/* Visual Divider Line */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] z-20 pointer-events-none flex items-center justify-center"
                  style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7l-4 4m0 0l4 4m-4-4h16m0 0l-4-4m4 4l-4 4" />
                    </svg>
                  </div>
                </div>

                {/* Actual Slider Input */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={handleSliderChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize z-40"
                />
              </>
            )}
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
           {edited && (
              <a 
                href={edited} 
                download="snapstudio-edit.png"
                className="px-4 py-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Result
              </a>
           )}
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
