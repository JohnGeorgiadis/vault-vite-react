import { UseFormRegister } from "react-hook-form";
import { Loader, TextInput, TextInputProps } from "@mantine/core";
import { useFetchCorpoNumber } from "@/api/useFetchCorpoNumber";

const icon = <Loader color="violet" size="sm" />;

export const FormCorpoNumberInput = (
  props: TextInputProps & {
    register: UseFormRegister<any>;
  },
) => {
  const { isPending, mutateAsync, error } = useFetchCorpoNumber();

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    mutateAsync(Number(value));
  };

  return (
    <TextInput
      {...props}
      {...props.register(props.name ?? "")}
      onBlur={handleOnBlur}
      error={
        (error?.message.length && "Invalid CorporateNumber") || props.error
      }
      rightSection={isPending ? icon : null}
    />
  );
};
