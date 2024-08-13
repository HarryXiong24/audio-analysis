import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const Typewriter = (props: {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
}) => {
  const {
    phrases,
    typingSpeed = 200,
    deletingSpeed = 100,
    delay = 2000,
  } = props;

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      if (subIndex === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % phrases.length);
        setSubIndex(0); // 确保subIndex重新开始于0
      } else {
        timer = setTimeout(() => {
          setCurrentText(currentText.slice(0, subIndex - 1));
          setSubIndex(subIndex - 1);
        }, deletingSpeed);
      }
    } else {
      if (subIndex === phrases[index].length) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delay);
      } else {
        timer = setTimeout(() => {
          setCurrentText(currentText + phrases[index][subIndex]);
          setSubIndex(subIndex + 1);
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [
    subIndex,
    isDeleting,
    index,
    typingSpeed,
    deletingSpeed,
    delay,
    currentText,
    phrases,
  ]);

  return (
    <h2 className="typewriter text-3xl whitespace-nowrap text-start font-semibold">
      <span>{currentText ? currentText : ""}</span>
      <span className="cursor">|</span>
    </h2>
  );
};

const Footer = () => {
  const phrases: string[] = [
    "Communication",
    "Problem Solve",
    "Think Out loud",
  ];

  return (
    <footer
      className="mt-20 inset-x-0 bottom-0 flex w-full flex-col items-center justify-start border-t p-6 pb-0 pt-24 md:p-24 md:pb-0"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.3), hsla(0, 0%, 100%, 0))",
      }}
    >
      <div className="mb-10 flex w-full max-w-screen-sm flex-col items-start justify-start space-y-5">
        <div className="flex w-full flex-row items-start max-md:flex-col max-md:space-y-2 md:space-x-3">
          <h2 className="text-3xl whitespace-nowrap text-start font-semibold">
            Engage in
          </h2>
          <Typewriter phrases={phrases} />
        </div>
        <p className="text-start text-lg text-gray-500">
          Interaction and engagement often make or break an interview.
        </p>
        <p className="text-start text-lg text-gray-500">
          We built Interview<sup className="text-xs">AI</sup> as an immersive
          experience to help you prepare for your next interview.
        </p>
        <a
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-10 py-2 group px-0 text-base text-gray-500 underline shadow-none hover:border-b hover:border-none hover:text-primary hover:shadow-none"
          href=""
        >
          Try it out for free
          <ArrowRight className="w-4 h-4 lucide lucide-arrow-right ml-2 transition-transform duration-200 group-hover:translate-x-2"></ArrowRight>
        </a>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full"
      ></div>
    </footer>
  );
};

export default Footer;
