"use client";

type ExploringItem = {
  label: string;
};

const items: ExploringItem[] = [
  { label: "Rust" },
  { label: "WebGL" },
  { label: "Framer Motion" },
];

const CurrentlyExploring = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <span className="text-sm uppercase tracking-widest text-white/40 shrink-0">
          Currently Exploring
        </span>

        <div className="flex flex-wrap gap-3">
          {items.map((item) => (
            <span
              key={item.label}
              className="rounded-full border border-white/15 bg-white/3 px-4 py-1.5 text-sm text-white/70 transition-colors duration-300 hover:border-white/30 hover:bg-white/6 hover:text-white"
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentlyExploring;