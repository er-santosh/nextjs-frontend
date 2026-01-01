import Image from "next/image";
import Link from "next/link";

import { appConfig } from "@/config/app";

import { cn } from "@/lib/utils/classname/classname";

import { APP_ROUTES } from "@/constants/app-routes";

import logo from "@/public/assets/images/logo.png";

interface LogoProps {
  href?: string;
  height?: number;
  width?: number;
  showText?: boolean;
  className?: string;
}

const Logo = ({
  href = APP_ROUTES.SITE.ROOT,
  height = 100,
  width = 100,
  showText = true,
  className,
}: LogoProps) => (
  <Link href={href} prefetch className="flex items-center gap-2">
    <div
      className={cn(
        "transition-all duration-200 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8",
        className
      )}
    >
      <Image
        src={logo}
        alt="Logo"
        width={width}
        height={height}
        className="h-full max-h-[100px] w-full max-w-[100px] rounded-md object-contain"
        placeholder="blur"
        priority
      />
    </div>
    {showText && (
      <span className="text-foreground font-bold">{appConfig.name}</span>
    )}
  </Link>
);

export default Logo;
