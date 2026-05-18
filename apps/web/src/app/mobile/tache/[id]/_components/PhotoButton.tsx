"use client";

import { useRef, useState } from "react";

export function PhotoButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState(0);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCount((c) => c + 1);
      e.target.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-2">
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
        className="flex min-h-[80px] items-center justify-center gap-3 rounded-2xl bg-[#1f3125] text-2xl font-bold text-white shadow-sm active:bg-[#0f1a14]"
      >
        <span className="text-3xl leading-none">📷</span>
        {count === 0 ? "PHOTO" : `PHOTO (${count})`}
      </button>
      {count > 0 && (
        <p className="text-center text-base text-[#2f6a44]">
          ✅ {count} photo{count > 1 ? "s" : ""} prise{count > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
