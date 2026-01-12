import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  GiftInKindFormData,
  nzRegions,
  deliveryOptions,
} from "../GiftInKindFormSchema";

interface Props {
  form: UseFormReturn<GiftInKindFormData>;
  isSubmitting: boolean;
}

export function LogisticsStep({ form, isSubmitting }: Props) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">City/Suburb *</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., Auckland CBD, Christchurch"
                {...field}
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="region"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">Region *</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={isSubmitting}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your region" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {nzRegions.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="deliveryPreference"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="font-semibold">Delivery Preference *</FormLabel>
            <FormDescription>
              How would you prefer to get the gift to us?
            </FormDescription>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-2"
                disabled={isSubmitting}
              >
                {deliveryOptions.map((option) => (
                  <FormItem
                    key={option.value}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={option.value} />
                    </FormControl>
                    <FormLabel className="font-normal">{option.label}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="availabilityNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">Additional Notes</FormLabel>
            <FormDescription>
              Any availability constraints, special handling instructions, or other details we should know?
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder="e.g., Available weekdays only, item is fragile, etc."
                {...field}
                rows={3}
                className="resize-none"
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default LogisticsStep;
