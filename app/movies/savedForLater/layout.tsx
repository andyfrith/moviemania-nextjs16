import SavedForLaterHeader from "@/app/components/movies/SavedForLaterHeader";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SavedForLaterHeader />
      {children}
    </>
  );
}
