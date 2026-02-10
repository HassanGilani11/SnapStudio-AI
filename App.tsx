
import React, { useState, useCallback, useEffect } from 'react';
import EditorSidebar from './components/EditorSidebar.tsx';
import ImageDisplay from './components/ImageDisplay.tsx';
import { geminiService } from './services/geminiService.ts';
import { ImageState } from './types.ts';

const App: React.FC = () => {
  const [imageState, setImageState] = useState<ImageState>({
    original: null,
    edited: null,
    history: []
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modelUsed, setModelUsed] = useState<string | null>(null);
  const [hasPaidKey, setHasPaidKey] = useState<boolean>(false);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasPaidKey(selected);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasPaidKey(true);
      setError(null);
    }
  };

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageState({
          original: event.target?.result as string,
          edited: null,
          history: []
        });
        setError(null);
        setModelUsed(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleEdit = async (prompt: string) => {
    if (!imageState.original) return;

    setIsProcessing(true);
    setError(null);

    try {
      const sourceImage = imageState.edited || imageState.original;
      const result = await geminiService.editImage(sourceImage, prompt);
      
      setImageState(prev => ({
        ...prev,
        edited: result.data,
        history: [...prev.history, result.data]
      }));
      setModelUsed(result.modelUsed);
    } catch (err: any) {
      console.error("Editing Error:", err);
      let msg = err.message || "Something went wrong while processing the image.";
      
      if (msg.includes("429") || msg.includes("quota")) {
        msg = "Free tier quota exceeded for all available models. Please click 'Professional Mode' in the sidebar to use your own API key.";
      } else if (msg.includes("Requested entity was not found")) {
        msg = "API Key error or invalid model. Try re-selecting your API key.";
        setHasPaidKey(false);
      }
      
      setError(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      <div className="flex flex-col h-full">
        <EditorSidebar 
          onEdit={handleEdit} 
          isProcessing={isProcessing} 
          hasImage={!!imageState.original} 
        />
        {/* API Key Status / Selector */}
        <div className="p-6 bg-[#0f0f0f] border-r border-white/10 mt-auto">
          <button 
            onClick={handleSelectKey}
            className={`w-full py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              hasPaidKey 
                ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
            {hasPaidKey ? 'Pro Mode Active' : 'Switch to Professional Mode'}
          </button>
          {!hasPaidKey && (
            <p className="text-[10px] text-white/30 mt-2 text-center leading-relaxed">
              Facing quota limits? <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline hover:text-white">Enable billing</a> and select your key.
            </p>
          )}
        </div>
      </div>
      
      <main className="flex-1 relative flex flex-col h-full">
        {error && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-red-500/95 text-white rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md max-w-[90%]">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">{error}</span>
            <button onClick={() => setError(null)} className="ml-2 hover:opacity-70 text-xl font-bold">×</button>
          </div>
        )}

        {modelUsed && !isProcessing && (
          <div className="absolute top-4 right-4 z-40 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            <span className="text-[10px] text-white/40 font-mono">Engine: {modelUsed}</span>
          </div>
        )}

        <ImageDisplay 
          original={imageState.original} 
          edited={imageState.edited} 
          onUpload={handleUpload}
          isProcessing={isProcessing}
        />
      </main>
    </div>
  );
};

export default App;
