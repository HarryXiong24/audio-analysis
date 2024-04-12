import { useState } from "react";
import AudioPlayer from "@/components/audio-player";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetServerSidePropsContext } from "next";
import { sendInterviewTimes } from "../../../mock/api/send_interview_times";
import { InterviewTime } from "@/types";
import dynamic from "next/dynamic";

const Select = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.Select),
  {
    ssr: false,
  }
);

const Dashboard = (props: { interviewTimes: InterviewTime[] }) => {
  const { interviewTimes } = props;
  const [time, setTime] = useState<string>(interviewTimes[0].id);
  console.log(interviewTimes);

  return (
    <div className="mx-auto max-w-5xl grow px-4 pt-10">
      <div className="flex justify-between items-center">
        <h3 className="p-0 text-start text-3xl font-semibold">
          Welcome back, Harry!
        </h3>
        <Select
          value={time}
          onValueChange={(time) => {
            setTime(time);
          }}
        >
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Select your interview record" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Interview Record</SelectLabel>
              {interviewTimes?.map((item, index) => (
                <SelectItem value={item.id} key={index}>
                  {item.time}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-x-8">
        <div className="flex-1 "></div>

        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const interviewTimes: InterviewTime[] = await sendInterviewTimes();

  return {
    props: {
      interviewTimes: interviewTimes,
    },
  };
}

export default Dashboard;
