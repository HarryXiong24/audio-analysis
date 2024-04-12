import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { UrlDirection } from "@/pages/_app";

const Header = (props: { changeUrl: (param: string) => void }) => {
  const { changeUrl } = props;

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b backdrop-blur transition-all duration-200 max-md:bg-white/80 md:border-b-transparent md:bg-[rgb(249_250_251)]">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-4">
        <nav className="flex items-center justify-center gap-x-4 max-md:flex-row-reverse">
          <div>
            <Link
              className="flex flex-row items-center justify-center gap-x-1.5 text-lg font-medium leading-none text-black dark:text-white"
              aria-label="MockAI"
              href="/"
              onClick={() => {
                changeUrl(UrlDirection.Home);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                width="20"
                height="20"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                ></path>
              </svg>
              <span className="pt-0.5">
                Mock
                <sup className="text-xs">AI</sup>
              </span>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-x-8 ml-4 max-md:hidden">
            <Link
              className="text-muted-foreground hover:text-primary"
              href="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className="text-muted-foreground hover:text-primary"
              href="/"
              onClick={() => {
                changeUrl(UrlDirection.Interviews);
              }}
            >
              Interviews
            </Link>
            <Link
              className="text-muted-foreground hover:text-primary"
              href="/"
              onClick={() => {
                changeUrl(UrlDirection.Career);
              }}
            >
              Career
            </Link>
            <Link
              className="text-muted-foreground hover:text-primary"
              href="/"
              onClick={() => {
                changeUrl(UrlDirection.Blog);
              }}
            >
              Blog
            </Link>
            <Link
              className="text-muted-foreground hover:text-primary"
              href="/"
              onClick={() => {
                changeUrl(UrlDirection.Pricing);
              }}
            >
              Pricing
            </Link>
            <Link
              className="text-muted-foreground hover:text-primary"
              href="/"
              onClick={() => {
                changeUrl(UrlDirection.ContactUs);
              }}
            >
              Contact Us
            </Link>
          </div>
        </nav>
        <div className="flex flex-row items-center justify-center">
          <Avatar style={{ width: 24, height: 24 }}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
          <span className="ml-2">Harry</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
