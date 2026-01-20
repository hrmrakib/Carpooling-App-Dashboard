"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Subscription {
  id: string;
  name: string;
  price: string;
  billingPeriod: string;
  features: string[];
}

const DEFAULT_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "1",
    name: "Basic Plan",
    price: "Free",
    billingPeriod: "",
    features: ["Create 1 carpool team", "Includes ads", "Standard features"],
  },
  {
    id: "2",
    name: "Premium Plan",
    price: "$49",
    billingPeriod: "/month",
    features: [
      "Multiple carpool teams",
      "No ads",
      "Live GPS tracking & notifications",
      "AI-optimized routing",
      "Temporary pickup/dropoff locations",
      "Substitute driver approval",
      "Drive history & rewards",
    ],
  },
];

export default function Home() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("subscriptions");
    if (stored) {
      setSubscriptions(JSON.parse(stored));
    } else {
      setSubscriptions(DEFAULT_SUBSCRIPTIONS);
      localStorage.setItem(
        "subscriptions",
        JSON.stringify(DEFAULT_SUBSCRIPTIONS),
      );
    }
    setIsLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this subscription?")) {
      const updated = subscriptions.filter((sub) => sub.id !== id);
      setSubscriptions(updated);
      localStorage.setItem("subscriptions", JSON.stringify(updated));
    }
  };

  if (isLoading) {
    return (
      <main className='min-h-screen bg-background'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex items-center justify-center py-12'>
            <p className='text-muted-foreground'>Loading subscriptions...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-white my-4 rounded-xl'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8'>
          <div>
            <h1 className='text-3xl sm:text-4xl font-bold text-foreground'>
              Subscriptions
            </h1>
            <p className='text-muted-foreground mt-2'>
              Manage your subscription plans
            </p>
          </div>
          <Link href='/subscriptions/create'>
            <Button className='w-full sm:w-auto text-lg bg-[#0743A2] hover:bg-[#043788] text-white cursor-pointer'>
              <span className='mr-2'>+</span> Add New Subscription
            </Button>
          </Link>
        </div>

        {/* Subscription Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className='bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow'
            >
              {/* Header */}
              <div className='p-6 border-b border-gray-200'>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  {subscription.name}
                </h3>
                <div className='flex items-baseline gap-1'>
                  <span className='text-3xl font-bold text-[#0743A2]'>
                    {subscription.price}
                  </span>
                  {subscription.billingPeriod && (
                    <span className='text-sm text-gray-600'>
                      {subscription.billingPeriod}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className='p-6 border-b border-gray-200'>
                <h4 className='text-sm font-semibold text-[#4B5563] mb-4'>
                  Features
                </h4>
                <ul className='space-y-3'>
                  {subscription.features.map((feature, index) => (
                    <li key={index} className='flex items-start gap-3'>
                      <svg
                        className='w-5 h-5 text-[#0743A2] flex-shrink-0 mt-0.5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span className='text-sm text-[#4B5563]'>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className='p-6 flex gap-2'>
                <Link
                  href={`/subscriptions/edit/${subscription.id}`}
                  className='flex-1 border border-[#0743A2] rounded-xs cursor-pointer'
                >
                  <Button
                    variant='outline'
                    className='w-full  text-[#0743A2] hover:bg-blue-50 bg-transparent'
                  >
                    Edit
                  </Button>
                </Link>
                <button
                  onClick={() => handleDelete(subscription.id)}
                  className='flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors cursor-pointer'
                >
                  <Trash2 className='w-4 h-4' />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
