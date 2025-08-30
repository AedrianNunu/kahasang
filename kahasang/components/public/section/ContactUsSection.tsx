"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { Toaster, toast } from "sonner";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function ContactUsSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields.", {
        className:
          "bg-red-50 text-red-700 border border-red-200 rounded-md shadow-sm py-2 px-4 text-sm font-medium",
        duration: 4000,
        position: "top-right",
      });
      return;
    }
    // Simulate form submission
    toast.success("Message sent successfully! We will get back to you soon.", {
      className:
        "bg-green-100 text-green-800 border border-green-600 rounded-md shadow-sm py-2 px-4 text-sm font-medium",
      duration: 4000,
      position: "top-right",
    });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact-us" className="py-12 bg-white flex justify-center">
      <Toaster />
      <motion.div
        className="text-center px-4 sm:px-6 lg:px-8 max-w-5xl"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <h2 className="text-3xl font-bold text-[#16a34a] tracking-wide mb-4">
          Contact Our Fisheries Team
        </h2>
        <p className="text-black leading-relaxed mb-6 max-w-md mx-auto">
          Reach out to our team for inquiries about fisheries research, equipment, or collaboration at CHMSU.
        </p>
        <Card className="flex flex-col lg:flex-row gap-6 shadow-md">
          <CardContent className="p-6 flex-1">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-black mb-4">
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-black text-sm font-medium">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="bg-white border-gray-300 text-sm px-3 py-2 focus:border-[#16a34a] focus:ring-[#16a34a]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-black text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  className="bg-white border-gray-300 text-sm px-3 py-2 focus:border-[#16a34a] focus:ring-[#16a34a]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-black text-sm font-medium">Message</Label>
                <Input
                  id="message"
                  type="text"
                  placeholder="Your message"
                  className="bg-white border-gray-300 text-sm px-3 py-2 focus:border-[#16a34a] focus:ring-[#16a34a] h-24 resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#16a34a] text-white hover:bg-green-700 font-semibold py-2 rounded-md transition-colors duration-200"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
          <CardContent className="p-6 flex-1 bg-gray-50">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-black mb-4">
                Contact Details
              </CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <p className="text-black text-sm">
                <strong>Email:</strong> fisheries@chmsu.edu
              </p>
              <p className="text-black text-sm">
                <strong>Phone:</strong> +63 123 456 7890
              </p>
              <p className="text-black text-sm">
                <strong>Address:</strong> CHMSU Binalbagan Campus, Negros Occidental, Philippines
              </p>
              <p className="text-black text-sm">
                <strong>Hours:</strong> Mon-Fri, 8:00 AM - 5:00 PM (PST)
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}