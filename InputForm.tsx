import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface InputFormProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onEnhance: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ prompt, setPrompt, onEnhance, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onEnhance();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl opacity-30 group-hover:opacity-60 transition duration-500 blur"></div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., 'Write a blog post about coffee' or 'Fix this python code'"
          className="relative block w-full bg-slate-900 text-white border border-slate-700 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder-slate-500 resize-none h-32 md:h-40 transition-shadow text-base shadow-xl"
        />
        <div className="absolute bottom-3 right-3 text-xs text-slate-500 pointer-events-none">
          Cmd + Enter to submit
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!prompt.trim() || isLoading}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all
            ${!prompt.trim() || isLoading 
              ? 'bg-slate-700 cursor-not-allowed opacity-50' 
              : 'bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 shadow-lg hover:shadow-brand-500/25 active:scale-95'
            }
          `}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Enhance Prompt</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};