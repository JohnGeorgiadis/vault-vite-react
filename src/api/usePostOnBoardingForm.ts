import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { OnboardingFormData } from "@/components/OnboardingForm/OnboardingFormSchema";
import { vaultApi } from "./vaultApi";

export const postOnboardingForm = async (data: OnboardingFormData) => {
  const formData = { ...data, phone: `+1${data.phone}` };
  const res = await vaultApi.post("/profile-details", formData);
  return res.data;
};

export const usePostOnboardingForm = (
  options?: UseMutationOptions<unknown, Error, OnboardingFormData>,
) => {
  return useMutation({
    mutationKey: ["postOnboardingForm"],
    mutationFn: postOnboardingForm,
    ...options,
  });
};
