import Header from "@/components/layout/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

export const UrlDirection: Record<string, string> = {
  Home: "https://www.aceinterview.app",
  Interviews: "https://www.aceinterview.app/interviews",
  Career: "https://www.aceinterview.app/career",
  Blog: "https://www.aceinterview.app/blog",
  Pricing: "https://www.aceinterview.app/#pricing",
  "Contact Us": "https://www.aceinterview.app/contact-us",
};

export default function App({ Component, pageProps }: AppProps) {
  const [url, setUrl] = useState(UrlDirection.Home);

  return (
    <>
      <Header changeUrl={setUrl} />
      <main>
        <Component {...pageProps} url={url} />
      </main>
    </>
  );
}
