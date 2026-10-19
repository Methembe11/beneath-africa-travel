import type { Metadata } from "next";
import Home from "./components/home/Home";
import { pageMeta } from "./lib/meta";

export const metadata: Metadata = pageMeta({
  path: "/",
  title: "Beneath Africa Travel & Tours | Victoria Falls, Zimbabwe",
  description:
    "Road and water transfers, safaris, cruises, houseboats and tailor-made journeys across Zimbabwe, Zambia, Botswana and Namibia. A Victoria Falls company established in 2013.",
});

export default function Page() {
  return <Home />;
}
