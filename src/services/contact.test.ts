// Use function() so `this` is the new instance (not a returned plain object),
// allowing ContactService.prototype methods (submitInquiry) to remain intact.
jest.mock("@/services/requests/unauthenticated", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  UnauthenticatedRequest: jest.fn().mockImplementation(function (this: any) {
    this.post = jest.fn();
  }),
}));

import { UnauthenticatedRequest } from "@/services/requests/unauthenticated";

import { contactService } from "./contact";

const contactReq = (UnauthenticatedRequest as jest.Mock).mock.instances[0] as {
  post: jest.Mock;
};

describe("contactService", () => {
  describe("submitInquiry", () => {
    it("calls POST /contact/inquiry with form data", async () => {
      const formData = {
        name: "John Doe",
        email: "john@example.com",
        topic: "sales",
        teamSize: "1-10",
        message: "Hello there",
      };
      const responseData = {
        success: true,
        message: "Inquiry submitted",
        code: "SUCCESS",
      };
      contactReq.post.mockResolvedValueOnce({ data: responseData });

      const result = await contactService.submitInquiry(formData);

      expect(contactReq.post).toHaveBeenCalledWith("/contact/inquiry", {
        data: formData,
      });
      expect(result).toEqual(responseData);
    });
  });
});
