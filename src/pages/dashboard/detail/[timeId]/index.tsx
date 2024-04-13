import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getInterviewTimes } from "@/services/get-interview-times";
import { InterviewTime } from "@/types";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AudioPlayer from "@/components/audio-player";
import Footer from "@/components/layout/footer";

const Select = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.Select),
  {
    ssr: false,
  }
);

const InterviewDetail = (props: { interviewTimes: InterviewTime[] }) => {
  const { interviewTimes } = props;
  const [timeId, setTimeId] = useState<string>(interviewTimes[1].id);
  const router = useRouter();

  return (
    <>
      {" "}
      <div className="flex gap-x-8 mx-auto grow px-6 pt-5 h-full w-full duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-4">
        <div className="flex-1">
          <div className="flex justify-between mb-4">
            <div className="flex-2">
              <h3 className="p-0 text-start text-3xl font-semibold text-purple-gradient">
                We will help you to improve!
              </h3>
            </div>
            <div className="flex-1 flex justify-end">
              <Select
                value={timeId}
                onValueChange={(timeId: string) => {
                  setTimeId(timeId);
                  if (timeId === interviewTimes[0].id) {
                    router.push("/dashboard");
                  } else {
                    router.push(`/dashboard/detail/${timeId}`);
                  }
                }}
              >
                <SelectTrigger className="w-56">
                  <SelectValue placeholder="Select your interview record" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Interview Record</SelectLabel>
                    <DropdownMenuSeparator />
                    {interviewTimes?.map((item, index) => (
                      <SelectItem value={item.id} key={index}>
                        {item.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="">
            <AudioPlayer></AudioPlayer>
          </div>
        </div>

        <div className="flex-1"></div>
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;
  console.log(params?.timeId);

  const interviewTimes: InterviewTime[] = await getInterviewTimes();

  return {
    props: {
      interviewTimes: interviewTimes,
    },
  };
}

export default InterviewDetail;