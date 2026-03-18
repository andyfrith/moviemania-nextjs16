"use client";

import { motion } from "framer-motion";

export default function MoviesHeader({
  buttons,
  subtitle,
  title = "Movies",
}: {
  buttons?: Array<React.ReactElement>;
  subtitle?: string;
  title?: string;
}) {
  return (
    <div className="mb-8 md:mb-12">
      <div className="flex items-center">
        <motion.h1
          className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold tracking-tight border-l-4 border-yellow-400 pl-4"
          style={{
            background:
              "linear-gradient(135deg, #A855F7 0%, #EC4899 25%, #3B82F6 50%, #06B6D4 75%, #A855F7 100%)",
            backgroundSize: "200% 200%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 40px rgba(139, 92, 246, 0.4)",
            animation: "gradient-shift 4s ease-in-out infinite",
          }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {title}
        </motion.h1>
        {buttons && <div className="ml-auto space-x-2">{...buttons}</div>}
      </div>
      {subtitle && <p className="text-gray-400 mt-2 pl-5">{subtitle}</p>}
    </div>
  );
}
