export const AUTH_KEYS = {
  all: ["auth"] as const,
  currentUser: () => [...AUTH_KEYS.all, "currentUser"] as const,
};

export const CONTACT_KEYS = {
  submitInquiry: () => ["contact", "submitInquiry"] as const,
};
