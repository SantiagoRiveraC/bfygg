"use client";

import { Card, CardContent, Typography, Button } from "@mui/material";
import { CheckCircle } from "@phosphor-icons/react";

interface IMembershipPlans {
  name: string;
  price: string;
  color: string;
  features: string[];
}

export default function MembershipPlans({ plans }: { plans: IMembershipPlans[] }) {

  return (
    <div className="container mx-auto py-12 justify-center items-center flex flex-col gap-[2rem]">
      <Typography variant="h4" className="text-center font-bold mb-8 text-gray-900">
        Choose Your Membership
      </Typography>

      <div className="flex flex-col md:flex-row justify-center gap-6">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`w-full md:w-80 shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-105 ${plan.color}`}
          >
            <CardContent className="p-6 text-center">
              {/* Plan Name & Price */}
              <Typography variant="h5" className="font-bold mb-2">
                {plan.name}
              </Typography>
              <Typography variant="h6" className="mb-4">{plan.price}</Typography>

              {/* Features List */}
              <ul className="mb-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center justify-center">
                    <CheckCircle size={20} className="mr-2" /> {feature}
                  </li>
                ))}
              </ul>

              {/* Buy Button */}
              <Button
                variant="contained"
                color="primary"
              >
                Buy Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
