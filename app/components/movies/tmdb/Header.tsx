import { Suspense } from "react";
import { orbitron } from "@/app/lib/fonts";
// import ActionBar from "@/app/components/movies/ActionBar";
import AnimatedTitle from "@/app/components/AnimatedTitle";

export default function MoviesHeader({
  id,
  subtitle,
  title = "Movies",
}: {
  id?: number;
  subtitle?: string;
  title?: string;
}) {
  return (
    <div className={`${orbitron.className} antialiased mb-8 md:mb-12`}>
      <div className="flex items-center">
        <AnimatedTitle title={title} />
        <div className="ml-auto space-x-2">
          <Suspense
            fallback={
              <div className="bg-gray-800 w-full h-full my-8 rounded-2xl">
                &nbsp;
              </div>
            }
          >
            {/* {id && <ActionBar imdbID={id.toString()} />} */}
          </Suspense>
        </div>
      </div>
      {subtitle && <p className="text-gray-400 mt-2 pl-5">{subtitle}</p>}
    </div>
  );
}
