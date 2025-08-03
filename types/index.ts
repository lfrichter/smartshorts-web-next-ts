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
