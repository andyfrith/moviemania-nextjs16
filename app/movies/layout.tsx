import ParticleEffects from "../components/effects/ParticleEffects";
import NavLinks from "../components/movies/NavLinks";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-900 flex-col md:flex-row md:overflow-hidden">
      <div className="grow p-6 md:overflow-y-auto md:p-12">
        <div className="bg-gray-900 min-h-screen text-white font-sans">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <ParticleEffects
              count={150}
              color="#f97316"
              size={0.015}
              speed={0.15}
              className="opacity-50"
            />
            <NavLinks />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
