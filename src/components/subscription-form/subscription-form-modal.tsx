"use client";

import { useState } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlusCircle, Trash2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast, { Toaster } from "react-hot-toast";

// Define the schema for each subscription type (mantenido igual...)
const baseSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
});

const benefitSchema = z.object({
  text: z.string().min(3, { message: "Benefit must be at least 3 characters" }),
});

const simpleSchema = baseSchema.extend({
  type: z.literal("simple"),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number" }),
  currency: z.enum(["USD", "COP", "EUR"]),
  billingCycle: z.enum(["Daily", "Weekly", "Monthly", "Yearly"]),
  benefits: z.array(benefitSchema),
});

const variableOptionSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Option name must be at least 3 characters" }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number" }),
  currency: z.enum(["USD", "COP", "EUR"]),
  billingCycle: z.enum(["Daily", "Weekly", "Monthly", "Yearly"]),
  benefits: z.array(benefitSchema),
});

const variableSchema = baseSchema.extend({
  type: z.literal("variable"),
  options: z
    .array(variableOptionSchema)
    .min(1, { message: "At least one option is required" }),
});

const bundledSchema = baseSchema.extend({
  type: z.literal("bundled"),
  bundledItems: z
    .array(
      z.object({
        itemId: z.string().min(1, { message: "Item ID is required" }),
      })
    )
    .min(1, { message: "At least one bundled item is required" }),
});

// Combine all schemas with discriminated union
const formSchema = z.discriminatedUnion("type", [
  simpleSchema,
  variableSchema,
  bundledSchema,
]);

export type FormValues = z.infer<typeof formSchema>;

interface SubscriptionFormModalProps {
  onSubscriptionCreated?: (subscription: FormValues) => void;
  buttonLabel?: string;
  buttonVariant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
}

export default function SubscriptionFormModal({
  onSubscriptionCreated,
  buttonLabel = "Create Subscription",
  buttonVariant = "default",
}: SubscriptionFormModalProps) {
  const [open, setOpen] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState<
    "simple" | "variable" | "bundled" | null
  >(null);

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
  });

  // Get methods from react-hook-form
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: {},
  } = form;

  // Field arrays for dynamic fields
  const simpleBenefits = useFieldArray({
    control,
    name: "benefits",
  });

  const variableOptions = useFieldArray({
    control,
    name: "options",
  });

  const bundledItems = useFieldArray({
    control,
    name: "bundledItems",
  });

  // Establecemos todos los field arrays para los beneficios de opciones variables desde el inicio
  // Creamos field arrays para un máximo razonable de opciones (por ejemplo, 10)
  const maxOptionsCount = 10;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const variableBenefitsArrays: any = [];

  for (let i = 0; i < maxOptionsCount; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    variableBenefitsArrays[i] = useFieldArray({
      control,
      name: `options.${i}.benefits`,
    });
  }

  // Handle subscription type change
  const handleTypeChange = (value: "simple" | "variable" | "bundled") => {
    setSubscriptionType(value);

    // Reset form with new type
    if (value === "simple") {
      setValue("type", "simple");
      setValue("benefits", [{ text: "" }]);
      setValue("price", 0);
      setValue("currency", "USD");
      setValue("billingCycle", "Monthly");
    } else if (value === "variable") {
      setValue("type", "variable");
      setValue("options", [
        {
          name: "",
          price: 0,
          currency: "USD",
          billingCycle: "Monthly",
          benefits: [{ text: "" }],
        },
      ]);
    } else if (value === "bundled") {
      setValue("type", "bundled");
      setValue("bundledItems", [{ itemId: "" }]);
    }
  };

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    const promise = axios.post("/api/subscription/create", data)
    toast.promise(
        promise,
        {
            loading: "Creating subscription...",
            success: (res: AxiosResponse) => {    
                if (onSubscriptionCreated) {
                    onSubscriptionCreated(data);
                  }
            
                  setOpen(false);
                  resetForm();
                return <>{res.data.message}</>;
            }
            ,
            error: (error: AxiosError<{message?: string}>) => {     
                console.error(error);
                return <>{error?.response?.data.message}</>;
            }
        }
    )
  };
  
  // Reset the form when the modal is closed
  const resetForm = () => {
    reset();
    setSubscriptionType(null);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button variant={buttonVariant} className="bg-purple-600">
          <Plus className="mr-2 h-4 w-4" />
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create Subscription</DialogTitle>
          <DialogDescription className="font-semibold text-2xl text-center text-purple-600">
            Create a new subscription for your customers.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-180px)] pr-4">
          <div className="py-4">
            <FormProvider {...form}>
              <form
                id="subscription-form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Subscription Type Selection */}
                <div className="space-y-2">
                  <FormLabel className="text-primary">Subscription Type</FormLabel>
                  <Select
                    value={subscriptionType || undefined}
                    onValueChange={(value) =>
                      handleTypeChange(
                        value as "simple" | "variable" | "bundled"
                      )
                    }
                  >
                    <SelectTrigger className="text-muted-foreground">
                      <SelectValue placeholder="Select subscription type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Simple</SelectItem>
                      <SelectItem value="variable">Variable</SelectItem>
                      <SelectItem value="bundled">Bundled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the type of subscription you want to create.
                  </FormDescription>
                </div>

                {subscriptionType && (
                  <div className="space-y-6">
                    {/* Common Fields */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary">Name</FormLabel>
                            <FormControl>
                              <Input
                                className="text-muted-foreground"
                                placeholder="Premium Subscription"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="md:col-span-2">
                        <FormField
                          control={control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary">Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describe the subscription and its benefits"
                                  className="min-h-[100px] text-muted-foreground"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Simple Subscription Fields */}
                    {subscriptionType === "simple" && (
                      <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-3">
                          <FormField
                            control={control}
                            name="price"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-primary">Price</FormLabel>
                                <FormControl>
                                  <Input
                                    className="text-muted-foreground"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={control}
                            name="currency"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-primary">Currency</FormLabel>
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <FormControl>
                                    <SelectTrigger className="text-muted-foreground">
                                      <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="USD">USD</SelectItem>
                                    <SelectItem value="COP">COP</SelectItem>
                                    <SelectItem value="EUR">EUR</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={control}
                            name="billingCycle"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-primary">Billing Cycle</FormLabel>
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <FormControl>
                                    <SelectTrigger className="text-muted-foreground">
                                      <SelectValue placeholder="Select billing cycle" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Daily">Daily</SelectItem>
                                    <SelectItem value="Weekly">
                                      Weekly
                                    </SelectItem>
                                    <SelectItem value="Monthly">
                                      Monthly
                                    </SelectItem>
                                    <SelectItem value="Yearly">
                                      Yearly
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div>
                          <FormLabel className="text-primary">Benefits</FormLabel>
                          <FormDescription className="mb-3">
                            Add the benefits included in this subscription.
                          </FormDescription>

                          <div className="space-y-3">
                            {simpleBenefits.fields.map((field, index) => (
                              <div
                                key={field.id}
                                className="flex items-center gap-2"
                              >
                                <FormField
                                  control={control}
                                  name={`benefits.${index}.text`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input
                                            className="text-muted-foreground"
                                          placeholder="e.g., Unlimited access"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => simpleBenefits.remove(index)}
                                  disabled={simpleBenefits.fields.length <= 1}
                                >
                                  <Trash2 className="h-4 w-4 text-primary" />
                                </Button>
                              </div>
                            ))}
                          </div>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-3 bg-purple-600"
                            onClick={() => simpleBenefits.append({ text: "" })}
                          >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Benefit
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Variable Subscription Fields */}
                    {subscriptionType === "variable" && (
                      <div className="space-y-6">
                        <div>
                          <FormLabel className="text-primary">Options</FormLabel>
                          <FormDescription className="mb-3">
                            Add different options for this variable
                            subscription.
                          </FormDescription>

                          <Accordion type="multiple" className="space-y-4">
                            {variableOptions.fields.map(
                              (option, optionIndex) => {
                                // Utilizar los field arrays creados anteriormente
                                const benefitsArray =
                                  variableBenefitsArrays[optionIndex];

                                return (
                                  <AccordionItem
                                    value={`option-${optionIndex}`}
                                    key={option.id}
                                    className="border rounded-md px-1"
                                  >
                                    <div className="flex items-center">
                                      <AccordionTrigger className="flex-1">
                                        <span className="text-sm font-medium text-muted-foreground">
                                          {watch(
                                            `options.${optionIndex}.name`
                                          ) || `Option ${optionIndex + 1}`}
                                        </span>
                                      </AccordionTrigger>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                          variableOptions.remove(optionIndex)
                                        }
                                        disabled={
                                          variableOptions.fields.length <= 1
                                        }
                                        className="mr-2"
                                      >
                                        <Trash2 className="h-4 w-4 text-primary" />
                                      </Button>
                                    </div>

                                    <AccordionContent className="px-2 pb-3">
                                      <div className="space-y-4">
                                        <FormField
                                          control={control}
                                          name={`options.${optionIndex}.name`}
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel className="text-primary">Option Name</FormLabel>
                                              <FormControl>
                                                <Input
                                                    className="text-muted-foreground"
                                                  placeholder="e.g., Basic, Premium"
                                                  {...field}
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />

                                        <div className="grid gap-4 md:grid-cols-3">
                                          <FormField
                                            control={control}
                                            name={`options.${optionIndex}.price`}
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel className="text-primary">Price</FormLabel>
                                                <FormControl>
                                                  <Input
                                                    className="text-muted-foreground"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    {...field}
                                                  />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />

                                          <FormField
                                            control={control}
                                            name={`options.${optionIndex}.currency`}
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel className="text-primary">Currency</FormLabel>
                                                <Select
                                                  value={field.value}
                                                  onValueChange={field.onChange}
                                                >
                                                  <FormControl>
                                                    <SelectTrigger className="text-muted-foreground">
                                                      <SelectValue placeholder="Select currency" />
                                                    </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent>
                                                    <SelectItem value="USD">
                                                      USD
                                                    </SelectItem>
                                                    <SelectItem value="COP">
                                                      COP
                                                    </SelectItem>
                                                    <SelectItem value="EUR">
                                                      EUR
                                                    </SelectItem>
                                                  </SelectContent>
                                                </Select>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />

                                          <FormField
                                            control={control}
                                            name={`options.${optionIndex}.billingCycle`}
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel className="text-primary">
                                                  Billing Cycle
                                                </FormLabel>
                                                <Select
                                                  value={field.value}
                                                  onValueChange={field.onChange}
                                                >
                                                  <FormControl>
                                                    <SelectTrigger className="text-muted-foreground">
                                                      <SelectValue placeholder="Select billing cycle" />
                                                    </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent>
                                                    <SelectItem value="Daily">
                                                      Daily
                                                    </SelectItem>
                                                    <SelectItem value="Weekly">
                                                      Weekly
                                                    </SelectItem>
                                                    <SelectItem value="Monthly">
                                                      Monthly
                                                    </SelectItem>
                                                    <SelectItem value="Yearly">
                                                      Yearly
                                                    </SelectItem>
                                                  </SelectContent>
                                                </Select>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                        </div>

                                        <div>
                                          <FormLabel className="text-primary">Benefits</FormLabel>
                                          <FormDescription className="mb-3">
                                            Add the benefits included in this
                                            option.
                                          </FormDescription>

                                          <div className="space-y-3">
                                            {benefitsArray?.fields.map(
                                              (
                                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                benefit: any,
                                                benefitIndex: number
                                              ) => (
                                                <div
                                                  key={benefit.id}
                                                  className="flex items-center gap-2"
                                                >
                                                  <FormField
                                                    control={control}
                                                    name={`options.${optionIndex}.benefits.${benefitIndex}.text`}
                                                    render={({ field }) => (
                                                      <FormItem className="flex-1">
                                                        <FormControl>
                                                          <Input
                                                            className="text-muted-foreground"
                                                            placeholder="e.g., Unlimited access"
                                                            {...field}
                                                          />
                                                        </FormControl>
                                                        <FormMessage />
                                                      </FormItem>
                                                    )}
                                                  />
                                                  <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() =>
                                                      benefitsArray.remove(
                                                        benefitIndex
                                                      )
                                                    }
                                                    disabled={
                                                      benefitsArray.fields
                                                        .length <= 1
                                                    }
                                                  >
                                                    <Trash2 className="h-4 w-4 text-primary" />
                                                  </Button>
                                                </div>
                                              )
                                            )}
                                          </div>

                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="mt-3 bg-purple-600"
                                            onClick={() =>
                                              benefitsArray.append({ text: "" })
                                            }
                                          >
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Add Benefit
                                          </Button>
                                        </div>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                );
                              }
                            )}
                          </Accordion>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-4 bg-purple-600"
                            onClick={() => {
                              variableOptions.append({
                                name: "",
                                price: 0,
                                currency: "USD",
                                billingCycle: "Monthly",
                                benefits: [{ text: "" }],
                              });
                            }}
                          >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Option
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Bundled Subscription Fields */}
                    {subscriptionType === "bundled" && (
                      <div className="space-y-6">
                        <div>
                          <FormLabel className="text-primary">Bundled Items</FormLabel>
                          <FormDescription className="mb-3">
                            Add the items included in this bundle.
                          </FormDescription>

                          <div className="space-y-3">
                            {bundledItems.fields.map((field, index) => (
                              <div
                                key={field.id}
                                className="flex items-center gap-2"
                              >
                                <FormField
                                  control={control}
                                  name={`bundledItems.${index}.itemId`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input
                                            className="text-muted-foreground"
                                          placeholder="Item ID (e.g., prod_123)"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => bundledItems.remove(index)}
                                  disabled={bundledItems.fields.length <= 1}
                                >
                                  <Trash2 className="h-4 w-4 text-primary" />
                                </Button>
                              </div>
                            ))}
                          </div>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-3 bg-purple-600"
                            onClick={() => bundledItems.append({ itemId: "" })}
                          >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Item
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </form>
            </FormProvider>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" className="text-primary hover:text-primary/60" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          {subscriptionType && (
            <Button type="submit" className="bg-purple-600 hover:bg-purple-600/60" form="subscription-form">
              Create Subscription
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
