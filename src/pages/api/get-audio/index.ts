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
  if (req.method === "GET") {
    const { timeId } = req.query;

    const filePath = handleParams(timeId as string);

    if (!filePath) {
      res.status(404).json({ error: "timeId is not exist" });
      return;
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;

    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "audio/wav",
      };
      res.writeHead(206, head);
      file.pipe(res);
      res.status(200);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "audio/wav",
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
