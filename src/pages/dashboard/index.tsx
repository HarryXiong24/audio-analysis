import { useState } from "react";
import AudioPlayer from "@/components/audio-player";

const Dashboard = () => {
  return (
    <div className="container">
      <h2 className="p-0 text-start text-3xl font-semibold">
        Review your AI Interview
      </h2>

      <div className="flex gap-x-8">
        <div className="flex-1 ">
          <AudioPlayer></AudioPlayer>
        </div>

        <div className="flex-1">sd</div>
      </div>
    </div>
  );
};

export default Dashboard;
