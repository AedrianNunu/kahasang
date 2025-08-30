"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

// Animation variants for scroll-triggered pop-off and flow
const sectionVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

// Animation variants for text slide
const textSlideVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.2, ease: "easeOut" as const },
  }),
};

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const keyFeatures = [
    "Streamlined Equipment Access",
    "Real-Time Inventory Updates",
    "Support for Marine Innovation",
  ];

  const subjects = [
    { src: "/aboutimage/aquaculture.jpg", alt: "Aquaculture", title: "Aquaculture" },
    { src: "/aboutimage/marinebiology.jpg", alt: "Marine Biology", title: "Marine Biology" },
    { src: "/aboutimage/fisheriestech.jpg", alt: "Fisheries Technology", title: "Fisheries Technology" },
    { src: "/aboutimage/waterquality.jpg", alt: "Water Quality Management", title: "Water Quality Management" },
  ];

  return (
    <section
      id="about"
      className="py-12 bg-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{}}
        >
          {/* Text Content */}
          <div className="lg:w-1/2">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-[#16a34a] tracking-wide">
                  About CHMSU Fisheries System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base text-black leading-relaxed">
                  The CHMSU Fisheries System revolutionizes equipment management for research and education, launched to empower marine scientists since 2020.
                </CardDescription>
                <CardDescription className="text-base text-black leading-relaxed">
                  We provide cutting-edge tools and a user-friendly platform, fostering innovation and collaboration in the fisheries community.
                </CardDescription>
                <motion.div className="space-y-3">
                  {keyFeatures.map((feature, index) => (
                    <motion.p
                      key={feature}
                      className="text-sm font-medium text-black flex items-center"
                      variants={textSlideVariants}
                      custom={index}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                    >
                      <span className="w-2 h-2 bg-[#16a34a] rounded-full mr-2"></span>
                      {feature}
                    </motion.p>
                  ))}
                </motion.div>
                <Button
                  size="lg"
                  className="mt-6 bg-[#16a34a] hover:bg-white hover:text-[#16a34a] hover:border-[#16a34a] transition-all duration-300 rounded-lg"
                  asChild
                >
                  <Link href="/about">Explore More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Four-Image Collage */}
          <div className="lg:w-1/2">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="grid grid-cols-2 gap-4 p-4">
                {subjects.map((subject, index) => (
                  <motion.div
                    key={index}
                    className="relative overflow-hidden rounded-lg border-2 border-[#16a34a] hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={subject.src}
                      alt={subject.alt}
                      width={300}
                      height={200}
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/placeholder.png"; // Default fallback
                      }}
                    />
                    <div className="absolute bottom-2 left-2 bg-[#16a34a] text-white text-xs font-semibold px-2 py-1 rounded">
                      {subject.title}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}