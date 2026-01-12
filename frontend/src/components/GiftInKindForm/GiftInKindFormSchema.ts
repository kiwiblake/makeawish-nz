import * as z from "zod";

// Gift categories
export const giftCategories = [
  { value: "experiences", label: "Experiences (theme parks, events, etc.)" },
  { value: "technology", label: "Technology (gaming, electronics)" },
  { value: "furniture", label: "Furniture & Home Items" },
  { value: "toys_games", label: "Toys & Games" },
  { value: "travel", label: "Travel (accommodation, flights)" },
  { value: "vouchers", label: "Gift Vouchers" },
  { value: "services", label: "Services (professional, entertainment)" },
  { value: "other", label: "Other" },
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
  { value: "new", label: "New (unopened/unused)" },
  { value: "like_new", label: "Like New (barely used)" },
  { value: "good", label: "Good (minor wear)" },
  { value: "fair", label: "Fair (visible wear, fully functional)" },
] as const;

// Delivery preference options
export const deliveryOptions = [
  { value: "pickup", label: "I can arrange pickup/drop-off" },
  { value: "delivery", label: "I can deliver to Make-A-Wish" },
  { value: "flexible", label: "Flexible - let's discuss" },
] as const;

// Step 1: Donor Information
const donorInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  isOrganization: z.boolean().default(false),
  companyName: z.string().optional(),
});

// Step 2: Gift Details
const giftDetailsSchema = z.object({
  giftCategory: z.string().min(1, "Please select a gift category"),
  giftTitle: z.string().min(3, "Please provide a title for your gift"),
  giftDescription: z
    .string()
    .min(20, "Please provide at least 20 characters describing the gift")
    .max(1000, "Description cannot exceed 1000 characters"),
  estimatedValue: z.string().optional(),
  quantity: z.string().min(1, "Please specify quantity").default("1"),
  condition: z.string().min(1, "Please select the item condition"),
});

// Step 3: Logistics
const logisticsSchema = z.object({
  location: z.string().min(3, "Please provide your location/city"),
  region: z.string().min(1, "Please select your region"),
  deliveryPreference: z.string().min(1, "Please select a delivery preference"),
  availabilityNotes: z.string().max(500).optional(),
});

// Step 4: Consent
const consentSchema = z.object({
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  receiveNewsletter: z.boolean().default(false),
  _honeypot: z.string().optional(),
});

// Combined schema
export const giftInKindFormSchema = donorInfoSchema
  .merge(giftDetailsSchema)
  .merge(logisticsSchema)
  .merge(consentSchema);

export type GiftInKindFormData = z.infer<typeof giftInKindFormSchema>;

// Helper: Get fields for each step (for partial validation)
export const getFieldsForStep = (step: number): (keyof GiftInKindFormData)[] => {
  switch (step) {
    case 1:
      return ["firstName", "lastName", "email", "phone", "isOrganization", "companyName"];
    case 2:
      return ["giftCategory", "giftTitle", "giftDescription", "estimatedValue", "quantity", "condition"];
    case 3:
      return ["location", "region", "deliveryPreference", "availabilityNotes"];
    case 4:
      return ["agreeToTerms", "receiveNewsletter"];
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
