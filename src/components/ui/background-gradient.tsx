"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        animate={animate
          ? {
            backgroundPosition: ["0% 0%", "100% 100%"],
          }
          : undefined}
        transition={animate
          ? {
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }
          : undefined}
        className={cn(
          "absolute inset-0 rounded-[22px] z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent)]",
          className,
        )}
      />
      <motion.div
        animate={animate
          ? {
            backgroundPosition: ["100% 100%", "0% 0%"],
          }
          : undefined}
        transition={animate
          ? {
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }
          : undefined}
        className={cn(
          "absolute inset-0 rounded-[22px] z-[1]",
          "bg-[radial-gradient(circle_farthest-side_at_0_0,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#7b61ff,transparent)]",
          className,
        )}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

