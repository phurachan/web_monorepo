import { u as useState, b as buildApiUrl, A as API_ENDPOINTS } from "./api-ChRidk0C.js";
import { n as navigateTo } from "../server.mjs";
import { readonly, computed } from "vue";
const useAuth = () => {
  const authState = useState("auth", () => ({
    user: null,
    isAuthenticated: false,
    isLoading: true
  }));
  const login = async (email, password) => {
    try {
      const response = await $fetch(buildApiUrl(API_ENDPOINTS.AUTH.LOGIN), {
        method: "POST",
        body: { email, password }
      });
      authState.value.user = response.user;
      authState.value.isAuthenticated = true;
      authState.value.isLoading = false;
      return { success: true, user: response.user };
    } catch (error) {
      authState.value.user = null;
      authState.value.isAuthenticated = false;
      authState.value.isLoading = false;
      return {
        success: false,
        error: error.data?.message || error.message || "Login failed"
      };
    }
  };
  const logout = async () => {
    try {
      await $fetch(buildApiUrl(API_ENDPOINTS.AUTH.LOGOUT), {
        method: "POST"
      });
      authState.value.user = null;
      authState.value.isAuthenticated = false;
      authState.value.isLoading = false;
      await navigateTo("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const checkAuth = async () => {
    return;
  };
  const setupAdmin = async (email, password, name) => {
    try {
      const response = await $fetch(buildApiUrl(API_ENDPOINTS.AUTH.SETUP), {
        method: "POST",
        body: { email, password, name }
      });
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        error: error.data?.message || error.message || "Setup failed"
      };
    }
  };
  return {
    user: readonly(computed(() => authState.value.user)),
    isAuthenticated: readonly(computed(() => authState.value.isAuthenticated)),
    isLoading: readonly(computed(() => authState.value.isLoading)),
    login,
    logout,
    checkAuth,
    setupAdmin
  };
};
export {
  useAuth as u
};
//# sourceMappingURL=useAuth-D-aEAjNt.js.map
