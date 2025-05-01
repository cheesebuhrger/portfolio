// components/IndexCraft.tsx

"use client";

import React from "react";
import Modal from "./Modal";
import MediaItem from "./MediaItem";
import { useModal } from "../hooks/useModal";
import Link from "next/link";
import { playgroundItems } from "@/data/indexPlaygroundItems";

interface GridItem {
  type: "image" | "video" | "experiment";
  src: string;
  title?: string;
  date?: string;
  url?: string;
  description?: string;
}

const IndexPlayground: React.FC = () => {
  const { isOpen, currentIndex, open, close, next, prev } =
    useModal(playgroundItems);

  return (
    <section
      id="playground"
      className="relative border-t border-border-primary p-4 md:p-6 lg:p-8"
    >
      <h2 className="text-xs font-mono uppercase mb-64">Playground</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {playgroundItems.map((item, index) => (
          <div
            key={index}
            className="cursor-animation relative group overflow-hidden rounded-md aspect-4/3 cursor-pointer bg-surface-secondary"
            onClick={() => open(index)}
            data-cursor-text="VIEW DETAILS"
          >
            <MediaItem item={item} />
            <div className="absolute inset-0 bg-surface-overlay flex items-center justify-center p-4 text-text-on-action opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="text-center">
                <h3 className="text-2xl">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isOpen} onClose={close} onPrev={prev} onNext={next}>
        <div className="mx-auto max-w-[1600px] w-full">
          <div className="flex flex-col gap-4 md:gap-8 lg:flex-row p-4 md:p-8 h-auto">
            <div className="flex-shrink-0 lg:w-2/3">
              <div className="w-full h-0 pb-[75%] relative">
                <div className="absolute inset-0">
                  <MediaItem
                    item={playgroundItems[currentIndex]}
                    isModal={true}
                  />
                </div>
              </div>
            </div>
            <div className="lg:w-1/3">
              <h2 className="text-4xl mb-4">
                {playgroundItems[currentIndex].title}
              </h2>
              <div className="flex flex-row mb-4 text-base">
                {playgroundItems[currentIndex].date && (
                  <p>{playgroundItems[currentIndex].date}</p>
                )}
                {playgroundItems[currentIndex].url && <p className="mx-4">/</p>}
                {playgroundItems[currentIndex].url && (
                  <Link
                    href={playgroundItems[currentIndex].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-text-action text-base"
                  >
                    View
                  </Link>
                )}
              </div>
              <p className="text-base">
                {playgroundItems[currentIndex].description}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default IndexPlayground;
