import { Feature } from "@/components/Features";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="space-y-2 mt-10">
      <Hero />
      <Feature />
    </div>
  );
}
