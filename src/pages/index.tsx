import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Welcome to Dashboard
      </Button>
    </div>
  );
}
