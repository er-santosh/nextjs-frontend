import { UnauthenticatedRequest } from "@/services/requests/unauthenticated";

import type { InquiryFormData } from "@/schemas/inquiry";

import type { ApiResponse } from "@/types/api/shared";

class ContactService extends UnauthenticatedRequest {
  async submitInquiry(data: InquiryFormData): Promise<ApiResponse> {
    const response = await this.post<ApiResponse, InquiryFormData>(
      "/contact/inquiry",
      { data }
    );
    return response.data;
  }
}

export const contactService = new ContactService();
