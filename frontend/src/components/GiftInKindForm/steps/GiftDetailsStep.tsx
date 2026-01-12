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
} from "@/components/ui/form";
import {
  GiftInKindFormData,
  giftCategories,
  conditionOptions,
} from "../GiftInKindFormSchema";

interface Props {
  form: UseFormReturn<GiftInKindFormData>;
  isSubmitting: boolean;
}

export function GiftDetailsStep({ form, isSubmitting }: Props) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="giftCategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">Gift Category *</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={isSubmitting}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {giftCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
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
        name="giftTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">Gift Title *</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., PlayStation 5 Console"
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
        name="giftDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">Description of Gift *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Please describe the gift in detail, including any accessories or special features..."
                {...field}
                rows={4}
                className="resize-none"
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="estimatedValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Estimated Value (NZD)</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., $500"
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
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Quantity *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  placeholder="1"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="condition"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="font-semibold">Condition *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-2"
                disabled={isSubmitting}
              >
                {conditionOptions.map((option) => (
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
    </div>
  );
}

export default GiftDetailsStep;
