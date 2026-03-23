import { Suspense } from "react";
import { orbitron } from "@/app/lib/fonts";
import AnimatedTitle from "@/app/components/AnimatedTitle";

export default function ProfileHeader({
  subtitle,
  title = "Profile",
}: {
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
          ></Suspense>
        </div>
      </div>
      {subtitle && <p className="text-gray-400 mt-2 pl-5">{subtitle}</p>}
    </div>
  );
}
