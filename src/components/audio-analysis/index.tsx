import {
  use,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { Slider } from "../ui/slider";
import ZoomPlugin from "wavesurfer.js/dist/plugins/zoom.esm.js";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";
import Minimap from "wavesurfer.js/dist/plugins/minimap.esm.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import { Checkbox } from "../ui/checkbox";

const AudioAnalysis = () => {
  const audioRef = useRef(null);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(false);
  const activeRegion = useRef<any>(null);
  const loopRef = useRef(true);

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

  const wsRegions =
    wavesurfer && wavesurfer.registerPlugin(RegionsPlugin.create());

  const createRegion = useCallback(() => {
    // Create some regions at specific time ranges
    wavesurfer &&
      wavesurfer.on("decode", () => {
        // Regions
        wsRegions!.addRegion({
          id: "1",
          start: 0,
          end: 8,
          color: "rgba(74, 223, 192, 0.5)",
          drag: false,
          resize: true,
        });
        wsRegions!.addRegion({
          id: "2",
          start: 9,
          end: 16,
          color: "rgba(74, 223, 192, 0.5)",
          drag: false,
          resize: true,
        });
      });
  }, [wavesurfer, wsRegions]);

  const updateRegion = () => {
    wsRegions &&
      wsRegions.on("region-in", (region: any) => {
        console.log("region-in", region);
        console.log("isLoop", loopRef.current);
        console.log("activeRegion", activeRegion.current);
        activeRegion.current = region;
      });
    wsRegions &&
      wsRegions.on("region-out", (region: any) => {
        console.log("region-out", region);
        console.log("isLoop", loopRef.current);
        console.log("activeRegion === region", activeRegion.current === region);
        if (activeRegion.current === region) {
          if (loopRef.current) {
            region.play();
          } else {
            activeRegion.current = null;
          }
        }
      });
    wsRegions &&
      wsRegions.on("region-clicked", (region, e) => {
        e.stopPropagation(); // prevent triggering a click on the waveform
        activeRegion.current = region;
        region.play();
        region.setOptions({ color: "rgba(195, 228, 110, 0.5)" } as any);
      });
    // Reset the active region when the user clicks anywhere in the waveform
    wavesurfer &&
      wavesurfer.on("interaction", () => {
        activeRegion.current = null;
      });
  };

  useEffect(() => {
    createRegion();
    loopRef.current = loop;
    updateRegion();
  }, [loop, createRegion]);

  return (
    <Card className="overflow-x-hidden min-h-[82vh]">
      <CardHeader>
        <CardTitle>Interview audio playback</CardTitle>
        <CardDescription className="text-base text-neutral-500 flex items-center justify-between">
          Get detailed scores and advice by playback your audio.
          <span className="flex items-center">
            <span className="w-6 h-4 bg-[#4adfc080] mr-2 rounded"></span>
            <span className="text-base text-neutral-500">
              Our Intelligent Suggestions
            </span>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={audioRef}></div>
      </CardContent>
      <CardFooter className="flex items-center">
        <div className="flex-1">
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
        <div className="flex-1 text-base text-neutral-500 text-left">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <div className="flex-3 flex justify-end items-center">
          <Slider
            className="w-24"
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
          <div className="flex items-center space-x-2 mx-2">
            <Checkbox
              id="terms"
              checked={loop}
              onCheckedChange={(checked: boolean) => {
                setLoop(checked);
              }}
            />
            <label
              htmlFor="terms"
              className="text-sm text-neutral-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Loop AI Suggestion
            </label>
          </div>
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
