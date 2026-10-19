"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./image-stack-carousel.module.css";

/*
 * Image stack carousel — a draggable pile of photo cards. Pull the front
 * card past the swipe threshold (or flick it) and it flies off and settles
 * at the back of the pile.
 *
 * Ported from the shadcn/ui-style source. The project does not use Tailwind,
 * so the utility classes were translated to ./image-stack-carousel.module.css
 * and the default images point at the local Beneath Africa library instead of
 * an external CDN.
 */

const defaultCards: SwipeCardItem[] = [
  { id: 1, img: "/image-library/Helicopter Flights image1.jpg", alt: "Mist rising off Victoria Falls." },
  { id: 2, img: "/image-library/Beneath africa travel cruise.jpeg", alt: "Sunset on a Zambezi river cruise." },
  { id: 3, img: "/image-library/Beneath elephant image.jpeg", alt: "A game drive in the early morning." },
  { id: 4, img: "/image-library/Cultural Experience image3.jpg", alt: "A cultural visit near Victoria Falls." },
  { id: 5, img: "/image-library/Beneath tent image.jpeg", alt: "A Beneath Africa bush camp." },
];

const defaultSettings = {
  width: 320,
  height: 320,
  radius: 16,
  swipeThreshold: 120,
  stackRotation: 5,
  stackScale: 0.035,
  tiltStrength: 25,
  springStiffness: 300,
  springDamping: 30,
  mobileBreakpoint: 480,
  mobileScale: 0.8,
};

export type SwipeCardsSettings = typeof defaultSettings;

export interface SwipeCardItem {
  id: number | string;
  img: string;
  alt?: string;
}

interface SwipeCardProps {
  children: React.ReactNode;
  isFront: boolean;
  zIndex: number;
  onSendToBack: () => void;
  settings: SwipeCardsSettings;
}

function SwipeCard({
  children,
  isFront,
  zIndex,
  onSendToBack,
  settings,
}: SwipeCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(
    y,
    [-200, 200],
    [settings.tiltStrength, -settings.tiltStrength],
  );
  const rotateY = useTransform(
    x,
    [-200, 200],
    [-settings.tiltStrength, settings.tiltStrength],
  );

  function handleDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    const draggedFarEnough =
      Math.abs(info.offset.x) > settings.swipeThreshold ||
      Math.abs(info.offset.y) > settings.swipeThreshold;

    if (draggedFarEnough) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className={styles.card}
      style={{
        width: settings.width,
        height: settings.height,
        x: isFront ? x : 0,
        y: isFront ? y : 0,
        rotateX: isFront ? rotateX : 0,
        rotateY: isFront ? rotateY : 0,
        zIndex,
      }}
      drag={isFront}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.5}
      onDragEnd={handleDragEnd}
      whileHover={isFront ? { scale: 1.03 } : {}}
      transition={{
        type: "spring",
        stiffness: settings.springStiffness,
        damping: settings.springDamping,
      }}
    >
      {children}
    </motion.div>
  );
}

interface SwipeCardsProps {
  cards?: SwipeCardItem[];
  settings?: Partial<SwipeCardsSettings>;
  className?: string;
}

function useResponsiveScale(breakpoint: number, mobileScale: number) {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [breakpoint],
  );
  const getSnapshot = React.useCallback(
    () =>
      window.matchMedia(`(max-width: ${breakpoint}px)`).matches
        ? mobileScale
        : 1,
    [breakpoint, mobileScale],
  );
  const getServerSnapshot = React.useCallback(() => 1, []);
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function SwipeCards({
  cards = defaultCards,
  settings,
  className = "",
}: SwipeCardsProps) {
  const baseConfig = { ...defaultSettings, ...settings };
  const scale = useResponsiveScale(
    baseConfig.mobileBreakpoint,
    baseConfig.mobileScale,
  );
  const config = {
    ...baseConfig,
    width: Math.round(baseConfig.width * scale),
    height: Math.round(baseConfig.height * scale),
  };
  const [cardList, setCardList] = useState(cards);
  const pointerDown = React.useRef<{ x: number; y: number } | null>(null);

  const moveToBack = (id: number | string) => {
    setCardList((prev) => {
      const updated = [...prev];
      const cardIndex = updated.findIndex((card) => card.id === id);
      if (cardIndex !== -1) {
        const [movedCard] = updated.splice(cardIndex, 1);
        updated.push(movedCard);
      }
      return updated;
    });
  };

  const advance = () => {
    setCardList((prev) => {
      if (prev.length < 2) return prev;
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  const handleClick = (event: React.MouseEvent) => {
    const start = pointerDown.current;
    if (start) {
      const moved =
        Math.abs(event.clientX - start.x) > 6 ||
        Math.abs(event.clientY - start.y) > 6;
      if (moved) return;
    }
    advance();
  };

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")}>
      <div
        className={styles.stage}
        style={{
          width: config.width,
          height: config.height,
          perspective: 1200,
        }}
        role="button"
        tabIndex={0}
        aria-label="Show the next photo"
        onPointerDown={(event) => {
          pointerDown.current = { x: event.clientX, y: event.clientY };
        }}
        onClick={handleClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            advance();
          }
        }}
      >
        {cardList.map((card, index) => {
          const isFront = index === 0;
          const zIndex = cardList.length - index;

          return (
            <SwipeCard
              key={card.id}
              isFront={isFront}
              zIndex={zIndex}
              settings={config}
              onSendToBack={() => moveToBack(card.id)}
            >
              <motion.div
                className={styles.frame}
                style={{ borderRadius: config.radius }}
                animate={{
                  rotateZ: index * config.stackRotation,
                  scale: 1 - index * config.stackScale,
                  transformOrigin: "85% 85%",
                }}
                initial={false}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <Image
                  src={card.img}
                  alt={card.alt ?? ""}
                  fill
                  className={styles.img}
                  sizes={`${config.width}px`}
                  priority={isFront}
                />
              </motion.div>
            </SwipeCard>
          );
        })}
      </div>
    </div>
  );
}

export default SwipeCards;
