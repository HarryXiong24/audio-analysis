// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const filePath = path.resolve("./mock/audio", "demo.wav");

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;

  res.setHeader("Content-Type", "audio/wav");
  res.setHeader("Content-Length", fileSize);
  res.setHeader("Content-Disposition", "attachment; filename=demo.wav");

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
}
