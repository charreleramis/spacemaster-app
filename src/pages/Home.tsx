import Hero from "../components/Hero";
import Features from "../components/Features";
import AdsCarousel from "../components/AdsCarousel";
import Pricing from "../components/Pricing";
import Reviews from "../components/Reviews";
import Faq from "../components/Faq";
import CTA from "../components/CTA";

export default function Home() {
    return (
        <>
            <Hero />
            <Features />
            <AdsCarousel />
            <Pricing />
            <Reviews />
            <Faq />
            <CTA />
        </>
    )
}