import { z } from "zod";

const ServiceMenuSchema = z.object({
  serviceMenuId: z.string(),
  serviceCode: z.string().optional(),
  name: z.string().optional(),
  price: z.string().optional(),
  serviceId: z.number().optional(),
});

const SubscribeServiceSchema = z.object({
  subscribeServiceId: z.number().optional(),
  serviceMenu: ServiceMenuSchema,
  purchasedFromClient: z.string().optional(),
  effectiveDt: z.string().optional(),
  expireDt: z.string().nullable().optional(),
});

const CustomerInfoSchema = z.object({
  address1: z.string(),
  city: z.string(),
  state: z.string(),
  email: z.string().nullable(),
  mobilePhone: z.string(),
  zipcode: z.string(),
});

const CustomerAccountSchema = z.object({
  accountId: z.number().optional(),
  login: z.string(),
  password: z.string(),
  effectiveDt: z.string(),
  expireDt: z.string(),
  primaryAudioLanguage: z.string(),
  secondaryAudioLanguage: z.string(),
  primarySubtitleLanguage: z.string(),
  secondarySubtitleLanguage: z.string(),
});

const CustomerSchema = z.object({
  customerId: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().nullable(),
  status: z.string(),
  pin: z.string(),
  autoProvisionCountMobile: z.number(),
  autoProvCountStationary: z.number(),
});

export const UserSchema = z.object({
  customer: CustomerSchema,
  customerAccount: CustomerAccountSchema,
  customerInfo: CustomerInfoSchema,
  subscribeService: z.array(SubscribeServiceSchema),
  subaccountCount: z.number(),
  assignedMobileCount: z.number(),
  assignedStbCount: z.number(),
  channelLineupName: z.string(),
  accountTypeDesc: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export const CreateUserSchema = UserSchema;
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
