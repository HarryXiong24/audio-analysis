import { useCallback, useMemo, useRef, useState } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import { formatTime } from "@/lib/format-time";
import { Button } from "@/components/ui/button";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
import styles from "./index.module.scss";
import { FastForward, Pause, Play, Rewind } from "lucide-react";
import ZoomPlugin from "wavesurfer.js/dist/plugins/zoom.js";
import Hover from "wavesurfer.js/dist/plugins/hover.js";
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

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [speed, setSpeed] = useState("1");

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: audioRef,
    width: "50vw",
    height: 100,
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

  const duration = wavesurfer && wavesurfer.getDuration();

  return (
    <Card className={styles["audio-player"]}>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={audioRef}></div>
      </CardContent>
      <CardFooter className={styles["control-bar"]}>
        <div>
          <Button
            onClick={onRewind}
            variant="ghost"
            size="icon"
            style={{ marginRight: 4 }}
          >
            <Rewind />
          </Button>
          <Button
            onClick={onPlayPause}
            variant="ghost"
            size="icon"
            style={{ marginRight: 4 }}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button
            onClick={onFastForward}
            variant="ghost"
            size="icon"
            style={{ marginRight: 4 }}
          >
            <FastForward />
          </Button>
        </div>
        <div>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {speed}x
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={styles.drop}>
              <DropdownMenuRadioGroup
                value={speed}
                onValueChange={(value) => {
                  setSpeed(value);
                }}
              >
                <DropdownMenuRadioItem value="0.5">0.5</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="1">1</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="1.5">1.5</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2">2</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AudioPlayer;
