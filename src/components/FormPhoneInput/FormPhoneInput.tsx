import { UseFormRegister } from "react-hook-form";
import { TextInput, TextInputProps } from "@mantine/core";

export const FormPhoneInput = (
  props: TextInputProps & {
    register: UseFormRegister<any>;
  },
) => {
  const preffix = <>+1</>;

  return (
    <TextInput
      {...props}
      leftSection={preffix}
      {...props.register(props.name ?? "")}
    />
  );
};
