import React from 'react'
import MembershipPlans from './view';

export default function index() {

    const membershipPlans = [
        {
          name: "Basic",
          price: "$9.99/month",
          features: ["Access to standard features", "Email support", "Limited bookings"],
          color: "bg-gray-200 text-gray-900",
        },
        {
          name: "Premium",
          price: "$19.99/month",
          features: ["All Basic features", "Priority support", "Unlimited bookings"],
          color: "bg-blue-600 text-white",
        },
        {
          name: "VIP",
          price: "$49.99/month",
          features: ["All Premium features", "Exclusive deals", "Personalized assistance"],
          color: "bg-yellow-500 text-white",
        },
      ];

  return (
    <MembershipPlans plans={membershipPlans} />
  )
}
