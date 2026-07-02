import { Request, Response } from "express";

import {
  createPage,
  getAllPages,
  searchPages,
} from "../repositories/page.repository.js";

import { assignSession } from "../services/session.service.js";

export function addPage(req: Request, res: Response) {
  const { url, title } = req.body;

  if (!url || !title) {
    return res.status(400).json({
      success: false,
      message: "url and title are required",
    });
  }

  const session = assignSession();

const page = createPage(
    session.id,
    url,
    title
);

  return res.status(201).json({
    success: true,
    data: page,
  });
}

export function getPages(req: Request, res: Response) {
  const pages = getAllPages();

  return res.json({
    success: true,
    count: pages.length,
    data: pages,
  });
}


export function searchPage(req: Request, res: Response) {
  const query = String(req.query.q ?? "").trim();

  if (!query) {
    return res.json({
      success: true,
      count: 0,
      data: [],
    });
  }

  const pages = searchPages(query);

  return res.json({
    success: true,
    count: pages.length,
    data: pages,
  });
}