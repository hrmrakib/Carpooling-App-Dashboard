"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/auth/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("access_token", data.access_token);
        router.push("/");
      }
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-orange-50 flex items-center justify-center'>
      <div className='bg-[#F3F7FF] h-screen flex-1 flex items-center justify-center'>
        <div>
          <Image
            src='/auth-img.png'
            alt='Logo'
            width={600}
            height={600}
            className='mx-auto'
          />
        </div>
      </div>
      <div className='bg-[#E6ECF6] h-screen flex-1 flex items-center justify-center'>
        <Card className='w-full max-w-md bg-white shadow-lg border-0'>
          <CardContent className='pb-8'>
            {/* Header */}
            <div className='text-center mb-8'>
              <h1 className='flex items-center justify-center gap-2 text-3xl font-bold text-gray-900 mb-2'>
                <button onClick={() => router.back()}>
                  <ArrowLeft className='h-5 w-5 mt-1' />
                </button>{" "}
                <span> Sign in</span>
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Email Address */}
              <div className='space-y-2'>
                <Label
                  htmlFor='email'
                  className='text-[#031C44] text-base font-medium'
                >
                  Email Address
                </Label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 h-11 bg-[#F3F7FF] border-gray-200 focus:bg-white rounded-4xl ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className='text-red-500 text-sm'>{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className='space-y-2'>
                <Label
                  htmlFor='password'
                  className='text-[#031C44] text-base font-medium'
                >
                  Password
                </Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                  <Input
                    id='password'
                    name='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Min 8 character'
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 h-11 pr-10 bg-[#F3F7FF] border-gray-200 focus:bg-white rounded-4xl ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className='text-red-500 text-sm'>{errors.password}</p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className='text-right'>
                <Link
                  href='/forgot-password'
                  className='text-[#6B7280] text-sm hover:text-[#6B7280] transition-colors'
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <Button
                type='submit'
                disabled={isLoading}
                className='w-full h-11! button rounded-4xl text-lg! font-normal!'
              >
                {isLoading ? "Signing In..." : "Sign in"}
              </Button>

              {/* Sign Up Link */}
              <div className='text-center'>
                <span className='text-gray-600 text-sm'>
                  Don&apos;t have an account?{" "}
                  <Link
                    href='/auth/signup'
                    className='text-[#031C44] hover:text-[#021533] font-medium transition-colors'
                  >
                    Sign up
                  </Link>
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
