"use client";

import { whatIDo as items } from "@/data/homePage";

const WhatIDo = () => {
  return (
    <div className="w-full">
      <div className="border-t border-white/20 w-[50%]" />

      <div className="flex flex-col md:flex-row gap-10 md:gap-16 py-16">
        {/* left heading, pinned */}
        <div className="md:w-34 shrink-0">
          <span className="text-sm uppercase tracking-widest text-white/40">
            What I Do
          </span>
        </div>

        {/* right grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
          {items.map((item) => (
            <div key={item.index} className="group">
              <div className="flex items-center gap-2 text-sm text-white/40">
                <span className="font-mono">{item.index}</span>
              </div>

              <h3 className="mt-3 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-white/80">
                {item.title}
              </h3>

              <p className="mt-3 text-sm text-white/50 max-w-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-white/20 w-[50%] ms-auto" />
    </div>
  );
};

export default WhatIDo;