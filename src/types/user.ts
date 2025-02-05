import { z } from 'zod';

const ServiceMenuSchema = z.object({
  serviceMenuId: z.number(),
  serviceCode: z.string(),
  name: z.string(),
  price: z.string(),
  serviceId: z.number()
});

const SubscribeServiceSchema = z.object({
  subscribeServiceId: z.number(),
  serviceMenu: ServiceMenuSchema,
  purchasedFromClient: z.string(),
  effectiveDt: z.string(),
  expireDt: z.string().nullable()
});

const CustomerSchema = z.object({
  customerId: z.string(),
  lastName: z.string(),
  middleName: z.string().nullable(),
  firstName: z.string().nullable(),
  status: z.string(),
  pin: z.string(),
  autoProvisionCountMobile: z.number(),
  autoProvCountStationary: z.number(),
  // ... otros campos del customer
});

const CustomerAccountSchema = z.object({
  accountId: z.number(),
  login: z.string(),
  password: z.string(),
  // ... otros campos del customerAccount
});

const CustomerInfoSchema = z.object({
  address1: z.string(),
  city: z.string(),
  state: z.string(),
  zipcode: z.string(),
  email: z.string().nullable(),
  // ... otros campos del customerInfo
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
  accountTypeDesc: z.string()
});

export type User = z.infer<typeof UserSchema>;
export const CreateUserSchema = UserSchema;
export type CreateUserInput = z.infer<typeof CreateUserSchema>;