import Cookies from "js-cookie";

import { COOKIE_NAMES, CookieStorage } from "./cookie-storage";

jest.mock("js-cookie");

const mockCookies = Cookies as jest.Mocked<typeof Cookies>;
// Cast get to jest.Mock to avoid overload resolution issues with mockReturnValueOnce
const mockGet = mockCookies.get as jest.Mock;

describe("CookieStorage", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("setTokens", () => {
    it("sets access token cookie with correct name", () => {
      CookieStorage.setTokens("access123", "refresh456");
      expect(mockCookies.set).toHaveBeenCalledWith(
        COOKIE_NAMES.ACCESS_TOKEN,
        "access123",
        expect.any(Object)
      );
    });

    it("sets refresh token cookie with correct name", () => {
      CookieStorage.setTokens("access123", "refresh456");
      expect(mockCookies.set).toHaveBeenCalledWith(
        COOKIE_NAMES.REFRESH_TOKEN,
        "refresh456",
        expect.any(Object)
      );
    });
  });

  describe("getAccessToken", () => {
    it("returns string when token exists", () => {
      mockGet.mockReturnValueOnce("access123");
      expect(CookieStorage.getAccessToken()).toBe("access123");
    });

    it("returns null when token does not exist", () => {
      mockGet.mockReturnValueOnce(undefined);
      expect(CookieStorage.getAccessToken()).toBeNull();
    });
  });

  describe("getRefreshToken", () => {
    it("returns string when token exists", () => {
      mockGet.mockReturnValueOnce("refresh456");
      expect(CookieStorage.getRefreshToken()).toBe("refresh456");
    });

    it("returns null when token does not exist", () => {
      mockGet.mockReturnValueOnce(undefined);
      expect(CookieStorage.getRefreshToken()).toBeNull();
    });
  });

  describe("clearTokens", () => {
    it("removes access token cookie", () => {
      CookieStorage.clearTokens();
      expect(mockCookies.remove).toHaveBeenCalledWith(
        COOKIE_NAMES.ACCESS_TOKEN
      );
    });

    it("removes refresh token cookie", () => {
      CookieStorage.clearTokens();
      expect(mockCookies.remove).toHaveBeenCalledWith(
        COOKIE_NAMES.REFRESH_TOKEN
      );
    });
  });

  describe("hasTokens", () => {
    it("returns true when both tokens are present", () => {
      mockGet
        .mockReturnValueOnce("access123")
        .mockReturnValueOnce("refresh456");
      expect(CookieStorage.hasTokens()).toBe(true);
    });

    it("returns false when access token is missing", () => {
      mockGet.mockReturnValueOnce(undefined).mockReturnValueOnce("refresh456");
      expect(CookieStorage.hasTokens()).toBe(false);
    });

    it("returns false when refresh token is missing", () => {
      mockGet.mockReturnValueOnce("access123").mockReturnValueOnce(undefined);
      expect(CookieStorage.hasTokens()).toBe(false);
    });
  });
});
