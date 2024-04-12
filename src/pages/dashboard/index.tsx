import { useState } from "react";
import AudioPlayer from "@/components/audio-player";
import styles from "./index.module.scss";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <h2 className="p-0 text-start text-3xl font-semibold">
        Review your AI Interview
      </h2>

      <div className={styles.container}>
        <div className={styles.column}>
          <AudioPlayer></AudioPlayer>
        </div>

        <div className={styles.column}>sd</div>
      </div>
    </div>
  );
};

export default Dashboard;
