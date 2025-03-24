import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Star,
  Award,
  Gift,
  CreditCard,
  Users,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-screen flex items-center overflow-hidden  bg-gradient-to-br from-violet-600 to-purple-700 py-20 text-white md:py-32"
      >
        <div className="absolute inset-0 z-0 opacity-20">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              New Rewards Program
            </Badge>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Earn Rewards{" "}
              <span className="text-violet-200">Before You Gogo</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-violet-100 sm:text-xl">
              Join our premium membership program and earn points with every
              purchase. Redeem for exclusive rewards, discounts, and unique
              experiences.
            </p>
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button
                size="lg"
                className="bg-white text-violet-700 hover:bg-violet-100"
              >
                Join Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-violet-700 hover:bg-white/20"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Benefits Section */}
      <section id="features" className="py-20 md:h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-400 sm:text-4xl">
              Why Choose Before You Gogo?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We offer more than just products. Join our community and enjoy
              these exclusive benefits.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <CreditCard className="h-8 w-8 text-violet-600" />,
                title: "Exclusive Discounts",
                description:
                  "Members receive special pricing and early access to sales.",
              },
              {
                icon: <Star className="h-8 w-8 text-violet-600" />,
                title: "Earn Points Fast",
                description:
                  "Earn 2x points on every purchase with our premium membership.",
              },
              {
                icon: <Gift className="h-8 w-8 text-violet-600" />,
                title: "Amazing Rewards",
                description:
                  "Redeem points for products, experiences, and more.",
              },
              {
                icon: <Shield className="h-8 w-8 text-violet-600" />,
                title: "Member Protection",
                description:
                  "Extended warranties and satisfaction guarantees for members.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 rounded-full bg-violet-100 p-3">
                  {benefit.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-400">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section
        id="pricing"
        className="bg-gray-50 py-20 md:h-screen flex items-center"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-400 sm:text-4xl">
              Choose Your Membership Plan
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Select the perfect membership tier that fits your lifestyle and
              budget.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Basic",
                price: "$9.99",
                period: "monthly",
                description: "Perfect for occasional shoppers",
                features: [
                  "1x points on purchases",
                  "Basic rewards catalog",
                  "Monthly newsletter",
                  "Standard customer support",
                ],
                cta: "Get Started",
                popular: false,
              },
              {
                name: "Premium",
                price: "$19.99",
                period: "monthly",
                description: "Our most popular plan",
                features: [
                  "2x points on purchases",
                  "Full rewards catalog",
                  "Exclusive member events",
                  "Priority customer support",
                  "Free shipping on all orders",
                ],
                cta: "Join Premium",
                popular: true,
              },
              {
                name: "Elite",
                price: "$39.99",
                period: "monthly",
                description: "For the dedicated enthusiast",
                features: [
                  "3x points on purchases",
                  "VIP rewards catalog",
                  "Concierge service",
                  "24/7 dedicated support",
                  "Free expedited shipping",
                  "Early access to new products",
                ],
                cta: "Go Elite",
                popular: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden ${
                  plan.popular
                    ? "border-violet-500 shadow-lg"
                    : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute right-0 top-0">
                    <div className="h-16 w-16 overflow-hidden">
                      <div className="absolute left-0 top-0 h-2 w-2 bg-violet-600"></div>
                      <div className="absolute bottom-0 right-0 h-2 w-2 bg-violet-600"></div>
                      <div className="absolute right-0 top-0 h-16 w-16 origin-bottom-left rotate-45 transform bg-violet-600"></div>
                      <span className="absolute right-0 top-[6px] w-16 -rotate-45 transform text-center text-xs font-semibold text-white">
                        Popular
                      </span>
                    </div>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-500">/{plan.period}</span>
                  </div>
                  <ul className="mb-6 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="mr-2 h-5 w-5 text-violet-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-violet-600 text-white hover:bg-violet-700"
                        : "bg-white text-violet-600 hover:bg-violet-50"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Loyalty Program */}
      <section id="loyalty" className="py-20 md:h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <Badge className="mb-4 bg-violet-100 text-violet-800 hover:bg-violet-200">
                  Loyalty Program
                </Badge>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-400 sm:text-4xl">
                  Earn Points, Unlock Rewards
                </h2>
                <p className="mb-6 text-lg text-gray-600">
                  Our loyalty program rewards you for every purchase. The more
                  you shop, the more you earn. Redeem your points for exclusive
                  products, experiences, and discounts.
                </p>

                <div className="mb-8 space-y-4">
                  {[
                    {
                      title: "Earn Points",
                      description:
                        "Get points with every purchase based on your membership tier.",
                    },
                    {
                      title: "Track Progress",
                      description:
                        "Monitor your points balance and redemption history in your dashboard.",
                    },
                    {
                      title: "Redeem Rewards",
                      description:
                        "Exchange points for products, gift cards, or exclusive experiences.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                        {index === 0 ? (
                          <CreditCard className="h-6 w-6" />
                        ) : index === 1 ? (
                          <Users className="h-6 w-6" />
                        ) : (
                          <Award className="h-6 w-6" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-400">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="bg-violet-600 text-white hover:bg-violet-700">
                  Join the Rewards Program
                </Button>
              </div>

              <div className="relative">
                <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-violet-100 opacity-70 blur-3xl"></div>
                <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-400">
                        Rewards Dashboard
                      </h3>
                      <p className="text-sm text-gray-600">Premium Member</p>
                    </div>
                    <div className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-800">
                      2,450 Points
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Progress to next tier</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full w-[65%] bg-violet-600"></div>
                    </div>
                  </div>

                  <div className="mb-6 space-y-4">
                    <h4 className="font-medium text-gray-400">
                      Available Rewards
                    </h4>
                    {[
                      {
                        name: "Free Product",
                        points: "1,500 points",
                        available: true,
                      },
                      {
                        name: "25% Off Coupon",
                        points: "1,000 points",
                        available: true,
                      },
                      {
                        name: "VIP Experience",
                        points: "5,000 points",
                        available: false,
                      },
                    ].map((reward, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                      >
                        <div className="flex items-center">
                          <Gift className="mr-3 h-5 w-5 text-violet-600" />
                          <span>{reward.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2 text-sm text-gray-600">
                            {reward.points}
                          </span>
                          <Button
                            size="sm"
                            variant={reward.available ? "default" : "outline"}
                            className={
                              reward.available
                                ? "bg-violet-600 hover:bg-violet-700"
                                : "text-gray-400"
                            }
                            disabled={!reward.available}
                          >
                            Redeem
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <Link
                      href="/rewards"
                      className="text-sm font-medium text-violet-600 hover:text-violet-800"
                    >
                      View all rewards →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="about"
        className="bg-gray-50 py-20 md:h-screen flex items-center"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-400 sm:text-4xl">
              What Our Members Say
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Don`t just take our word for it. Here`s what our members have to
              say about their experience.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  "The rewards program is amazing! I've already redeemed points for two free products and a discount on my last purchase.",
                author: "Sarah Johnson",
                role: "Premium Member",
                avatar: "/placeholder.svg?height=80&width=80",
              },
              {
                quote:
                  "I love how quickly I earn points with my Elite membership. The exclusive events are worth the membership fee alone.",
                author: "Michael Chen",
                role: "Elite Member",
                avatar: "/placeholder.svg?height=80&width=80",
              },
              {
                quote:
                  "The customer service is outstanding. They helped me use my points for a special gift for my wife's birthday.",
                author: "David Rodriguez",
                role: "Premium Member",
                avatar: "/placeholder.svg?height=80&width=80",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg bg-white p-6 shadow-md"
              >
                <div className="mb-4 flex-1">
                  <div className="mb-4 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5 fill-current text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{testimonial.quote}</p>
                </div>
                <div className="flex items-center">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="mr-4 rounded-full"
                  />
                  <div>
                    <h4 className="font-medium text-gray-400">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="contact" className="py-20 md:h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-400 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Have questions? We`ve got answers. If you can`t find what you`re
              looking for, feel free to contact us.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "How do I earn points?",
                  answer:
                    "You earn points with every purchase you make. The number of points depends on your membership tier: Basic members earn 1x points, Premium members earn 2x points, and Elite members earn 3x points on every dollar spent.",
                },
                {
                  question: "How do I redeem my points?",
                  answer:
                    "You can redeem your points through your account dashboard. Simply log in, navigate to the Rewards section, and choose from available rewards. Points will be automatically deducted from your balance.",
                },
                {
                  question: "Do my points expire?",
                  answer:
                    "Points are valid for 12 months from the date they are earned. We'll send you reminders when points are about to expire so you can use them before they're gone.",
                },
                {
                  question: "Can I upgrade or downgrade my membership?",
                  answer:
                    "Yes, you can change your membership tier at any time. Changes will take effect at the start of your next billing cycle. Your points balance will remain intact regardless of membership changes.",
                },
                {
                  question: "Are there any hidden fees?",
                  answer:
                    "No, there are no hidden fees. The membership price you see is what you pay. All benefits and features are included in your membership tier with no additional costs.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="start"
        className="bg-gradient-to-br from-violet-600 to-purple-700 py-20 text-white md:h-screen flex items-center"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Start Earning Rewards?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-violet-100">
              Join thousands of satisfied members who are earning points and
              redeeming amazing rewards every day.
            </p>
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button
                size="lg"
                className="bg-white text-violet-700 hover:bg-violet-100"
              >
                Sign Up Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-violet-700 hover:bg-white/20"
              >
                View Membership Plans
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
