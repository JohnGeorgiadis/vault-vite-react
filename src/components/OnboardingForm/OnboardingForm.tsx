import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Box, Button, Group, Text, Title } from "@mantine/core";
import { usePostOnboardingForm } from "@/api/usePostOnBoardingForm";
import { FormCorpoNumberInput } from "../FormCorpoNumberInput/FormCorpoNumberInput";
import { FormPhoneInput } from "../FormPhoneInput/FormPhoneInput";
import { FormTextInput } from "../FormTextInput/FormTextInput";
import { formDefaultValues } from "./formDefaultValues";
import {
  OnboardingFormData,
  OnboardingFormSchema,
} from "./OnboardingFormSchema";

export const OnboardingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(OnboardingFormSchema),
  });
  const { mutate, error: formPostError } = usePostOnboardingForm();

  const onSubmit = (data: OnboardingFormData) => {
    mutate(data);
  };

  return (
    <Box
      style={{
        maxWidth: 1200,
        backgroundColor: "#f8f8f8",
        height: "70vh",
        padding: 20,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Title ta="center" mt={20} fw={100} size={18} c="black">
        Step 1 of 5
      </Title>

      <Box
        style={{
          maxWidth: 600,
          marginTop: 120,
          marginRight: "auto",
          marginLeft: "auto",
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: 20,
          backgroundColor: "#fff",
        }}
      >
        <Title ta="center" mt={5} mb={20} fw={500} size={24}>
          Onboarding Form
        </Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Group grow>
            <FormTextInput
              label="First Name"
              name="firstName"
              defaultValue={formDefaultValues.firstName}
              register={register}
              error={errors.firstName?.message}
            />

            <FormTextInput
              defaultValue={formDefaultValues.lastName}
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName?.message}
            />
          </Group>

          <FormPhoneInput
            defaultValue={formDefaultValues.phoneNumber}
            label="Phone Number"
            name="phone"
            register={register}
            error={errors.phone?.message}
            type="number"
          />

          <FormCorpoNumberInput
            defaultValue={formDefaultValues.corporationNumber}
            label="Corporation Number"
            name="corporationNumber"
            register={register}
            error={errors.corporationNumber?.message}
            type="number"
          />

          <Button
            type="submit"
            fullWidth
            mt={20}
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "12px 0",
              maxWidth: 200,
              marginTop: 20,
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            Submit
          </Button>
        </form>

        {formPostError?.message && (
          <Text c="red" ta="center" mt={10}>
            Something went wrong, please try again later.
          </Text>
        )}
      </Box>
    </Box>
  );
};
