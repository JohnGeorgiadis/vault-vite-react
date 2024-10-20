import { QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@test-utils";
import { useFetchCorpoNumber } from "@/api/useFetchCorpoNumber";
import { usePostOnboardingForm } from "@/api/usePostOnBoardingForm";
import { queryClient } from "@/App";
import { OnboardingForm } from "./OnboardingForm";

vitest.mock("@/api/usePostOnBoardingForm");
vitest.mock("@/api/useFetchCorpoNumber");

const mockMutate = vitest.fn();
const mockError = null;

const mockData = {
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "2505550199",
  corpoNumber: "1234567890",
};

describe("OnboardingForm component", () => {
  beforeEach(() => {
    vitest.clearAllMocks();

    (usePostOnboardingForm as any).mockReturnValue({
      mutate: mockMutate,
      error: mockError,
    });

    (useFetchCorpoNumber as any).mockReturnValue({
      data: {},
      error: mockError,
      isPending: false,
    });
  });

  it("should render the form correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <OnboardingForm />
      </QueryClientProvider>,
    );

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Corporation Number/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("should be able to type in inputs", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <OnboardingForm />
      </QueryClientProvider>,
    );
    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const phoneInput = screen.getByLabelText("Phone Number");
    const corpoInput = screen.getByLabelText("Corporation Number");
    fireEvent.change(firstNameInput, { target: { value: mockData.firstName } });
    fireEvent.change(lastNameInput, { target: { value: mockData.lastName } });
    fireEvent.change(phoneInput, { target: { value: mockData.phoneNumber } });
    fireEvent.change(corpoInput, { target: { value: mockData.corpoNumber } });

    expect((firstNameInput as HTMLInputElement).value).toBe(mockData.firstName);
    expect((lastNameInput as HTMLInputElement).value).toBe(mockData.lastName);
    expect((phoneInput as HTMLInputElement).value).toBe(mockData.phoneNumber);
    expect((corpoInput as HTMLInputElement).value).toBe(mockData.corpoNumber);
  });

  it("should call usePostOnboardingForm when submitting", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <OnboardingForm />
      </QueryClientProvider>,
    );

    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const phoneInput = screen.getByLabelText("Phone Number");
    const corpoInput = screen.getByLabelText("Corporation Number");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(firstNameInput, { target: { value: mockData.firstName } });
    fireEvent.change(lastNameInput, { target: { value: mockData.lastName } });
    fireEvent.change(phoneInput, { target: { value: mockData.phoneNumber } });
    fireEvent.change(corpoInput, { target: { value: mockData.corpoNumber } });

    fireEvent.click(submitButton);

    expect(usePostOnboardingForm).toHaveBeenCalledTimes(1);
  });

  it("should call useFetchCorpoNumber when onBlur corpo number field", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <OnboardingForm />
      </QueryClientProvider>,
    );

    const corpoInput = screen.getByLabelText("Corporation Number");

    fireEvent.change(corpoInput, { target: { value: mockData.corpoNumber } });

    expect(useFetchCorpoNumber).toHaveBeenCalledTimes(1);
  });
});
