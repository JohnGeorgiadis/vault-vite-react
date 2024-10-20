import { postOnboardingForm } from "./usePostOnBoardingForm";
import { vaultApi } from "./vaultApi";

vitest.mock("./vaultApi");

const mockFormPostResponse = {};

const mockFormPostResponseWithError = {
  message: "Invalid phone number",
};

const mockValidFormData = {
  phone: "1234567890",
  firstName: "John",
  lastName: "Doe",
  corporationNumber: "123456789",
};

const mockVaultApiPost = vitest.mocked(vaultApi.post);

it("posts onBoarding form with valid inputs", async () => {
  const mockResponse = { data: mockFormPostResponse };
  mockVaultApiPost.mockResolvedValue(mockResponse);

  const response = await postOnboardingForm(mockValidFormData);

  expect(response).toEqual(mockFormPostResponse);
  expect(mockVaultApiPost).toHaveBeenCalledWith(`/profile-details`, {
    ...mockValidFormData,
    phone: `+1${mockValidFormData.phone}`,
  });
});

it("posts onBoarding form with invalid inputs", async () => {
  const mockResponse = { data: mockFormPostResponseWithError };
  mockVaultApiPost.mockResolvedValue(mockResponse);

  const response = await postOnboardingForm(mockValidFormData);

  expect(response).toEqual(mockFormPostResponseWithError);
  expect(mockVaultApiPost).toHaveBeenCalledWith(`/profile-details`, {
    ...mockValidFormData,
    phone: `+1${mockValidFormData.phone}`,
  });
});
