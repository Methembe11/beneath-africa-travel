"use client";

import { MotionConfig } from "framer-motion";

/* The six durations and two easings are the whole motion
   vocabulary. MotionConfig reducedMotion="user" makes the
   library honour the OS setting for transform and layout
   animations while leaving opacity fades intact, which is
   the correct accessibility trade: content still appears. */
export default function MotionShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.33, 1, 0.68, 1] }}>
      {children}
    </MotionConfig>
  );
}