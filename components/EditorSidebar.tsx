
import React, { useState } from 'react';
import { Preset } from '../types.ts';

const PRESETS: Preset[] = [
  { id: 'nobg', label: 'Remove Background', prompt: 'Completely remove the background and make it transparent or pure white.', icon: '✨' },
  { id: 'shadow', label: 'Add Soft Shadow', prompt: 'Add a realistic soft drop shadow beneath the product to ground it.', icon: '🌓' },
  { id: 'brighten', label: 'Pro Lighting', prompt: 'Apply professional studio lighting to the product, making it bright and clear.', icon: '💡' },
  { id: 'clean', label: 'Clean Distractions', prompt: 'Remove any dust, scratches, or background distractions from the product shot.', icon: '🧼' },
  { id: 'retro', label: 'Retro Aesthetic', prompt: 'Apply a warm, nostalgic retro filter with slight grain and vintage colors.', icon: '🎞️' },
  { id: 'nature', label: 'Outdoor Setting', prompt: 'Place the product in a natural outdoor setting with soft sunlight.', icon: '🌿' }
];

interface Props {
  onEdit: (prompt: string) => void;
  isProcessing: boolean;
  hasImage: boolean;
}

const EditorSidebar: React.FC<Props> = ({ onEdit, isProcessing, hasImage }) => {
  const [customPrompt, setCustomPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPrompt.trim()) {
      onEdit(customPrompt);
    }
  };

  return (
    <div className="w-full md:w-80 h-full flex flex-col p-6 space-y-8 border-r border-white/10 bg-[#0f0f0f] overflow-hidden">
      <div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-1">
          SnapStudio AI
        </h1>
        <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">Product Photo Editor</p>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium text-white/70">Custom Instruction</label>
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="e.g., Change background to a marble table..."
            disabled={!hasImage || isProcessing}
            className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!hasImage || isProcessing || !customPrompt.trim()}
            className="mt-2 w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-white/10 disabled:text-white/30 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? 'Processing...' : 'Apply Magic'}
          </button>
        </form>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <label className="text-sm font-medium text-white/70">Quick Presets</label>
        <div className="grid grid-cols-1 gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onEdit(preset.prompt)}
              disabled={!hasImage || isProcessing}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-left group disabled:opacity-50"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{preset.icon}</span>
              <span className="text-sm font-medium text-white/80">{preset.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorSidebar;
