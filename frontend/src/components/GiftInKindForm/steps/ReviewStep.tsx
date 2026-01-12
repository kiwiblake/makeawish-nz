import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  GiftInKindFormData,
  getCategoryLabel,
  getRegionLabel,
  getConditionLabel,
  getDeliveryLabel,
} from "../GiftInKindFormSchema";

interface Props {
  form: UseFormReturn<GiftInKindFormData>;
  isSubmitting: boolean;
}

interface ReviewSectionProps {
  title: string;
  children: React.ReactNode;
}

function ReviewSection({ title, children }: ReviewSectionProps) {
  return (
    <div className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
      <h4 className="font-semibold text-primary mb-2">{title}</h4>
      <div className="text-sm text-gray-700 space-y-1">{children}</div>
    </div>
  );
}

export function ReviewStep({ form, isSubmitting }: Props) {
  const values = form.getValues();

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Please review your submission
        </h3>

        <ReviewSection title="Your Details">
          <p>
            <strong>Name:</strong> {values.firstName} {values.lastName}
          </p>
          <p>
            <strong>Email:</strong> {values.email}
          </p>
          <p>
            <strong>Phone:</strong> {values.phone}
          </p>
          {values.isOrganization && values.companyName && (
            <p>
              <strong>Organization:</strong> {values.companyName}
            </p>
          )}
        </ReviewSection>

        <ReviewSection title="Gift Information">
          <p>
            <strong>Category:</strong> {getCategoryLabel(values.giftCategory)}
          </p>
          <p>
            <strong>Title:</strong> {values.giftTitle}
          </p>
          <p>
            <strong>Description:</strong> {values.giftDescription}
          </p>
          {values.estimatedValue && (
            <p>
              <strong>Estimated Value:</strong> {values.estimatedValue}
            </p>
          )}
          <p>
            <strong>Quantity:</strong> {values.quantity}
          </p>
          <p>
            <strong>Condition:</strong> {getConditionLabel(values.condition)}
          </p>
        </ReviewSection>

        <ReviewSection title="Logistics">
          <p>
            <strong>Location:</strong> {values.location}, {getRegionLabel(values.region)}
          </p>
          <p>
            <strong>Delivery Preference:</strong> {getDeliveryLabel(values.deliveryPreference)}
          </p>
          {values.availabilityNotes && (
            <p>
              <strong>Notes:</strong> {values.availabilityNotes}
            </p>
          )}
        </ReviewSection>
      </div>

      {/* Consent Checkboxes */}
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="agreeToTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to the terms and conditions and confirm that the information
                  provided is accurate *
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="receiveNewsletter"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I would like to receive updates and news from Make-A-Wish New Zealand
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>

      {/* Honeypot field (hidden) */}
      <FormField
        control={form.control}
        name="_honeypot"
        render={({ field }) => (
          <FormItem className="absolute left-[-5000px]" aria-hidden="true">
            <FormControl>
              <Input {...field} tabIndex={-1} autoComplete="off" />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}

export default ReviewStep;
