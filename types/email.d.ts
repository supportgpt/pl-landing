export type InquiryType = 'Startup MVP' | 'Custom Build' | 'General';

export interface EmailData {
  name: string;
  email: string;
  projectDetails: string;
  inquiryType: InquiryType;
}

export interface EmailResponse {
  success: boolean;
  error?: string;
}
