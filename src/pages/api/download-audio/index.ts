// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

function handleParams(timeId: string) {
  if (timeId === "1") {
    return path.resolve("./mock/audio", "demo1.wav");
  } else if (timeId === "2") {
    return path.resolve("./mock/audio", "demo2.wav");
  } else {
    return null;
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { timeId } = req.body;

    if (!timeId) {
      res.status(400).json({ error: "timeId is required" } as any);
      return;
    }

    const filePath = handleParams(timeId);

    if (!filePath) {
      res.status(404).json({ error: "timeId is not exist" });
      return;
    }

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ error: "File not found" });
      return;
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;

    console.log("fileSize", fileSize);

    res.setHeader("Content-Type", "audio/wav");
    res.setHeader("Content-Length", fileSize.toString());
    res.setHeader("Content-Disposition", "attachment; filename=demo.wav");

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
    res.status(200);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
