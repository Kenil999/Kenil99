import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { AnalysisPanel } from './components/AnalysisPanel';
import { EnhancedResult } from './components/EnhancedResult';
import { QuestionForm } from './components/QuestionForm';
import { enhancePrompt } from './services/geminiService';
import { AppState } from './types';
import { Wand2, AlertTriangle, Info } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    rawPrompt: '',
    isLoading: false,
    error: null,
    result: null,
  });

  const handleEnhancement = async (promptOverride?: string) => {
    const promptToUse = promptOverride || state.rawPrompt;
    setState((prev) => ({ ...prev, isLoading: true, error: null, rawPrompt: promptToUse }));
    
    try {
      const result = await enhancePrompt(promptToUse);
      setState((prev) => ({ ...prev, isLoading: false, result }));
    } catch (error: any) {
      setState((prev) => ({ 
        ...prev, 
        isLoading: false, 
        error: error.message || 'An unexpected error occurred.' 
      }));
    }
  };

  const handleRefine = (answers: Record<string, string>) => {
    const contextString = Object.entries(answers)
      .map(([q, a]) => `Q: ${q}\nA: ${a}`)
      .join('\n');
    
    // Check if we already have a context block to avoid duplication if user refines multiple times
    const divider = "\n\n--- Added Context ---\n";
    const basePrompt = state.rawPrompt.split(divider)[0];
    const newPrompt = `${basePrompt}${divider}${contextString}`;

    handleEnhancement(newPrompt);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-brand-500/30">
      
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm mb-4 shadow-xl">
            <Wand2 className="w-8 h-8 text-brand-400 mr-3" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-300 via-white to-purple-300 tracking-tight">
              AI Prompt Enhancer
            </h1>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Transform vague thoughts into powerful, structured prompts. 
            Leveraging Google Gemini to bridge the gap between human intent and AI understanding.
          </p>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-8">
          
          {/* Input Section */}
          <section className="w-full max-w-3xl mx-auto">
            <InputForm 
              prompt={state.rawPrompt} 
              setPrompt={(val) => setState(prev => ({ ...prev, rawPrompt: val }))}
              onEnhance={() => handleEnhancement()} 
              isLoading={state.isLoading} 
            />
          </section>

          {/* Error Message */}
          {state.error && (
            <div className="max-w-3xl mx-auto w-full p-4 bg-red-900/20 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-300 animate-in fade-in slide-in-from-top-4">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <p>{state.error}</p>
            </div>
          )}

          {/* Results Grid */}
          {state.result && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              
              {/* Left Column: Analysis & Questions */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <AnalysisPanel analysis={state.result.analysis} />
                {state.result.analysis.questions && state.result.analysis.questions.length > 0 && (
                  <QuestionForm 
                    questions={state.result.analysis.questions} 
                    onRefine={handleRefine}
                    isLoading={state.isLoading}
                  />
                )}
              </div>

              {/* Right Column: Enhanced Output */}
              <div className="lg:col-span-8 h-[600px] lg:h-auto min-h-[500px]">
                <EnhancedResult 
                  result={state.result.enhancedPrompt} 
                  explanation={state.result.explanation}
                />
              </div>

            </div>
          )}
          
          {/* Empty State / How it works */}
          {!state.result && !state.isLoading && !state.error && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <InfoCard 
                title="Clarity & Context" 
                desc="We detect missing context and ambiguous terms to make your request crystal clear."
                step="1"
              />
              <InfoCard 
                title="Structure Optimization" 
                desc="Your prompt is reorganized into a proven template (Role, Context, Task, Format) for best results."
                step="2"
              />
              <InfoCard 
                title="Quality Scoring" 
                desc="Get instant feedback on your prompt's quality with a detailed score breakdown."
                step="3"
              />
            </div>
          )}

        </main>

        <footer className="mt-16 text-center text-slate-600 text-sm py-4 border-t border-slate-800/50">
          <p>© {new Date().getFullYear()} AI Prompt Enhancer. Powered by Google Gemini.</p>
        </footer>
      </div>
    </div>
  );
};

const InfoCard = ({ title, desc, step }: { title: string; desc: string; step: string }) => (
  <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-brand-400 font-mono font-bold text-sm mb-4 border border-slate-700">
      {step}
    </div>
    <h3 className="text-white font-semibold mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default App;