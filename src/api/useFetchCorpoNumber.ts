import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import z from "zod";
import { vaultApi } from "./vaultApi";

const ValidateCorpoNumberSchema = z.object({
  valid: z.boolean(),
  corporationNumber: z.string().optional(),
  message: z.string().optional(),
});

export type ValidateCorpoNumberResponse = z.infer<
  typeof ValidateCorpoNumberSchema
>;

export const fetchCorpoNumber = async (
  corpoNumber: number,
): Promise<ValidateCorpoNumberResponse> => {
  const res = await vaultApi.get(`corporation-number/${corpoNumber}`);

  return ValidateCorpoNumberSchema.parse(res.data);
};

export const useFetchCorpoNumber = (
  options?: UseMutationOptions<ValidateCorpoNumberResponse, Error, number>,
) =>
  useMutation({
    mutationKey: ["corpoNumber"],
    mutationFn: fetchCorpoNumber,
    ...options,
  });
