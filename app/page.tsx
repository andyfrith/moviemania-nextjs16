import Link from "next/link";
import { Footer } from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="relative h-screen w-full font-sans">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/bg.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-wider uppercase">
          Discover Your Next Obsession
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl">
          Explore thousands of movies, from timeless classics to the latest
          blockbusters. Your cinematic journey starts here.
        </p>
        <Link
          href="/movies"
          className="mt-10 px-8 py-4 bg-yellow-400 text-gray-900 font-bold text-lg uppercase rounded-lg shadow-lg hover:bg-yellow-300 transition-colors duration-300 ease-in-out transform hover:scale-105"
        >
          Let's go to the movies!
        </Link>
        <div className="mt-64">
          <Footer />
        </div>
      </div>
    </div>
  );
}
