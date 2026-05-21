import { createFileRoute } from "@tanstack/react-router";
import { Ticker } from "@/components/Ticker";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Vision } from "@/components/Vision";
import { Environment } from "@/components/Environment";
import { Manifesto } from "@/components/Manifesto";
import { Membership } from "@/components/Membership";
import { Rants } from "@/components/Rants";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Cockroach Janta Party Vidisha — Voice of Vidisha's Lazy & Unemployed" },
      { name: "description", content: "A satirical, citizen-led movement to clean Vidisha. Fix roads, water, air, garbage, and corruption — loudly and publicly." },
      { property: "og:title", content: "Cockroach Janta Party Vidisha" },
      { property: "og:description", content: "Eat Dirt. Clean Vidisha. A movement for citizens, by citizens." },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen">
      <Ticker />
      <Navbar />
      <Hero />
      <Vision />
      <Environment />
      <Manifesto />
      <Membership />
      <Rants />
      <Footer />
    </main>
  );
}
