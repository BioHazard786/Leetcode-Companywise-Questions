import { cn } from "@/lib/utils";
import React from "react";

const SPINNER_COUNT = 12;

const SpinnerSpan: React.FC<{ index: number; className?: string }> = React.memo(
  ({ index, className }) => (
    <span
      className={cn(
        "absolute left-[-10%] top-[-3.9%] h-[8%] w-[24%] rounded-[2.5px] bg-background",
        className
      )}
      style={{
        animation: `spinner 1.2s linear ${
          -1.2 + index * 0.1
        }s infinite normal none running`,
        transform: `rotate(${index * 30}deg) translate(146%)`,
      }}
    />
  )
);

type SpinnerProps = {
  className?: string;
  loadingSpanClassName?: string;
};

export const Spinner: React.FC<SpinnerProps> = React.memo(
  ({ className, loadingSpanClassName, ...props }) => {
    return (
      <div className={cn("block size-5", className)} {...props}>
        <div className="relative left-[50%] top-[50%] h-full w-full">
          {[...Array(SPINNER_COUNT)].map((_, index) => (
            <SpinnerSpan
              key={`spinner-${index}`}
              index={index}
              className={loadingSpanClassName}
            />
          ))}
        </div>
      </div>
    );
  }
);

Spinner.displayName = "Spinner";
