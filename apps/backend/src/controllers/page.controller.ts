import { Request, Response } from "express";

import {
  createPage,
  getAllPages,
} from "../repositories/page.repository.js";

export function addPage(req: Request, res: Response) {
  const { url, title } = req.body;

  if (!url || !title) {
    return res.status(400).json({
      success: false,
      message: "url and title are required",
    });
  }

  const page = createPage(url, title);

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