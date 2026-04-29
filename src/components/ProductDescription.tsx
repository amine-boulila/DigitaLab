"use client";

import { useState } from "react";

interface ProductDescriptionProps {
  description: string;
  limit?: number;
}

export function ProductDescription({
  description,
  limit = 260,
}: ProductDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const normalizedDescription = description
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n");
  const isExpandable = normalizedDescription.length > limit;

  return (
    <div className="max-w-2xl">
      <p
        className={
          isExpanded || !isExpandable
            ? "whitespace-pre-line text-lg leading-8 text-slate-600"
            : "line-clamp-2 whitespace-pre-line text-lg leading-8 text-slate-600"
        }
      >
        {normalizedDescription}
      </p>
      {isExpandable ? (
        <button
          className="mt-3 inline-flex cursor-pointer items-center text-sm font-semibold text-teal-700 transition hover:text-teal-600"
          type="button"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((current) => !current)}
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      ) : null}
    </div>
  );
}
