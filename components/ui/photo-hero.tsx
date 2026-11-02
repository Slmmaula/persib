import Image from "next/image";

export function PhotoHero({ src }: { src: string }) {
  return (
    <div className="relative isolate h-[20rem] sm:h-[26rem] lg:h-[34rem]">
      <div aria-hidden="true" className="mask-fade-b absolute inset-0 -z-10">
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-canvas-edge/60 via-transparent to-transparent" />
      </div>
    </div>
  );
}
