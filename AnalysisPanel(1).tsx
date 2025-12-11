import React from 'react';
import { PromptAnalysis, IntentCategory } from '../types';
import { 
  BarChart3, 
  Target, 
  AlertCircle, 
  CheckCircle2,
  Zap,
  Search,
  PenTool,
  BrainCircuit,
  MessageSquare,
  FileText
} from 'lucide-react';

interface AnalysisPanelProps {
  analysis: PromptAnalysis;
}

const getIntentIcon = (intent: string) => {
  switch (intent) {
    case IntentCategory.CREATION: return <PenTool className="w-5 h-5 text-purple-400" />;
    case IntentCategory.ANALYSIS: return <BarChart3 className="w-5 h-5 text-blue-400" />;
    case IntentCategory.TRANSFORMATION: return <Zap className="w-5 h-5 text-yellow-400" />;
    case IntentCategory.INFORMATION: return <Search className="w-5 h-5 text-green-400" />;
    case IntentCategory.PLANNING: return <BrainCircuit className="w-5 h-5 text-orange-400" />;
    case IntentCategory.INTERACTION: return <MessageSquare className="w-5 h-5 text-pink-400" />;
    default: return <FileText className="w-5 h-5 text-gray-400" />;
  }
};

const ScoreBar = ({ label, score }: { label: string; score: number }) => {
  let color = 'bg-red-500';
  if (score >= 50) color = 'bg-yellow-500';
  if (score >= 80) color = 'bg-green-500';

  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1 text-slate-400">
        <span className="font-medium uppercase tracking-wider">{label}</span>
        <span className="font-mono">{score}/100</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-out`} 
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-6">
      
      {/* Header & Overall Score */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-800 rounded-lg">
            {getIntentIcon(analysis.intent)}
          </div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Detected Intent</div>
            <div className="text-white font-medium">{analysis.intent}</div>
          </div>
        </div>
        <div className="text-right">
           <div className="text-3xl font-bold font-mono text-brand-400">{analysis.overallScore}</div>
           <div className="text-[10px] text-slate-500 uppercase">Quality Score</div>
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="space-y-1">
        <ScoreBar label="Clarity" score={analysis.clarityScore} />
        <ScoreBar label="Specificity" score={analysis.specificityScore} />
        <ScoreBar label="Structure" score={analysis.structureScore} />
        <ScoreBar label="Completeness" score={analysis.completenessScore} />
        <ScoreBar label="Actionability" score={analysis.actionabilityScore} />
      </div>

      {/* Context Analysis */}
      <div className="grid grid-cols-1 gap-4 mt-auto">
        <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800/50">
           <div className="flex items-center gap-2 mb-2 text-green-400 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" /> Detected Context
           </div>
           {analysis.detectedContext.length > 0 ? (
             <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
               {analysis.detectedContext.slice(0, 3).map((c, i) => <li key={i}>{c}</li>)}
             </ul>
           ) : (
             <span className="text-xs text-slate-600 italic">None detected</span>
           )}
        </div>

        <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800/50">
           <div className="flex items-center gap-2 mb-2 text-orange-400 text-sm font-medium">
              <AlertCircle className="w-4 h-4" /> Missing Context
           </div>
           {analysis.missingContext.length > 0 ? (
             <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
               {analysis.missingContext.slice(0, 3).map((c, i) => <li key={i}>{c}</li>)}
             </ul>
           ) : (
             <span className="text-xs text-slate-600 italic">None detected</span>
           )}
        </div>
      </div>

    </div>
  );
};