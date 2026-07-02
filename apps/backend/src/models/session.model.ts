export interface ResearchSession {
  id: string;

  startedAt: string;

  endedAt: string;

  createdAt: string;
}


export interface SessionSummary {
  id: string;

  startedAt: string;

  endedAt: string;

  pageCount: number;
}