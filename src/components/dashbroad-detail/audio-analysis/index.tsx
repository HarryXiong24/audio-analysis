import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Slider } from "../../ui/slider";
import ZoomPlugin from "wavesurfer.js/dist/plugins/zoom.esm.js";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";
import Minimap from "wavesurfer.js/dist/plugins/minimap.esm.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import { Checkbox } from "../../ui/checkbox";
import { AudioSuggestion } from "@/types";
import AISuggestion from "../ai-suggestion";

const AudioAnalysis = (props: {
  timeId: string;
  audioSuggestions: AudioSuggestion[];
}) => {
  const { timeId, audioSuggestions } = props;
  const audioRef = useRef(null);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(false);
  const activeRegion = useRef<any>(null);
  const currentRegionId = useRef<string | null>(null);
  const loopRef = useRef(true);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: audioRef,
    width: "100%",
    height: 120,
    waveColor: "rgb(200, 0, 200)",
    progressColor: "rgb(100, 0, 100)",
    url: `/api/get-audio?timeId=${timeId}`,
    fillParent: true,
    interact: true,
    dragToSeek: true,
    minPxPerSec: 1,
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
        console.log("audioSuggestions", audioSuggestions);
        wsRegions && wsRegions.clearRegions();
        for (let i = 0; i < audioSuggestions.length; i++) {
          // Regions
          wsRegions!.addRegion({
            id: audioSuggestions[i].id,
            start: audioSuggestions[i].start,
            end: audioSuggestions[i].end,
            color: "#4adfc080",
            drag: false,
            resize: false,
          });
        }
      });
  }, [audioSuggestions, wavesurfer, wsRegions]);

  const updateRegion = useCallback(() => {
    wsRegions &&
      wsRegions.on("region-in", (region: any) => {
        activeRegion.current = region;
        currentRegionId.current = region.id;
      });
    wsRegions &&
      wsRegions.on("region-out", (region: any) => {
        if (activeRegion.current === region) {
          if (loopRef.current) {
            region.play();
          } else {
            activeRegion.current = null;
            currentRegionId.current = null;
          }
        }
      });
    wsRegions &&
      wsRegions.on("region-clicked", (region, e) => {
        e.stopPropagation(); // prevent triggering a click on the waveform
        activeRegion.current = region;
        currentRegionId.current = region.id;
        region.play();
        region.setOptions({ color: "rgba(195, 228, 110, 0.5)" } as any);
      });
    // Reset the active region when the user clicks anywhere in the waveform
    wavesurfer &&
      wavesurfer.on("interaction", () => {
        activeRegion.current = null;
        currentRegionId.current = null;
      });
  }, [wavesurfer, wsRegions]);

  useEffect(() => {
    loopRef.current = loop;
    createRegion();
    updateRegion();
  }, [loop, createRegion, updateRegion, wavesurfer]);

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
        <div className="mb-4">
          <div ref={audioRef}></div>
          <div className="flex items-center mt-4">
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
                    const response = await fetch("/api/download-audio", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ timeId: timeId }),
                    });
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
          </div>
          <div>
            <p className="text-base text-left mt-4">
              Transcript:
              <span className="text-base text-neutral-500 text-left mx-2">
                The recognition subtitles are transcribed by the server, they
                are omitted here now.
              </span>
            </p>
          </div>
        </div>
        <div>
          <AISuggestion
            timeId={timeId}
            isPlaying={isPlaying}
            audioSuggestions={audioSuggestions}
            currentRegionId={currentRegionId.current}
          ></AISuggestion>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioAnalysis;
