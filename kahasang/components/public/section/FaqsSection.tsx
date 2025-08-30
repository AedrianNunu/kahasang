"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function FaqsSection() {
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);

  const faqs = [
    {
      question: "How do I borrow equipment?",
      answer: "Sign up or log in to reserve equipment through our online system. Ensure you have approval from your supervisor and check equipment availability."
    },
    {
      question: "Who can use the system?",
      answer: "Registered students and researchers at CHMSU Binalbagan can use the system. Please contact the fisheries office for registration."
    },
  ];

  return (
    <section id="faqs" className="py-12 bg-white flex justify-center">
      <motion.div
        className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <h2 className="text-3xl font-bold text-[#16a34a] tracking-wide mb-4">
          Frequently Asked Questions about Equipment Borrowing
        </h2>
        <p className="text-black leading-relaxed mb-6 max-w-md mx-auto">
          Find answers to common questions about our equipment borrowing system at CHMSU.
        </p>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Drawer key={index} open={openDrawer === faq.question} onOpenChange={(open) => setOpenDrawer(open ? faq.question : null)}>
              <DrawerTrigger asChild>
                <Card
                  className="cursor-pointer border-2 border-[#16a34a] shadow-md hover:shadow-lg transition-shadow duration-300"
                  onClick={() => setOpenDrawer(faq.question)}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg font-semibold text-black">
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </DrawerTrigger>
              <DrawerContent className="bg-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-black mb-2">{faq.question}</h3>
                  <p className="text-black text-sm">{faq.answer}</p>
                  <Button
                    className="mt-4 bg-[#16a34a] text-white hover:bg-green-700 rounded-md"
                    onClick={() => setOpenDrawer(null)}
                  >
                    Close
                  </Button>
                </CardContent>
              </DrawerContent>
            </Drawer>
          ))}
        </div>
      </motion.div>
    </section>
  );
}