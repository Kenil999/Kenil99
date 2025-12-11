import React, { useState } from 'react';
import { MessageCircleQuestion, ArrowRight, CornerDownRight } from 'lucide-react';

interface QuestionFormProps {
  questions: string[];
  onRefine: (answers: Record<string, string>) => void;
  isLoading: boolean;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ questions, onRefine, isLoading }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRefine(answers);
    setAnswers({}); // Clear answers after submit as prompt updates
  };

  if (!questions || questions.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-4 text-brand-400">
        <MessageCircleQuestion className="w-5 h-5" />
        <h3 className="font-semibold text-sm uppercase tracking-wide">Refine Context</h3>
      </div>
      
      <p className="text-slate-400 text-xs mb-6">
        Answering these questions will help the AI understand your specific needs better.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {questions.map((q, idx) => (
          <div key={idx} className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-start gap-2">
              <CornerDownRight className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
              {q}
            </label>
            <input
              type="text"
              value={answers[q] || ''}
              onChange={(e) => setAnswers(prev => ({ ...prev, [q]: e.target.value }))}
              placeholder="Your answer..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500/50 placeholder-slate-600 transition-all"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={isLoading || Object.keys(answers).length === 0}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700"
        >
          {isLoading ? 'Refining...' : 'Update & Refine Prompt'}
          {!isLoading && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
};
