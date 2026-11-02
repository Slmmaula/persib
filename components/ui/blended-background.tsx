import Image from "next/image";
import { cn } from "@/lib/utils";

interface BlendedBackgroundProps {
  src: string;
  dim?: boolean;
  className?: string;
}

export function BlendedBackground({
  src,
  dim = true,
  className,
}: BlendedBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "mask-fade-y pointer-events-none absolute inset-0 -z-10",
        className,
      )}
    >
      <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
      {dim ? <div className="absolute inset-0 bg-canvas-edge/55" /> : null}
    </div>
  );
}
