import TopRatedHeader from "@/app/components/movies/TopRatedHeader";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopRatedHeader />
      {children}
    </>
  );
}
