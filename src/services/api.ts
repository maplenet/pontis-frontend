import axios from "axios";
import { User, CreateUserInput } from "../types/user";

const API_BASE_URL = "http://18.117.185.30:3000/api";

// Datos de prueba exactos de la API
const mockUsers: User[] = [
  {
    customer: {
      customerId: "MAP002",
      lastName: "Rivadeneira",
      middleName: null,
      firstName: "Erick",
      loginRequired: "N",
      status: "A",
      pin: "1234",
      entityId: 1,
      displayTimeout: 10,
      parentalControl: "N",
      hasPpv: "N",
      hasPromoChannel: "N",
      hasVod: "Y",
      channelBlocking: "N",
      autoProvisionCount: 0,
      autoProvisionCountMobile: 30,
      blockedChannelList: null,
      nrtcAccountTypeId: 1,
      fcoDrops: null,
      favoritesEnabled: "Y",
      multicastenabled: "N",
      multicastTunein: "N",
      enableStreamManagement: "N",
      totalAttainableBandwidth: 0,
      callerIdEnable: "N",
      localizationId: 71,
      npvrLimit: 0,
      pauselivetvLimit: 0,
      autoProvCountStationary: 15,
      externalCustomerId: null,
      advertisementOptIn: null,
    },
    customerAccount: {
      accountId: 335244,
      login: "MAP002",
      password: "abc123",
      showAllChannel: "N",
      allowance: null,
      pinRequired: "N",
      sexRating: "N",
      languageRating: "N",
      violentRating: "N",
      dialogRating: "N",
      fvRating: "N",
      reminderPeriod: null,
      ppvAutoSetReminder: "R",
      blockUnrated: "N",
      unlockTimeout: 120,
      bootStreamId: null,
      primaryAudioLanguage: "spa",
      secondaryAudioLanguage: "eng",
      primarySubtitleLanguage: "spa",
      secondarySubtitleLanguage: "eng",
      closedCaptions: "N",
      descriptiveVideo: "N",
      imageIdFocused: 9,
      imageIdUnfocused: 10,
      notificationTimeout: 10,
      username: null,
      effectiveDt: "02/01/2025",
      expireDt: null,
      mpaaAccessLevel: {
        assetRatingId: 8,
        assetRating: "X",
      },
      tvRatingId: {
        tvRatingId: 6,
        tvRating: "TVMA",
      },
      language: null,
      shareRental: "Y",
    },
    customerInfo: {
      address1: "Nuevo domicilio",
      address2: null,
      address3: null,
      city: "Cochabamba",
      state: "Cochabamba",
      zipcode: "02010220",
      workPhone: null,
      homePhone: null,
      fax: null,
      email: "user@email.com",
      note: null,
      mobilePhone: null,
      easLocationCode: null,
      zoneId: null,
    },
    subscribeService: [
      {
        subscribeServiceId: 4353370,
        serviceMenu: {
          serviceMenuId: 6213,
          serviceCode: "SRPKG",
          name: "M+ Servicio Básico",
          price: "0.00",
          serviceId: 78101,
        },
        purchasedFromClient: "N",
        effectiveDt: "02/01/2025",
        expireDt: null,
      },
      {
        subscribeServiceId: 4353373,
        serviceMenu: {
          serviceMenuId: 6212,
          serviceCode: "SRPKG",
          name: "M+ Paquete Básico",
          price: "0.00",
          serviceId: 78100,
        },
        purchasedFromClient: "N",
        effectiveDt: "02/01/2025",
        expireDt: null,
      },
    ],
    subaccountCount: 1,
    assignedMobileCount: 17,
    assignedStbCount: 0,
    channelLineupName: "Maplenet (4081)",
    accountTypeDesc: "Residential",
  },
  {
    customer: {
      customerId: "MAP001",
      lastName: "Rivadeneira",
      middleName: null,
      firstName: null,
      loginRequired: "N",
      status: "A",
      pin: "1234",
      entityId: 1,
      displayTimeout: 5,
      parentalControl: "N",
      hasPpv: "N",
      hasPromoChannel: "N",
      hasVod: "Y",
      channelBlocking: "N",
      autoProvisionCount: 0,
      autoProvisionCountMobile: 20,
      blockedChannelList: null,
      nrtcAccountTypeId: 1,
      fcoDrops: null,
      favoritesEnabled: "Y",
      multicastenabled: "N",
      multicastTunein: "N",
      enableStreamManagement: "N",
      totalAttainableBandwidth: 0,
      callerIdEnable: "N",
      localizationId: 71,
      npvrLimit: 0,
      pauselivetvLimit: 0,
      autoProvCountStationary: 10,
      externalCustomerId: null,
      advertisementOptIn: 0,
    },
    customerAccount: {
      accountId: 335240,
      login: "MAP001",
      password: "abc123",
      showAllChannel: "N",
      allowance: null,
      pinRequired: "N",
      sexRating: "N",
      languageRating: "N",
      violentRating: "N",
      dialogRating: "N",
      fvRating: "N",
      reminderPeriod: null,
      ppvAutoSetReminder: "R",
      blockUnrated: "N",
      unlockTimeout: 120,
      bootStreamId: null,
      primaryAudioLanguage: "spa",
      secondaryAudioLanguage: "eng",
      primarySubtitleLanguage: "spa",
      secondarySubtitleLanguage: "eng",
      closedCaptions: "N",
      descriptiveVideo: "N",
      imageIdFocused: 1,
      imageIdUnfocused: 2,
      notificationTimeout: 10,
      username: null,
      effectiveDt: "02/01/2025",
      expireDt: null,
      mpaaAccessLevel: {
        assetRatingId: 8,
        assetRating: "X",
      },
      tvRatingId: {
        tvRatingId: 6,
        tvRating: "TVMA",
      },
      language: null,
      shareRental: "Y",
    },
    customerInfo: {
      address1: "Quito",
      address2: null,
      address3: null,
      city: "Quito",
      state: "Pichincha",
      zipcode: "170109",
      workPhone: null,
      homePhone: null,
      fax: null,
      email: null,
      note: null,
      mobilePhone: null,
      easLocationCode: null,
      zoneId: null,
    },
    subscribeService: [
      {
        subscribeServiceId: 4353233,
        serviceMenu: {
          serviceMenuId: 6212,
          serviceCode: "SRPKG",
          name: "M+ Paquete Básico",
          price: "0.00",
          serviceId: 78100,
        },
        purchasedFromClient: "N",
        effectiveDt: "02/01/2025",
        expireDt: null,
      },
      {
        subscribeServiceId: 4472434,
        serviceMenu: {
          serviceMenuId: 6217,
          serviceCode: "SRPKG",
          name: "M+ Paquete Premium",
          price: "0.00",
          serviceId: 78104,
        },
        purchasedFromClient: "N",
        effectiveDt: "22/01/2025",
        expireDt: null,
      },
    ],
    subaccountCount: 0,
    assignedMobileCount: 25,
    assignedStbCount: 0,
    channelLineupName: "Maplenet (4081)",
    accountTypeDesc: "Residential",
  },
];

export const customerApi = {
  getCustomerById: async (customerId: string) => {
    // Simulamos delay de red
    // await new Promise(resolve => setTimeout(resolve, 500));
    const response = await axios.post(`${API_BASE_URL}/customers/getCustomer`, {
      customerId,
    });
    // console.log(response.data.response);
    const user = response.data.response;
    if (!user) {
      throw new Error("Cliente no encontrado");
    }
    return user;
  },

  createCustomer: async (userData: CreateUserInput) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser = { ...userData };
    mockUsers.push(newUser);
    return newUser;
  },

  updateCustomer: async (userData: Partial<User>) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockUsers.findIndex(
      (u) => u.customer.customerId === userData.customer?.customerId
    );
    if (index === -1) {
      throw new Error("Cliente no encontrado");
    }
    mockUsers[index] = { ...mockUsers[index], ...userData };
    return mockUsers[index];
  },

  inactivateCustomer: async (customerId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = mockUsers.find((u) => u.customer.customerId === customerId);
    if (user) {
      user.customer.status = "I";
    }
  },

  activateCustomer: async (customerId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = mockUsers.find((u) => u.customer.customerId === customerId);
    if (user) {
      user.customer.status = "A";
    }
  },
};
