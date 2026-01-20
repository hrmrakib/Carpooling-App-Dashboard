"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

interface Subscription {
  id: string;
  name: string;
  price: string;
  billingPeriod: string;
  features: string[];
}

export default function EditSubscription() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [billingPeriod, setBillingPeriod] = useState("/month");
  const [features, setFeatures] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("subscriptions");
    if (stored) {
      const subscriptions: Subscription[] = JSON.parse(stored);
      const subscription = subscriptions.find((s) => s.id === id);

      if (subscription) {
        setName(subscription.name);
        setPrice(subscription.price);
        setBillingPeriod(subscription.billingPeriod || "/month");
        setFeatures(subscription.features);
      } else {
        setNotFound(true);
      }
    }
    setIsLoading(false);
  }, [id]);

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

    const stored = localStorage.getItem("subscriptions");
    if (!stored) return;

    const subscriptions: Subscription[] = JSON.parse(stored);
    const index = subscriptions.findIndex((s) => s.id === id);

    if (index !== -1) {
      subscriptions[index] = {
        id,
        name,
        price,
        billingPeriod: price === "Free" ? "" : billingPeriod,
        features: features.filter((f) => f.trim()),
      };

      localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
      router.push("/");
    }
  };

  if (isLoading) {
    return (
      <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
        <p className='text-gray-600'>Loading...</p>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>
            Subscription Not Found
          </h1>
          <p className='text-gray-600 mb-6'>
            The subscription you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href='/'>
            <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
              Back to Subscriptions
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to Subscriptions
        </Link>

        <div className='bg-white rounded-lg shadow-lg p-6 sm:p-8'>
          <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>
            Edit Subscription
          </h1>
          <p className='text-gray-600 mb-8'>
            Update the subscription plan details and features
          </p>

          <form onSubmit={handleSubmit} className='space-y-8'>
            {/* Basic Info Section */}
            <div className='space-y-6'>
              <h2 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
                <div className='w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold'>
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
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100'
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
                <div className='w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold'>
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
                      className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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
                  className='mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors'
                >
                  <Plus className='w-4 h-4' />
                  Add Feature
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className='flex gap-3 justify-start border-t border-gray-200 pt-8 ml-10'>
              <Link href='/'>
                <Button
                  variant='outline'
                  className='border-gray-300 bg-transparent'
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type='submit'
                className='bg-blue-600 hover:bg-blue-700 text-white'
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
