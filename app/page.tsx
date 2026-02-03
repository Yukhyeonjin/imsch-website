import { Hero } from "@/components/home/Hero";
import { ServiceInfo } from "@/components/home/ServiceInfo";
import { RecentNews } from "@/components/home/RecentNews";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ServiceInfo />
      <RecentNews />
    </div>
  );
}
