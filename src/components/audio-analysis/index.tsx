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
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuRadioItem } from "../ui/dropdown-menu";
import ZoomPlugin from "wavesurfer.js/dist/plugins/zoom.esm.js";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";
import Minimap from "wavesurfer.js/dist/plugins/minimap.esm.js";
import { Slider } from "../ui/slider";

const AudioAnalysis = () => {
  const audioRef = useRef(null);
  const [speed, setSpeed] = useState(1);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: audioRef,
    width: "100%",
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
            scale: 0.5,
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
    (value: number) => {
      wavesurfer && wavesurfer.setPlaybackRate(value, true);
    },
    [wavesurfer]
  );

  const duration = wavesurfer && wavesurfer.getDuration();

  return (
    <Card className="overflow-x-hidden min-h-[82vh]">
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
        <div className="text-base text-neutral-500 text-left">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <div className="flex justify-end items-center">
          <Slider
            defaultValue={[1]}
            min={0}
            max={4}
            step={0.1}
            onValueChange={(value) => {
              onSpeedChange(value[0]);
              setSpeed(value[0]);
            }}
          />
          <span className="text-lg text-neutral-500 mx-2">{speed}x</span>
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

export default AudioAnalysis;
