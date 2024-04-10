import { useCallback, useMemo, useRef, useState } from "react";
import styles from "./index.module.scss";
import { useWavesurfer } from "@wavesurfer/react";
import { formatTime } from "@/lib/format-time";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";

const Dashboard = () => {
  const audioRef = useRef(null);

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
    minPxPerSec: 100,
    autoCenter: true,
    plugins: useMemo(() => {
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        return [Timeline.create()];
      }
    }, []),
  });

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  return (
    <div className={styles.dashboard}>
      <h2 className="p-0 text-start text-3xl font-semibold">Dashboard</h2>

      <div className={styles.container}>
        <div className={styles.column}>
          <div ref={audioRef}></div>

          <p>Current time: {formatTime(currentTime)}</p>

          <Slider
            min={10}
            max={100}
            step={1}
            onValueChange={(value: number[]) => {
              wavesurfer && wavesurfer.zoom(value[0]);
            }}
          />

          <div>
            <Button onClick={onPlayPause} style={{ minWidth: "5em" }}>
              {isPlaying ? "Pause" : "Play"}
            </Button>
          </div>
        </div>

        <div className={styles.column}>sd</div>
      </div>
    </div>
  );
};

export default Dashboard;
