import * as z from "zod";

// Gift categories
export const giftCategories = [
  { value: "accommodation", label: "Accommodation" },
  { value: "attractions_tickets", label: "Attractions + Tickets" },
  { value: "characters_entertainers", label: "Characters + Entertainers" },
  { value: "electronics", label: "Electronics" },
  { value: "experiences", label: "Experiences" },
  { value: "fashion_beauty", label: "Fashion & Beauty" },
  { value: "food_drink", label: "Food & Drink" },
  { value: "items", label: "Items" },
  { value: "party", label: "Party" },
  { value: "sport", label: "Sport" },
  { value: "transport", label: "Transport" },
  { value: "travel_provider", label: "Travel Provider" },
  { value: "other", label: "Other" },
  { value: "services", label: "Services" },
  { value: "vouchers", label: "Vouchers" },
] as const;

// NZ Regions
export const nzRegions = [
  { value: "auckland", label: "Auckland" },
  { value: "bay_of_plenty", label: "Bay of Plenty" },
  { value: "canterbury", label: "Canterbury" },
  { value: "gisborne", label: "Gisborne" },
  { value: "hawkes_bay", label: "Hawke's Bay" },
  { value: "manawatu_whanganui", label: "Manawatu-Whanganui" },
  { value: "marlborough", label: "Marlborough" },
  { value: "nelson", label: "Nelson" },
  { value: "northland", label: "Northland" },
  { value: "otago", label: "Otago" },
  { value: "southland", label: "Southland" },
  { value: "taranaki", label: "Taranaki" },
  { value: "tasman", label: "Tasman" },
  { value: "waikato", label: "Waikato" },
  { value: "wellington", label: "Wellington" },
  { value: "west_coast", label: "West Coast" },
] as const;

// Condition options
export const conditionOptions = [
  { value: "confirmed_new", label: "I confirm if my donation is an item it is brand new and in its original packaging." },
] as const;

// Delivery preference options
export const deliveryOptions = [
  { value: "pickup", label: "I will arrange pickup/drop-off" },
  { value: "delivery", label: "I will deliver to Make-A-Wish" },
  { value: "flexible", label: "Flexible - let's discuss" },
  { value: "na", label: "N/A" },
] as const;

// Step 1: Donor Information
const donorInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  isOrganization: z.boolean().default(false),
  companyName: z.string().optional(),
}).refine(
  (data) => !data.isOrganization || (data.companyName && data.companyName.length >= 1),
  {
    message: "Organisation/company name is required",
    path: ["companyName"],
  }
);

// Step 2: Gift Details
const giftDetailsSchema = z.object({
  giftCategory: z.string().min(1, "Please select a gift category"),
  giftTitle: z.string().min(3, "Please provide a title for your gift"),
  giftDescription: z
    .string()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),
  estimatedValue: z.string().optional(),
  quantity: z.string().min(1, "Please specify quantity").default("1"),
  condition: z.string().min(1, "Please confirm the condition of your donation"),
});

// Step 3: Logistics
const logisticsSchema = z.object({
  location: z.string().min(3, "Please provide your location/city"),
  region: z.string().min(1, "Please select your region"),
  deliveryPreference: z.string().min(1, "Please select a delivery preference"),
  availabilityNotes: z.string().max(500).optional(),
  hearAboutUs: z.string().max(500).optional(),
  giftMotivation: z.string().max(500).optional(),
});

// Step 4: Newsletter & Honeypot
const consentSchema = z.object({
  receiveNewsletter: z.boolean().default(false),
  _honeypot: z.string().optional(),
});

// Combined schema — use intersection since donorInfoSchema has a refine()
export const giftInKindFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  isOrganization: z.boolean().default(false),
  companyName: z.string().optional(),
}).merge(giftDetailsSchema)
  .merge(logisticsSchema)
  .merge(consentSchema)
  .refine(
    (data) => !data.isOrganization || (data.companyName && data.companyName.length >= 1),
    {
      message: "Organisation/company name is required",
      path: ["companyName"],
    }
  );

export type GiftInKindFormData = z.input<typeof giftInKindFormSchema>;

// Helper: Get fields for each step (for partial validation)
export const getFieldsForStep = (step: number): (keyof GiftInKindFormData)[] => {
  switch (step) {
    case 1:
      return ["firstName", "lastName", "email", "phone", "isOrganization", "companyName"];
    case 2:
      return ["giftCategory", "giftTitle", "giftDescription", "estimatedValue", "quantity", "condition"];
    case 3:
      return ["location", "region", "deliveryPreference", "availabilityNotes", "hearAboutUs", "giftMotivation"];
    case 4:
      return ["receiveNewsletter"];
    default:
      return [];
  }
};

// Helper functions to get labels
export const getCategoryLabel = (value: string): string => {
  return giftCategories.find((c) => c.value === value)?.label || value;
};

export const getRegionLabel = (value: string): string => {
  return nzRegions.find((r) => r.value === value)?.label || value;
};

export const getConditionLabel = (value: string): string => {
  return conditionOptions.find((c) => c.value === value)?.label || value;
};

export const getDeliveryLabel = (value: string): string => {
  return deliveryOptions.find((d) => d.value === value)?.label || value;
};
