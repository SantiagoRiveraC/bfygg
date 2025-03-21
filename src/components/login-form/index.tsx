"use client";
import type React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Github, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ILoginForm } from "@/utils/interfaces";

export default function LoginForm({
  handleSubmit,
  isLoading,
  showPassword,
  setShowPassword,
  formData,
  handleChange,
  handleCheckboxChange,
}: ILoginForm) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden border-violet-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 pb-6 pt-8 text-white">
              <CardTitle className="text-center text-2xl">Sign In</CardTitle>
              <CardDescription className="text-center text-violet-100">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="border-violet-200 focus-visible:ring-violet-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="border-violet-200 pr-10 focus-visible:ring-violet-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-violet-600"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={handleCheckboxChange}
                      className="border-violet-300 data-[state=checked]:bg-violet-600 data-[state=checked]:text-white"
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm font-medium text-gray-700"
                    >
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-violet-600 hover:text-violet-800"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "mt-2 w-full bg-violet-600 text-white hover:bg-violet-700",
                    "transition-all duration-200 ease-in-out",
                    "focus:ring-violet-500"
                  )}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative bg-white px-4 text-sm text-gray-500">
                  Or continue with
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-violet-200 hover:bg-violet-50 hover:text-violet-700"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center border-t bg-gray-50 p-4">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-violet-600 hover:text-violet-800"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
