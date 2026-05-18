"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export function PhotoCapture({ nextHref }: { nextHref: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [hasPhoto, setHasPhoto] = useState(false);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setHasPhoto(true);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={onChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-2xl bg-[#2f6a44] text-white shadow-sm active:bg-[#27583a]"
      >
        <span className="text-7xl leading-none">📷</span>
        <span className="text-2xl font-bold">
          {hasPhoto ? "REFAIRE LA PHOTO" : "PRENDRE LA PHOTO"}
        </span>
      </button>

      {hasPhoto && (
        <button
          type="button"
          onClick={() => router.push(nextHref)}
          className="flex min-h-[80px] items-center justify-center rounded-2xl bg-[#1f3125] text-2xl font-bold text-white shadow-sm active:bg-[#0f1a14]"
        >
          CONTINUER
        </button>
      )}
    </div>
  );
}
