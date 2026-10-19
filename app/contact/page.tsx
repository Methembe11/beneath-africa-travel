import type { Metadata } from "next";
import ContactPage from "../components/ContactPage";
import { pageMeta } from "../lib/meta";

export const metadata: Metadata = pageMeta({
  path: "/contact",
  title: "Contact | Beneath Africa Travel & Tours",
  description:
    "Contact Beneath Africa Travel and Tours in Victoria Falls, Zimbabwe. Call or WhatsApp +263 77 813 0264, email ranjis@beneathafricatravel.co.zw, or send an enquiry.",
});

export default function Page() {
  return <ContactPage />;
}