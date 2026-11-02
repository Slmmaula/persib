import Image from "next/image";

// Ganti file di public/brand/, lalu samakan src, width, dan height

const LOGO = { src: "/brand/persib-logo.png", width: 600, height: 770 };

interface LogoProps {
  className?: string;
  priority?: boolean;
}

export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Image
      src={LOGO.src}
      alt="PERSIB Bandung"
      width={LOGO.width}
      height={LOGO.height}
      priority={priority}
      className={className}
    />
  );
}
