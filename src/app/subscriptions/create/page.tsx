"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

export default function CreateSubscription() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [billingPeriod, setBillingPeriod] = useState("/month");
  const [features, setFeatures] = useState<string[]>([""]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Subscription name is required";
    }

    if (!price.trim()) {
      newErrors.price = "Price is required";
    }

    const nonEmptyFeatures = features.filter((f) => f.trim());
    if (nonEmptyFeatures.length === 0) {
      newErrors.features = "At least one feature is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newSubscription = {
      id: Date.now().toString(),
      name,
      price,
      billingPeriod: price === "Free" ? "" : billingPeriod,
      features: features.filter((f) => f.trim()),
    };

    const stored = localStorage.getItem("subscriptions");
    const subscriptions = stored ? JSON.parse(stored) : [];

    subscriptions.push(newSubscription);
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));

    router.push("/");
  };

  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <button
          onClick={() => router.back()}
          className='inline-flex items-center gap-2 text-[#0743A2] hover:text-blue-700 mb-8'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to Subscriptions
        </button>

        <div className='bg-white rounded-lg shadow-lg p-6 sm:p-8'>
          <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>
            Create New Subscription
          </h1>
          <p className='text-gray-600 mb-8'>
            Add a new subscription plan with custom features
          </p>

          <form onSubmit={handleSubmit} className='space-y-8'>
            {/* Basic Info Section */}
            <div className='space-y-6'>
              <h2 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
                <div className='w-8 h-8 rounded-full bg-[#0743A2] text-white flex items-center justify-center text-sm font-bold'>
                  1
                </div>
                Basic Information
              </h2>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 ml-10'>
                <div className='sm:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Subscription Name *
                  </label>
                  <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='e.g., Premium Plan'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder:text-gray-500'
                  />
                  {errors.name && (
                    <p className='text-red-600 text-sm mt-1'>{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Price *
                  </label>
                  <input
                    type='text'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder='e.g., $49 or Free'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder:text-gray-500'
                  />
                  {errors.price && (
                    <p className='text-red-600 text-sm mt-1'>{errors.price}</p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Billing Period
                  </label>
                  <select
                    value={billingPeriod}
                    onChange={(e) => setBillingPeriod(e.target.value)}
                    disabled={price === "Free"}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 text-black placeholder:text-gray-500'
                  >
                    <option value='/month'>/month</option>
                    <option value='/year'>/year</option>
                    <option value='/week'>/week</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className='space-y-6'>
              <h2 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
                <div className='w-8 h-8 rounded-full bg-[#0743A2] text-white flex items-center justify-center text-sm font-bold'>
                  2
                </div>
                Features
              </h2>

              <div className='space-y-3 ml-10'>
                {features.map((feature, index) => (
                  <div key={index} className='flex gap-2'>
                    <input
                      type='text'
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                      placeholder={`Feature ${index + 1}`}
                      className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder:text-gray-500'
                    />
                    {features.length > 1 && (
                      <button
                        type='button'
                        onClick={() => handleRemoveFeature(index)}
                        className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                      >
                        <Trash2 className='w-4 h-4' />
                      </button>
                    )}
                  </div>
                ))}

                {errors.features && (
                  <p className='text-red-600 text-sm mt-1'>{errors.features}</p>
                )}

                <button
                  type='button'
                  onClick={handleAddFeature}
                  className='mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#0743A2] border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors'
                >
                  <Plus className='w-4 h-4' />
                  Add Feature
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className='flex gap-3 justify-start border-t border-gray-200 pt-8 ml-10'>
              <Link
                href='/'
                className='border border-[#0743A2] text-[#0743A2] rounded-xl cursor-pointer'
              >
                <Button
                  variant='outline'
                  className='border-gray-300 bg-transparent rounded-xl'
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type='submit'
                className='bg-[#0743A2] hover:bg-[#043686] text-white cursor-pointer rounded-xl'
              >
                Create Subscription
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
