import { HeroSection } from "@/components/home/HeroSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { ApproachSection } from "@/components/home/ApproachSection";
import { BlogPreviewSection } from "@/components/home/BlogPreviewSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductsSection />
      <div className="divider" />
      <ApproachSection />
      <div className="divider" />
      <BlogPreviewSection />
    </>
  );
}
