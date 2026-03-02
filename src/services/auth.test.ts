jest.mock("@/services/requests/unauthenticated", () => ({
  UnauthenticatedRequest: jest.fn().mockImplementation(() => ({
    post: jest.fn(),
    get: jest.fn(),
  })),
}));

jest.mock("@/services/requests/authenticated", () => ({
  AuthenticatedRequest: jest.fn().mockImplementation(() => ({
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
  })),
}));

jest.mock("@/lib/cookie-storage", () => ({
  CookieStorage: {
    setTokens: jest.fn(),
    clearTokens: jest.fn(),
    hasTokens: jest.fn(),
  },
}));

import { AuthenticatedRequest } from "@/services/requests/authenticated";
import { UnauthenticatedRequest } from "@/services/requests/unauthenticated";

import { CookieStorage } from "@/lib/cookie-storage";

import { authService } from "./auth";

type PublicReqMock = { post: jest.Mock; get: jest.Mock };
type ProtectedReqMock = { post: jest.Mock; get: jest.Mock; patch: jest.Mock };

// Capture mock instance references created during authService construction
const publicReq = (
  (UnauthenticatedRequest as jest.Mock).mock.results[0] as {
    value: PublicReqMock;
  }
).value;

const protectedReq = (
  (AuthenticatedRequest as jest.Mock).mock.results[0] as {
    value: ProtectedReqMock;
  }
).value;

const mockCookieStorage = CookieStorage as jest.Mocked<typeof CookieStorage>;

const SUCCESS_CODE = "SUCCESS";
const TEST_EMAIL = "test@example.com";
const tokens = { accessToken: "acc", refreshToken: "ref" };
const user = { id: "1", email: TEST_EMAIL };

describe("authService", () => {
  describe("login", () => {
    it("calls POST /auth/login and sets tokens", async () => {
      publicReq.post.mockResolvedValueOnce({
        data: {
          success: true,
          message: "ok",
          code: SUCCESS_CODE,
          data: { tokens },
        },
      });

      await authService.login({ email: TEST_EMAIL, password: "pass" });

      expect(publicReq.post).toHaveBeenCalledWith("/auth/login", {
        data: { email: TEST_EMAIL, password: "pass" },
      });
      expect(mockCookieStorage.setTokens).toHaveBeenCalledWith(
        tokens.accessToken,
        tokens.refreshToken
      );
    });

    it("throws when no tokens returned", async () => {
      publicReq.post.mockResolvedValueOnce({
        data: { success: true, message: "ok", code: SUCCESS_CODE, data: {} },
      });

      await expect(
        authService.login({ email: TEST_EMAIL, password: "pass" })
      ).rejects.toThrow("No tokens returned from login");
    });
  });

  describe("register", () => {
    it("calls POST /auth/register and returns response", async () => {
      const registerResponse = {
        data: {
          success: true,
          message: "created",
          code: SUCCESS_CODE,
          data: { user },
        },
      };
      publicReq.post.mockResolvedValueOnce(registerResponse);

      const result = await authService.register({
        firstName: "John",
        lastName: "Doe",
        email: TEST_EMAIL,
        password: "pass",
        confirmPassword: "pass",
      });

      expect(publicReq.post).toHaveBeenCalledWith("/auth/register", {
        data: expect.objectContaining({ email: TEST_EMAIL }),
      });
      expect(result).toEqual(registerResponse.data);
    });

    it("throws when no user returned", async () => {
      publicReq.post.mockResolvedValueOnce({
        data: { success: true, message: "ok", code: SUCCESS_CODE, data: {} },
      });

      await expect(
        authService.register({
          firstName: "John",
          lastName: "Doe",
          email: TEST_EMAIL,
          password: "pass",
          confirmPassword: "pass",
        })
      ).rejects.toThrow("No user returned from registration");
    });
  });

  describe("logout", () => {
    it("calls POST /auth/logout and clears tokens", async () => {
      protectedReq.post.mockResolvedValueOnce({
        data: { success: true, message: "logged out", code: SUCCESS_CODE },
      });

      await authService.logout();

      expect(protectedReq.post).toHaveBeenCalledWith("/auth/logout");
      expect(mockCookieStorage.clearTokens).toHaveBeenCalled();
    });

    it("clears tokens even when POST /auth/logout throws", async () => {
      protectedReq.post.mockRejectedValueOnce(new Error("network error"));

      await expect(authService.logout()).rejects.toThrow("network error");
      expect(mockCookieStorage.clearTokens).toHaveBeenCalled();
    });
  });

  describe("getCurrentUser", () => {
    it("calls GET /auth/me and returns response", async () => {
      const response = {
        data: {
          success: true,
          message: "ok",
          code: SUCCESS_CODE,
          data: { user },
        },
      };
      protectedReq.get.mockResolvedValueOnce(response);

      const result = await authService.getCurrentUser();

      expect(protectedReq.get).toHaveBeenCalledWith("/auth/me");
      expect(result).toEqual(response.data);
    });
  });

  describe("hasValidSession", () => {
    it("returns true when CookieStorage.hasTokens returns true", () => {
      mockCookieStorage.hasTokens.mockReturnValueOnce(true);
      expect(authService.hasValidSession()).toBe(true);
    });

    it("returns false when CookieStorage.hasTokens returns false", () => {
      mockCookieStorage.hasTokens.mockReturnValueOnce(false);
      expect(authService.hasValidSession()).toBe(false);
    });
  });
});
