"use client";

import CardGrid from "../CardGrid";
import { bookableCards } from "../../lib/catalogue";
import BookingTrigger from "./BookingTrigger";

/** Bookable experiences grid with add-to-trip actions (client-only: function props). */
export default function BookableGrid() {
  return (
    <CardGrid
      items={bookableCards}
      label="Bookable experiences"
      eyebrow="Book direct"
      heading="Book By Experience"
      intro="The experiences you can add straight to a booking request — timings, operators and transfers are confirmed on request."
      tone="white"
      renderAction={(item) => (
        <BookingTrigger slug={item.href.split("/").pop()} variant="compact" />
      )}
    />
  );
}
