"use client";

import * as React from "react";

import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils/classname/classname";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const thumbValues = React.useMemo(() => {
    if (Array.isArray(value)) {
      return value;
    }
    if (Array.isArray(defaultValue) && defaultValue.length > 0) {
      return defaultValue;
    }
    return [min];
  }, [value, defaultValue, min]);

  const sliderProps = {
    "data-slot": "slider" as const,
    min,
    max,
    className: cn(
      "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
      className
    ),
    ...props,
    ...(defaultValue !== undefined && { defaultValue }),
    ...(value !== undefined && { value }),
  };

  return (
    <SliderPrimitive.Root {...sliderProps}>
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {thumbValues.map(val => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={val}
          className="border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
