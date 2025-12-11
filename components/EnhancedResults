import React, { useState } from 'react';
import { EnhancedPromptStructure } from '../types';
import { Copy, Check, Layers, FileText } from 'lucide-react';

interface EnhancedResultProps {
  result: EnhancedPromptStructure;
  explanation: string;
}

export const EnhancedResult: React.FC<EnhancedResultProps> = ({ result, explanation }) => {
  const [activeTab, setActiveTab] = useState<'structured' | 'raw'>('structured');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
        <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('structured')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'structured' 
                ? 'bg-brand-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Structured
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'raw' 
                ? 'bg-brand-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Raw Text
          </button>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-brand-400 hover:bg-brand-950 rounded-md transition-colors border border-transparent hover:border-brand-900"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy Prompt'}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        
        {/* Explanation Banner */}
        <div className="mb-6 p-4 bg-brand-950/30 border border-brand-900/50 rounded-lg">
          <h4 className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-1">Enhancement Summary</h4>
          <p className="text-sm text-brand-100/80 leading-relaxed">{explanation}</p>
        </div>

        {activeTab === 'structured' ? (
          <div className="space-y-6">
            <Section title="Role" content={result.role} color="text-purple-400" borderColor="border-purple-500/30" />
            <Section title="Context" content={result.context} color="text-blue-400" borderColor="border-blue-500/30" />
            <Section title="Task" content={result.task} color="text-green-400" borderColor="border-green-500/30" />
            <Section title="Format" content={result.format} color="text-orange-400" borderColor="border-orange-500/30" />
            <Section title="Constraints" content={result.constraints} color="text-red-400" borderColor="border-red-500/30" />
          </div>
        ) : (
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
            {result.fullText}
          </div>
        )}
      </div>
    </div>
  );
};

const Section = ({ title, content, color, borderColor }: { title: string, content: string, color: string, borderColor: string }) => (
  <div className={`relative pl-4 border-l-2 ${borderColor}`}>
    <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${color}`}>{title}</h3>
    <p className="text-slate-300 text-sm leading-relaxed">{content}</p>
  </div>
);
