export const AUTH_KEYS = {
  all: ["auth"] as const,
  currentUser: () => [...AUTH_KEYS.all, "currentUser"] as const,
};
