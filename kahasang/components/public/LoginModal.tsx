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

// Mock user data for simulation
const mockUsers = [
  { email: "user@chmsu.edu", password: "password123", role: "user" },
  { email: "admin@chmsu.edu", password: "admin123", role: "admin" },
];

export default function LoginModal() {
  const { isLoginOpen, setIsLoginOpen, setIsCreateAccountOpen } = useModalStore();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [step, setStep] = useState("email");
  const router = useRouter();

  useEffect(() => {
    console.log("Email state:", email);
    if (step === "password") {
      setPassword("");
    }
  }, [email, step]);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCheckingEmail(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      console.log("Submitting email:", normalizedEmail);

      // Simulate email validation (check if email exists in mock data)
      if (!normalizedEmail.includes("@") || !normalizedEmail.endsWith(".edu")) {
        throw new Error("Please enter a valid .edu email address.");
      }

      const userExists = mockUsers.some((user) => user.email === normalizedEmail);
      if (!userExists) {
        throw new Error("Email not registered. Please sign up.");
      }

      setStep("password");
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

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const normalizedEmail = email.trim().toLowerCase();
      console.log("Submitting login:", { email: normalizedEmail, password: "[hidden]" });

      // Simulate password validation
      const user = mockUsers.find(
        (u) => u.email === normalizedEmail && u.password === password
      );
      if (!user) {
        throw new Error("Invalid email or password.");
      }

      // Mock user login
      await setUser({ email: normalizedEmail, role: user.role });
      toast.success(`Welcome back, ${normalizedEmail}!`, {
        className:
          "bg-green-100 text-green-800 border border-green-600 rounded-md shadow-sm py-2 px-4 text-sm font-medium",
        duration: 4000,
        position: "top-right",
      });
      setIsLoginOpen(false);
      const redirectPath = user.role === "admin" ? "/admin/admindashboard" : "/user/userdashboard";
      console.log(`Attempting redirect to ${redirectPath}`);
      router.replace(redirectPath);
      router.refresh();
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error instanceof Error ? error.message : "Login failed.", {
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
        {isLoginOpen && (
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
                  setIsLoginOpen(false);
                  console.log("LoginModal closed");
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
              <div className="text-center mb-6">
                <h1 className="text-xl font-bold text-black mb-2">CHMSU Fisheries System</h1>
                <h1 className="text-2xl font-bold text-black">Sign In to your Account</h1>
                <p className="text-sm text-black mt-1">
                  {step === "email"
                    ? "Enter your email to access fisheries equipment."
                    : "Enter your password to sign in."}
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
                      Don’t have an account?{" "}
                      <button
                        type="button"
                        className="text-[#16a34a] font-medium hover:underline"
                        onClick={() => {
                          setIsLoginOpen(false);
                          setIsCreateAccountOpen(true);
                        }}
                      >
                        Sign Up
                      </button>
                    </p>
                  </div>
                </form>
              ) : (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="relative">
                    <Label htmlFor="password" className="text-black text-sm font-medium mb-1">Password</Label>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
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
                      console.log("Back to email step");
                    }}
                  >
                    Back to Email
                  </Button>
                  <Button
                    type="submit"
                    className="w-full bg-[#16a34a] text-white hover:bg-green-700 font-semibold py-2 rounded-md transition-colors duration-200"
                  >
                    Sign In
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full text-sm py-2 mt-3 border-gray-300 text-black hover:bg-gray-100"
                  >
                    Sign in with Google
                  </Button>
                  <div className="text-center mt-3">
                    <p className="text-sm text-black">
                      Don’t have an account?{" "}
                      <button
                        type="button"
                        className="text-[#16a34a] font-medium hover:underline"
                        onClick={() => {
                          setIsLoginOpen(false);
                          setIsCreateAccountOpen(true);
                        }}
                      >
                        Sign Up
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