import Link from "next/link";
import { Avatar, AvatarImage } from "../../ui/avatar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b backdrop-blur transition-all duration-200 max-md:bg-white/80 md:border-b-transparent md:bg-[rgb(249_250_251)]">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-4">
        <nav className="flex items-center justify-center gap-x-4 max-md:flex-row-reverse">
          <div className="flex items-center justify-center gap-x-8 ml-4 max-md:hidden">
            <Link
              className="text-muted-foreground hover:text-primary"
              href="/dashboard"
            >
              Dashboard
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
