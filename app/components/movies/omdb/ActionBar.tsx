import GotoSearchButton from "@/app/components/GotoSearchButton";
import SaveForLaterButton from "@/app/components/SaveForLaterButton";
import RemoveSaveForLaterButton from "@/app/components/RemoveSaveForLaterButton";
import SavedForLaterButton from "@/app/components/SavedForLaterButton";
import { getSavedForLater } from "@/app/lib/actions";
import { fetchMovie } from "@/app/lib/data";
import { Movie } from "@/app/lib/types";

export default async function ActionBar({ imdbID }: { imdbID: string }) {
  const savedForLater = await getSavedForLater();
  const savedMovie = savedForLater!.filter(
    (m: Movie) => m.imdbID === imdbID,
  )[0];
  let movie = null;
  if (!savedMovie) {
    movie = await fetchMovie(imdbID);
  }
  return (
    <>
      {savedMovie ? (
        <RemoveSaveForLaterButton movie={savedMovie} />
      ) : (
        movie && <SaveForLaterButton movie={movie} />
      )}
      <GotoSearchButton />
      <SavedForLaterButton />
    </>
  );
}
