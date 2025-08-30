"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModalStore, useAuthStore } from "@/lib/stores";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

// Mock users array for simulation
const mockUsers = [
  { email: "user@chmsu.edu", password: "password123", role: "user" },
  { email: "admin@chmsu.edu", password: "admin123", role: "admin" },
];

export default function SignupModal() {
  const { isCreateAccountOpen, setIsCreateAccountOpen, setIsLoginOpen } = useModalStore();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [step, setStep] = useState("email");
  const router = useRouter();

  useEffect(() => {
    console.log("Email state:", email);
    if (step === "details") {
      setPassword("");
      setName("");
    }
  }, [email, step]);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCheckingEmail(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      console.log("Submitting email:", normalizedEmail);

      // Simulate email validation
      if (!normalizedEmail.includes("@") || !normalizedEmail.endsWith(".edu")) {
        throw new Error("Please enter a valid .edu email address.");
      }

      const emailExists = mockUsers.some((user) => user.email === normalizedEmail);
      if (emailExists) {
        throw new Error("Email already registered. Please sign in.");
      }

      setStep("details");
    } catch (error) {
      console.error("Email check failed:", error);
      toast.error(error instanceof Error ? error.message : "Invalid email.", {
        className:
          "bg-red-50 text-red-700 border border-red-200 rounded-md shadow-sm py-2 px-4 text-sm font-medium",
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const handleDetailsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const normalizedEmail = email.trim().toLowerCase();
      console.log("Submitting signup:", { email: normalizedEmail, password: "[hidden]", name });

      // Simulate signup validation
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
      }
      if (!name.trim()) {
        throw new Error("Please enter your full name.");
      }

      // Mock user creation
      const newUser = { email: normalizedEmail, password, role: "user" };
      mockUsers.push(newUser);
      await setUser(newUser);
      toast.success(`Account created for ${normalizedEmail}!`, {
        className:
          "bg-green-100 text-green-800 border border-green-600 rounded-md shadow-sm py-2 px-4 text-sm font-medium",
        duration: 4000,
        position: "top-right",
      });
      setIsCreateAccountOpen(false);
      router.replace("/user/userdashboard");
      router.refresh();
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error(error instanceof Error ? error.message : "Signup failed.", {
        className:
          "bg-red-50 text-red-700 border border-red-200 rounded-md shadow-sm py-2 px-4 text-sm font-medium",
        duration: 4000,
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Toaster />
      <AnimatePresence>
        {isCreateAccountOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.button
                className="absolute top-4 right-4 text-black hover:text-gray-600"
                onClick={() => {
                  setIsCreateAccountOpen(false);
                  console.log("SignupModal closed");
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
              <div className="text-center mb-6">
                <h1 className="text-xl font-bold text-black mb-2">CHMSU Fisheries System</h1>
                <h1 className="text-2xl font-bold text-black">Register for your Account</h1>
                <p className="text-sm text-black mt-1">
                  {step === "email"
                    ? "Enter your email to register for fisheries access."
                    : "Provide your details to complete registration."}
                </p>
              </div>
              {step === "email" ? (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-black text-sm font-medium mb-1">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="bg-white border-gray-300 text-sm px-3 py-2 focus:border-[#16a34a] focus:ring-[#16a34a]"
                      value={email}
                      onChange={(e) => {
                        const value = e.target.value ?? "";
                        setEmail(value);
                        console.log("Email input:", value);
                      }}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#16a34a] text-white hover:bg-green-700 font-semibold py-2 rounded-md transition-colors duration-200"
                    disabled={isCheckingEmail}
                  >
                    {isCheckingEmail ? "Checking..." : "Continue"}
                  </Button>
                  <div className="text-center mt-3">
                    <p className="text-sm text-black">
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="text-[#16a34a] font-medium hover:underline"
                        onClick={() => {
                          setIsCreateAccountOpen(false);
                          setIsLoginOpen(true);
                        }}
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleDetailsSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-black text-sm font-medium mb-1">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="bg-white border-gray-300 text-sm px-3 py-2 focus:border-[#16a34a] focus:ring-[#16a34a]"
                      value={name}
                      onChange={(e) => {
                        const value = e.target.value ?? "";
                        setName(value);
                        console.log("Name input:", value);
                      }}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Label htmlFor="password" className="text-black text-sm font-medium mb-1">Password</Label>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="bg-white border-gray-300 text-sm px-3 py-2 pr-10 focus:border-[#16a34a] focus:ring-[#16a34a]"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        console.log("Password input: [hidden]");
                      }}
                      required
                      autoComplete="new-password"
                    />
                    <motion.button
                      type="button"
                      className="absolute right-3 top-9 text-black hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      <AnimatePresence mode="wait">
                        {showPassword ? (
                          <motion.div
                            key="eye-off"
                            initial={{ opacity: 0, rotate: -45 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 45 }}
                            transition={{ duration: 0.2 }}
                          >
                            <EyeOff className="h-5 w-5" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="eye"
                            initial={{ opacity: 0, rotate: -45 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 45 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Eye className="h-5 w-5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full text-sm py-2 mt-3 border-gray-300 text-black hover:bg-gray-100"
                    onClick={() => {
                      setStep("email");
                      setPassword("");
                      setName("");
                      console.log("Back to email step");
                    }}
                  >
                    Back to Email
                  </Button>
                  <Button
                    type="submit"
                    className="w-full bg-[#16a34a] text-white hover:bg-green-700 font-semibold py-2 rounded-md transition-colors duration-200"
                  >
                    Register
                  </Button>
                  <div className="text-center mt-3">
                    <p className="text-sm text-black">
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="text-[#16a34a] font-medium hover:underline"
                        onClick={() => {
                          setIsCreateAccountOpen(false);
                          setIsLoginOpen(true);
                        }}
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}