// types/index.ts
export interface Segment {
  order: number;
  timeBegin: number;
  timeEnd: number;
  subtitle: string;
  imagePrompt: string;
  movement: string;
  verticalOffset: number;
}

export interface Job {
  jobId: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'SCHEDULED' | 'PUBLISHED';
  createdAt: string;
  lastUpdatedAt?: string;
}

// NOVOS TIPOS PARA OS DADOS ANTIGOS
export interface OldSegment {
  segment_id: number;
  time_begin: number;
  time_end: number;
  subtitle: string;
  prompt_image: string;
  movement?: string;
  vertical_offset?: number;
}

export interface OldData {
  prompt_phrase: string;
  speech: string;
  duration_seconds: number;
  segments: OldSegment[];
}

// Em types/index.ts, adicione esta interface
export interface JobCreationResponse {
  jobId: string;
}
