import { api } from "./api.js";

export const authService = {
  login(payload) {
    return api.post("/auth/login", payload);
  },
  profile() {
    return api.get("/auth/profile");
  },
};
