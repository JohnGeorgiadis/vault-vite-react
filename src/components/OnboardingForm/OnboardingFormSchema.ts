import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

export const MAX_NUMBER_OF_CHARS_IN_FIELD = 50;

export const OnboardingFormSchema = z.object({
  firstName: z
    .string()
    .max(MAX_NUMBER_OF_CHARS_IN_FIELD)
    .min(1, { message: "First name is required" }),
  lastName: z
    .string()
    .max(MAX_NUMBER_OF_CHARS_IN_FIELD)
    .min(1, { message: "Last name is required" }),
  phone: z.string().refine((value) => isValidPhoneNumber(`+1${value}`, "CA"), {
    message: "Invalid phone number",
  }),
  corporationNumber: z
    .string()
    .length(9, { message: "Invalid Corporate Number" }),
});

export type OnboardingFormData = z.infer<typeof OnboardingFormSchema>;

export type FieldName = keyof OnboardingFormData;
