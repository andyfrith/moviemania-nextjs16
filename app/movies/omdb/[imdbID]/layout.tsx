import MoviesHeader from "@/app/components/movies/Header";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ imdbID: string }>;
  children: React.ReactNode;
}) {
  const { imdbID } = await params;

  return (
    <>
      <MoviesHeader imdbID={imdbID} />
      {children}
    </>
  );
}
