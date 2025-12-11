export enum IntentCategory {
  CREATION = 'Creation',
  TRANSFORMATION = 'Transformation',
  ANALYSIS = 'Analysis',
  INFORMATION = 'Information',
  PLANNING = 'Planning',
  INTERACTION = 'Interaction',
  UNKNOWN = 'Unknown'
}

export interface PromptAnalysis {
  intent: IntentCategory;
  clarityScore: number;
  specificityScore: number;
  structureScore: number;
  completenessScore: number;
  actionabilityScore: number;
  overallScore: number;
  detectedContext: string[];
  missingContext: string[];
  questions?: string[];
}

export interface EnhancedPromptStructure {
  role: string;
  context: string;
  task: string;
  format: string;
  constraints: string;
  fullText: string;
}

export interface EnhancementResult {
  analysis: PromptAnalysis;
  enhancedPrompt: EnhancedPromptStructure;
  explanation: string;
}

export interface AppState {
  rawPrompt: string;
  isLoading: boolean;
  error: string | null;
  result: EnhancementResult | null;
}