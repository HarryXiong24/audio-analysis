export default function Home(props: { url: string }) {
  const { url } = props;

  return (
    <iframe
      src={url}
      width="100%"
      height="100&"
      className="fixed inset-0 w-full h-full"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}
