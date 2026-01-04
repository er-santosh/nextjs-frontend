import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";

import { APP_ROUTES } from "@/constants/app-routes";

import { cn } from "@/lib/utils/classname";

const GetStartedButton = ({ className, ...other }: ButtonProps) => {
  return (
    <Button asChild size="sm" className={cn(className)} {...other}>
      <Link href={APP_ROUTES.AUTH.LOGIN}>
        Get Started
        <ArrowRight className="ml-2 h-4 w-4 transform transition-all group-hover:translate-x-2" />
      </Link>
    </Button>
  );
};

export default GetStartedButton;
