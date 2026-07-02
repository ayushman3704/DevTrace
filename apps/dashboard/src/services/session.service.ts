import { api } from "./api";

import type {
  SessionSummary,
  SessionDetails,
} from "../types/session";


interface GetSessionsResponse {
  success: boolean;

  count: number;

  data: SessionSummary[];
}

interface GetSessionDetailsResponse {
  success: boolean;

  data: SessionDetails;
}

export async function getSessions(): Promise<SessionSummary[]> {

  const response =
    await api.get<GetSessionsResponse>(
      "/activity/session"
    );

  return response.data.data;
}

export async function getSessionDetails(
  sessionId: string
): Promise<SessionDetails> {

  const response =
    await api.get<GetSessionDetailsResponse>(
      `/activity/session/${sessionId}`
    );

  return response.data.data;
}