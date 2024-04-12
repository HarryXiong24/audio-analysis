import Header from "@/components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

export const UrlDirection = {
  Home: "https://www.aceinterview.app",
  Interviews: "https://www.aceinterview.app/interviews",
  Career: "https://www.aceinterview.app/career",
  Blog: "https://www.aceinterview.app/blog",
  Pricing: "https://www.aceinterview.app/#pricing",
  ContactUs: "https://www.aceinterview.app/contact-us",
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
