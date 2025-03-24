import type React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
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
import { ISignUpForm } from "@/utils/interfaces";

export default function SignupForm({
  errors,
  handleSubmit,
  formData,
  handleChange,
  handleCheckboxChange,
  isLoading,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  passwordStrength,
  getStrengthColor,
  getStrengthText,
}: ISignUpForm) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Join thousands of users and start your journey
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden border-violet-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 pb-6 pt-8 text-white">
              <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
              <CardDescription className="text-center text-violet-100">
                Create a new account to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {errors.general && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">
                  {errors.general}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className={cn(
                      "border-violet-200 focus-visible:ring-violet-500",
                      errors.name && "border-red-300 focus-visible:ring-red-500"
                    )}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                      "border-violet-200 focus-visible:ring-violet-500",
                      errors.email &&
                        "border-red-300 focus-visible:ring-red-500"
                    )}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
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
                      value={formData.password}
                      onChange={handleChange}
                      className={cn(
                        "border-violet-200 pr-10 focus-visible:ring-violet-500",
                        errors.password &&
                          "border-red-300 focus-visible:ring-red-500"
                      )}
                      aria-invalid={errors.password ? "true" : "false"}
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
                  {errors.password ? (
                    <p className="text-xs text-red-500">{errors.password}</p>
                  ) : (
                    formData.password && (
                      <div className="mt-2 space-y-1">
                        <div className="flex h-1 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className={cn(
                              "transition-all duration-300",
                              getStrengthColor()
                            )}
                            style={{
                              width: `${(passwordStrength / 5) * 100}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-gray-600">
                          Password strength:{" "}
                          <span className="font-medium">
                            {getStrengthText()}
                          </span>
                        </p>
                      </div>
                    )
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={cn(
                        "border-violet-200 pr-10 focus-visible:ring-violet-500",
                        errors.confirmPassword &&
                          "border-red-300 focus-visible:ring-red-500"
                      )}
                      aria-invalid={errors.confirmPassword ? "true" : "false"}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-violet-600"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                  {formData.confirmPassword &&
                    formData.password === formData.confirmPassword &&
                    !errors.confirmPassword && (
                      <p className="flex items-center text-xs text-green-600">
                        <CheckCircle2 className="mr-1 h-3 w-3" /> Passwords
                        match
                      </p>
                    )}
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.acceptTerms}
                      onCheckedChange={handleCheckboxChange}
                      className="mt-1 border-violet-300 data-[state=checked]:bg-violet-600 data-[state=checked]:text-white"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="terms"
                        className="text-sm font-medium text-gray-700"
                      >
                        I accept the{" "}
                        <Link
                          href="/terms"
                          className="font-medium text-violet-600 hover:text-violet-800 hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="font-medium text-violet-600 hover:text-violet-800 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                  </div>
                  {errors.acceptTerms && (
                    <p className="text-xs text-red-500">{errors.acceptTerms}</p>
                  )}
                </div>

                {/* Submit Button */}
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
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t bg-gray-50 p-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-violet-600 hover:text-violet-800"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
