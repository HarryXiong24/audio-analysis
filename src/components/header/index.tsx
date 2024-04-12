import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { UrlDirection } from "@/pages/_app";
import Logo from "../../../public/logo";

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
              <Logo></Logo>
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
            {Object.keys(UrlDirection).map((item) => {
              if (item !== "Home") {
                return (
                  <Link
                    key={item}
                    className="text-muted-foreground hover:text-primary"
                    href="/"
                    onClick={() => {
                      changeUrl(UrlDirection[item]);
                    }}
                  >
                    {item}
                  </Link>
                );
              }
            })}
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
