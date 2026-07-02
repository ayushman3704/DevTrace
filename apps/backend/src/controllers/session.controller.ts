import { Request, Response } from "express";

import {
  getAllSessions,
  getSessionById,
  getPagesBySession,
} from "../repositories/session.repository.js";


export function getSessions(
  req: Request,
  res: Response
) {
  const sessions = getAllSessions();

  return res.json({
    success: true,
    count: sessions.length,
    data: sessions,
  });
}


export function getSessionDetails(
  req: Request,
  res: Response
) {
  const { id } = req.params;

  const session = getSessionById(id);

  if (!session) {
    return res.status(404).json({
      success: false,
      message: "Session not found",
    });
  }

  const pages = getPagesBySession(id);

  return res.json({
    success: true,
    data: {
      session,
      pages,
    },
  });
}