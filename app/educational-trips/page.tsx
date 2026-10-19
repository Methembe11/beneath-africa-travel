import type { Metadata } from "next";
import InteriorPage from "../components/InteriorPage";
import { educationalTrips } from "../lib/content";
import { pageMeta } from "../lib/meta";

export const metadata: Metadata = pageMeta({
  path: "/educational-trips",
  title: "Educational School Trips | Beneath Africa Travel & Tours",
  description:
    "Victoria Falls educational school trips including an overnight stay in Hwange, a guided Falls tour, a sunset cruise and a visit to a crocodile farm.",
});

export default function EducationalTripsPage() {
  return <InteriorPage page={educationalTrips} />;
}