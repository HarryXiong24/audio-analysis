import { AudioSuggestion, TargetTrainingData } from "@/types";
import { Button } from "../../ui/button";
import { CalendarDays, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { DropdownMenuSeparator } from "../../ui/dropdown-menu";
import { useEffect, useState } from "react";
import { getTargetTrainingData } from "@/services/get-target-training";

const AISuggestion = (props: {
  timeId: string;
  isPlaying: boolean;
  audioSuggestions: AudioSuggestion[];
  currentRegionId: string | null;
}) => {
  const { timeId, isPlaying, audioSuggestions, currentRegionId } = props;
  const [targetTrainingData, setTargetTrainingData] = useState<
    TargetTrainingData[]
  >([]);

  const matchedItems = audioSuggestions.filter(
    (item) => currentRegionId === item.id
  );

  const fetchTargetTrainingData = async (timeId: string) => {
    const data = await getTargetTrainingData(timeId);
    setTargetTrainingData(data || []);
  };

  useEffect(() => {
    fetchTargetTrainingData(timeId);
  }, [timeId]);

  return (
    <Sheet>
      <div className="my-4 flex flex-col justify-start">
        <p className="text-xl">AI Suggestion</p>
        <div className="py-4">
          {matchedItems.length > 0 ? (
            matchedItems.map((item, index) => (
              <p key={index} className="text-base">
                {item.suggestion}
              </p>
            ))
          ) : (
            <div className="flex justify-start">
              {isPlaying ? (
                <div className="waveform my-4">
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                </div>
              ) : (
                <p className="text-base">No audio are playing.</p>
              )}
            </div>
          )}
        </div>
        {matchedItems.length > 0 && (
          <div className="justify-self-end self-end mt-2">
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full text-base"
                onClick={() => {}}
              >
                Get targeted training
                <ChevronRight />
              </Button>
            </SheetTrigger>
          </div>
        )}
      </div>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Targeted Train</SheetTitle>
          <SheetDescription>
            There are our strategies to help you improve your speaking skills.
          </SheetDescription>
        </SheetHeader>

        {targetTrainingData.map((item, index) => (
          <div key={index}>
            <DropdownMenuSeparator className="mt-4" />
            <div className="flex space-x-2 py-4">
              <Avatar className="mr-4">
                <AvatarImage src={item.imgUrl} />
              </Avatar>
              <div className="space-y-1 x-full">
                <h4 className="text-sm font-semibold text-left">
                  {item.title}
                </h4>
                <p className="text-sm">{item.description}</p>
                <div className="flex items-center pt-2">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </div>
                <div className="flex justify-end">
                  <Button variant="link" className="text-xs">
                    {item.linName}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default AISuggestion;
