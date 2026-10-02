export interface RegisterFormData {
  businessName: string;
  cacNumber: string;
  numDistributors: string;
  businessType: string;
  storeAddress: string;
  workEmail: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  location: string;
  agreedToTerms: boolean;
  selectedPlan: "starter" | "pro" | "enterprise";
  billingCycle: "monthly" | "annually";
}

export const initialRegisterData: RegisterFormData = {
  businessName: "",
  cacNumber: "",
  numDistributors: "",
  businessType: "",
  storeAddress: "",
  workEmail: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  location: "",
  agreedToTerms: false,
  selectedPlan: "pro",
  billingCycle: "monthly",
};
