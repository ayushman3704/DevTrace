import type { Activity } from "./activity";


export interface SessionSummary {
  id: string;

  startedAt: string;

  endedAt: string;

  pageCount: number;
}

export interface SessionDetails {
  session: {
    id: string;

    startedAt: string;

    endedAt: string;

    createdAt: string;
  };

  pages: Activity[];
}