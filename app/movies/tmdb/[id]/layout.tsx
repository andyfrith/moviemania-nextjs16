import MoviesHeader from "@/app/components/movies/tmdb/Header";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  const { id } = await params;

  return (
    <>
      <MoviesHeader id={Number(id)} />
      {children}
    </>
  );
}
