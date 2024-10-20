import { UseFormRegister } from "react-hook-form";
import { TextInput, TextInputProps } from "@mantine/core";

export const FormTextInput = (
  props: TextInputProps & {
    register: UseFormRegister<any>;
  },
) => {
  return <TextInput {...props} {...props.register(props.name ?? "")} />;
};
