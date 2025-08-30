import { Navbar } from "@/components/public/Navbar";
import HeroSection from "@/components/public/section/HeroSection";
import AboutSection from "@/components/public/section/AboutSection";
import EquipmentSection from "@/components/public/section/EquipmentSection";
import ContactUsSection from "@/components/public/section/ContactUsSection";
import FaqsSection from "@/components/public/section/FaqsSection";
import FooterSection from "@/components/public/section/FooterSection";
import LoginModal from "@/components/public/LoginModal";
import SignupModal from "@/components/public/SignupModal";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EquipmentSection />
      <ContactUsSection />
      <FaqsSection />
      <FooterSection />
      <LoginModal />
      <SignupModal />
    </>
  );
}