
import React, { useState, useCallback } from 'react';
import EditorSidebar from './components/EditorSidebar';
import ImageDisplay from './components/ImageDisplay';
import { geminiService } from './services/geminiService';
import { ImageState } from './types';

const App: React.FC = () => {
  const [imageState, setImageState] = useState<ImageState>({
    original: null,
    edited: null,
    history: []
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleEdit = async (prompt: string) => {
    if (!imageState.original) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Use the edited image as base if it exists, otherwise use original
      const sourceImage = imageState.edited || imageState.original;
      const result = await geminiService.editImage(sourceImage, prompt);
      
      setImageState(prev => ({
        ...prev,
        edited: result,
        history: [...prev.history, result]
      }));
    } catch (err: any) {
      console.error("Editing Error:", err);
      setError(err.message || "Something went wrong while processing the image.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      <EditorSidebar 
        onEdit={handleEdit} 
        isProcessing={isProcessing} 
        hasImage={!!imageState.original} 
      />
      
      <main className="flex-1 relative flex flex-col h-full">
        {error && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-red-500/90 text-white rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">{error}</span>
            <button onClick={() => setError(null)} className="ml-2 hover:opacity-70">×</button>
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
