"use client";

import { useEffect, useState } from "react";
import SubscriptionFormModal from "@/components/subscription-form/subscription-form-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import axios from "axios";

// Define the subscription type based on the form schema
export interface ISubscription {
  type: "simple" | "variable" | "bundled";
  name: string;
  description: string;
  price?: number;
  currency?: "USD" | "COP" | "EUR";
  billingCycle?: "Daily" | "Weekly" | "Monthly" | "Yearly";
  benefits?: { text: string }[];
  options?: {
    name: string;
    price: number;
    currency: "USD" | "COP" | "EUR";
    billingCycle: "Daily" | "Weekly" | "Monthly" | "Yearly";
    benefits: { text: string }[];
  }[];
  bundledItems?: { itemId: string }[];
}

export default function SubscriptionSection() {
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);

  const handleDeleteSubscription = (index: number) => {
    const newSubscriptions = [...subscriptions];
    newSubscriptions.splice(index, 1);
    setSubscriptions(newSubscriptions);
  };

  const handleSubscriptionCreated = (subscription: ISubscription) => {
    setSubscriptions([...subscriptions, subscription]);
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  useEffect(() => {
    try {
      axios
        .get("/api/subscription/getall")
        .then((response) => setSubscriptions(response.data.subscription))
        .catch((error) =>
          console.error("Error fetching subscriptions:", error)
        );
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="container py-10 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-black">
          Subscription Management
        </h1>
        {subscriptions.length > 0 && (
          <SubscriptionFormModal
            onSubscriptionCreated={handleSubscriptionCreated}
            buttonLabel="Create New Subscription"
          />
        )}
      </div>

      {subscriptions.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No subscriptions yet
          </h3>
          <p className="text-purple-500 font-semibold mb-6">
            Create your first subscription to get started
          </p>
          <SubscriptionFormModal buttonVariant="outline" />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subscriptions.map((subscription, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge
                      className={`mb-2 ${
                        subscription.type === "simple"
                          ? "bg-purple-600/45"
                          : subscription.type === "variable"
                          ? "bg-purple-600/50"
                          : "bg-purple-600/55"
                      }`}
                    >
                      {subscription.type.charAt(0).toUpperCase() +
                        subscription.type.slice(1)}
                    </Badge>
                    <CardTitle>{subscription.name}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteSubscription(index)}
                    className="h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="line-clamp-2">
                  {subscription.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="max-h-[25rem] overflow-y-auto custom-scroll flex-1">
                {subscription.type === "simple" && (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-purple-500 font-semibold">Price:</span>
                      <span className="font-medium">
                        {formatCurrency(
                          subscription.price || 0,
                          subscription.currency || "USD"
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-purple-500 font-semibold">Billing:</span>
                      <span>{subscription.billingCycle}</span>
                    </div>
                    {subscription.benefits &&
                      subscription.benefits.length > 0 && (
                        <div>
                          <span className="text-sm text-purple-500 font-semibold block mb-1">
                            Benefits:
                          </span>
                          <ul className="text-sm list-disc pl-5 space-y-1">
                            {subscription.benefits.map((benefit, i) => (
                              <li key={i}>{benefit.text}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                )}

                {subscription.type === "variable" && (
                  <div className="space-y-3">
                    <span className="text-sm text-purple-500 font-semibold block mb-1">
                      Options:
                    </span>
                    {subscription.options?.map((option, i) => (
                      <div key={i} className="border rounded p-3">
                        <div className="font-semibold mb-1">{option.name}</div>
                        <div className="text-sm mb-2">
                          {formatCurrency(option.price, option.currency)} /{" "}
                          {option.billingCycle}
                        </div>
                        {option.benefits.length > 0 && (
                          <div>
                            <span className="text-xs text-purple-500 font-semibold">
                              Benefits:
                            </span>
                            <ul className="text-xs list-disc pl-4 mt-1 space-y-1">
                              {option.benefits.map((benefit, j) => (
                                <li key={j}>{benefit.text}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {subscription.type === "bundled" && (
                  <div className="space-y-3">
                    <span className="text-sm text-purple-500 font-semibold block mb-1">
                      Bundled Items:
                    </span>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      {subscription.bundledItems?.map((item, i) => (
                        <li key={i}>{item.itemId}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-3 text-xs text-purple-500 font-semibold">
                Created on {new Date().toLocaleDateString()}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
