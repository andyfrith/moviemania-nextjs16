import Movie from "@/app/components/movies/tmdb/Movie";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return <Movie id={Number(id)} />;
}
