import {
  fetchCorpoNumber,
  ValidateCorpoNumberResponse,
} from "./useFetchCorpoNumber";
import { vaultApi } from "./vaultApi";

vitest.mock("./vaultApi");

const mockCorpoNumberResponse: ValidateCorpoNumberResponse = {
  valid: true,
  corporationNumber: "123456789",
};

const mockCorpoNumberResponseWithError: ValidateCorpoNumberResponse = {
  valid: false,
  message: "Invalid corporation number",
};

const mockVaultApiGet = vitest.mocked(vaultApi.get);

it("fetches corpo number with valid number", async () => {
  const mockResponse = { data: mockCorpoNumberResponse };
  mockVaultApiGet.mockResolvedValue(mockResponse);

  const response = await fetchCorpoNumber(
    Number(mockCorpoNumberResponse.corporationNumber),
  );

  expect(response).toEqual(mockCorpoNumberResponse);
  expect(mockVaultApiGet).toHaveBeenCalledWith(
    `corporation-number/${mockCorpoNumberResponse.corporationNumber}`,
  );
});

it("fetches corpo number with invalid number", async () => {
  const mockResponse = { data: mockCorpoNumberResponseWithError };
  mockVaultApiGet.mockResolvedValue(mockResponse);

  const response = await fetchCorpoNumber(
    Number(mockCorpoNumberResponse.corporationNumber),
  );

  expect(response).toEqual(mockCorpoNumberResponseWithError);
  expect(mockVaultApiGet).toHaveBeenCalledWith(
    `corporation-number/${mockCorpoNumberResponse.corporationNumber}`,
  );
});
