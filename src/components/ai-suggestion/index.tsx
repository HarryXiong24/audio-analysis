import { AudioSuggestion } from "@/types";

const AISuggestion = (props: {
  isPlaying: boolean;
  audioSuggestions: AudioSuggestion[];
  currentRegionId: string | null;
}) => {
  const { isPlaying, audioSuggestions, currentRegionId } = props;

  const matchedItems = audioSuggestions.filter(
    (item) => currentRegionId === item.id
  );

  return (
    <div className="my-4">
      <p className="text-xl">AI Suggestion</p>
      <div className="py-4">
        {matchedItems.length > 0 ? (
          matchedItems.map((item, index) => (
            <p key={index} className="text-base text-neutral-500">
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
              <p className="text-base text-neutral-500">No audio are playing</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AISuggestion;
