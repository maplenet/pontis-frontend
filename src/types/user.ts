import { z } from "zod";

const CustomerSchema = z.object({
  customerId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().nullable(),
  loginRequired: z.string().length(1),
  status: z.string().length(1),
  pin: z.string(),
  entityId: z.number(),
  displayTimeout: z.number(),
  parentalControl: z.string().length(1),
  hasPpv: z.string().length(1),
  hasPromoChannel: z.string().length(1),
  hasVod: z.string().length(1),
  channelBlocking: z.string().length(1),
  autoProvisionCount: z.number(),
  autoProvisionCountMobile: z.number(),
  blockedChannelList: z.string().nullable(),
  nrtcAccountTypeId: z.number(),
  fcoDrops: z.string().nullable(),
  favoritesEnabled: z.string().length(1),
  multicastenabled: z.string().length(1),
  multicastTunein: z.string().length(1),
  enableStreamManagement: z.string().length(1),
  totalAttainableBandwidth: z.number(),
  callerIdEnable: z.string().length(1),
  localizationId: z.number(),
  npvrLimit: z.number(),
  pauselivetvLimit: z.number(),
  autoProvCountStationary: z.number(),
  externalCustomerId: z.string().nullable(),
  advertisementOptIn: z.number(),
});

const MpaaAccessLevelSchema = z.object({
  assetRatingId: z.number(),
  assetRating: z.string().length(1),
});

const TvRatingSchema = z.object({
  tvRatingId: z.number(),
  tvRating: z.string(),
});

const CustomerAccountSchema = z.object({
  accountId: z.number().optional(),
  login: z.string(),
  password: z.string(),
  showAllChannels: z.string().length(1),
  allowance: z.string().nullable(),
  pinRequired: z.string().length(1),
  sexRating: z.string().length(1),
  languageRating: z.string().length(1),
  violentRating: z.string().length(1),
  dialogRating: z.string().length(1),
  fvRating: z.string().length(1),
  reminderPeriod: z.string().nullable(),
  ppvAutoSetReminder: z.string().length(1),
  blockUnrated: z.string().length(1),
  unlockTimeout: z.number(),
  bootStreamId: z.number().nullable(),
  primaryAudioLanguage: z.string(),
  secondaryAudioLanguage: z.string(),
  primarySubtitleLanguage: z.string(),
  secondarySubtitleLanguage: z.string(),
  closedCaptions: z.string().length(1),
  descriptiveVideo: z.string().length(1),
  imageIdFocused: z.number(),
  imageIdUnfocused: z.number(),
  notificationTimeout: z.number(),
  username: z.string().nullable(),
  effectiveDt: z.string(),
  expireDt: z.string().nullable(),
  mpaaAccessLevel: MpaaAccessLevelSchema,
  tvRatingId: TvRatingSchema,
  language: z.string().nullable(),
  shareRental: z.string().length(1),
});

const CustomerInfoSchema = z.object({
  address1: z.string(),
  address2: z.string().nullable(),
  address3: z.string().nullable(),
  city: z.string(),
  state: z.string(),
  zipcode: z.string(),
  workPhone: z.string().nullable(),
  homePhone: z.string().nullable(),
  fax: z.string().nullable(),
  email: z.string().nullable(),
  note: z.string().nullable(),
  mobilePhone: z.string(),
  easLocationCode: z.string().nullable(),
  zoneId: z.number().nullable(),
});

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
  effectiveDt: z.string().nullable(),
  expireDt: z.string().nullable(),
});

export const UserSchema = z.object({
  customer: CustomerSchema,
  customerAccount: CustomerAccountSchema,
  customerInfo: CustomerInfoSchema,
  subscribeService: z.array(SubscribeServiceSchema).optional(),
  subaccountCount: z.number().optional(),
  assignedMobileCount: z.number().optional(),
  assignedStbCount: z.number().optional(),
  channelLineupName: z.string().optional(),
  accountTypeDesc: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
export const CreateUserSchema = UserSchema;
export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export const getUsersParamsSchema = z.object({
  entriesPerPage: z.number(),
  filterBy: z.string(),
  orderBy: z.string(),
  pageNumber: z.number(),
  searchString: z.string(),
  sortType: z.string(),
});

export type GetUsersParams = z.infer<typeof getUsersParamsSchema>;
