import { useCallback, useMemo, useRef, useState } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import { formatTime } from "@/lib/format-time";
import { Button } from "@/components/ui/button";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
import {
  ArrowDownToLine,
  FastForward,
  Pause,
  Play,
  Rewind,
} from "lucide-react";
import { saveAs } from "file-saver";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuRadioItem } from "../ui/dropdown-menu";
import ZoomPlugin from "wavesurfer.js/dist/plugins/zoom.esm.js";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";
import Minimap from "wavesurfer.js/dist/plugins/minimap.esm.js";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [speed, setSpeed] = useState("1");

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: audioRef,
    width: "40vw",
    height: 120,
    waveColor: "rgb(200, 0, 200)",
    progressColor: "rgb(100, 0, 100)",
    url: "/api/get-audio",
    fillParent: true,
    interact: true,
    dragToSeek: true,
    minPxPerSec: 10,
    autoCenter: true,
    audioRate: 1,
    plugins: useMemo(() => {
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        return [
          Timeline.create(),
          ZoomPlugin.create({
            // the amount of zoom per wheel step, e.g. 0.5 means a 50% magnification per scroll
            scale: 0.5,
            // Optionally, specify the maximum pixels-per-second factor while zooming
            maxZoom: 100,
          }),
          Hover.create({
            lineColor: "#ff0000",
            lineWidth: 2,
            labelBackground: "#555",
            labelColor: "#fff",
            labelSize: "11px",
          }),
          Minimap.create({
            height: 20,
            waveColor: "#ddd",
            progressColor: "#999",
          }),
        ];
      }
    }, []),
  });

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  const onFastForward = useCallback(() => {
    wavesurfer && wavesurfer.skip(5);
  }, [wavesurfer]);

  const onRewind = useCallback(() => {
    wavesurfer && wavesurfer.skip(-5);
  }, [wavesurfer]);

  const onSpeedChange = useCallback(
    (value: string) => {
      wavesurfer && wavesurfer.setPlaybackRate(parseFloat(value), true);
    },
    [wavesurfer]
  );

  const duration = wavesurfer && wavesurfer.getDuration();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview audio playback</CardTitle>
        <CardDescription className="text-base text-neutral-500">
          Get detailed scores and advice by playback your audio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={audioRef}></div>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-4">
        <div>
          <Button
            onClick={onRewind}
            variant="ghost"
            size="icon"
            className="text-base text-neutral-500 mr-2"
          >
            <Rewind />
          </Button>
          <Button
            onClick={onPlayPause}
            variant="ghost"
            size="icon"
            className="text-base text-neutral-500 mr-2"
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button
            onClick={onFastForward}
            variant="ghost"
            size="icon"
            className="text-base text-neutral-500 mr-2"
          >
            <FastForward />
          </Button>
        </div>
        <div className="text-base text-neutral-500 text-center">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="mr-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-lg text-neutral-500"
              >
                {speed}x
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-200 z-1000">
              <DropdownMenuRadioGroup
                value={speed}
                onValueChange={(value) => {
                  onSpeedChange(value);
                  setSpeed(value);
                }}
                className="p-2"
              >
                <DropdownMenuRadioItem value="0.5">0.5</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="1">1</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="1.5">1.5</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2">2</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            className="text-base text-neutral-500"
            onClick={async () => {
              try {
                const response = await fetch("/api/download-audio");
                const blob = await response.blob();
                saveAs(blob, "demo.wav");
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <ArrowDownToLine />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AudioPlayer;
