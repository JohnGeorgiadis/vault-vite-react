import axios from "axios";

export const vaultApi = axios.create({
  baseURL: "https://fe-hometask-api.dev.vault.tryvault.com/",
});
