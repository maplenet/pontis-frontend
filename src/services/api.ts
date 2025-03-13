import axios from "axios";
import { User, CreateUserInput, GetUsersParams } from "../types/user";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USER = import.meta.env.VITE_PONTIS_LOGIN_USER;
const PASSWORD = import.meta.env.VITE_PONTIS_LOGIN_PASSWORD;

const loginService = async () => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    customer_id: USER,
    password: PASSWORD,
  });
  return response;
};

export const customerApi = {
  getCustomerById: async (customerId: string) => {
    await loginService();
    const response = await axios.get(
      `${API_BASE_URL}/customers/getCustomer/${customerId}`
    );
    const user = response.data.response;
    if (!user) {
      throw new Error("Cliente no encontrado");
    }
    return user;
  },
  getAllCustomers: async (userParams: GetUsersParams) => {
    const {
      entriesPerPage,
      filterBy,
      orderBy,
      pageNumber,
      searchString,
      sortType,
    } = userParams;

    await loginService();
    try {
      const response = await axios.get(
        `${API_BASE_URL}/customers/getCustomers?entriesPerPage=${entriesPerPage}&filterBy=${filterBy}&orderBy=${orderBy}&pageNumber=${pageNumber}&searchString=${searchString}&sortType=${sortType}`
      );
      const users = await response.data.response.customerList;
      return users;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Error al obtener los clientes");
      } else {
        throw new Error("Error al obtener los clientes");
      }
    }
  },

  deleteCustomer: async (customerId: string) => {
    await loginService();
    try {
      const response = await axios.post(`${API_BASE_URL}/customers/delete`, {
        customerId,
        force: "Y",
      });
      if (response.data.response === "OK") {
        return { success: true };
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Cliente no encontrado");
      } else {
        throw new Error("Cliente no encontrado");
      }
    }
  },

  createCustomer: async (userData: CreateUserInput) => {
    await loginService();
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser = { ...userData };
    // mockUsers.push(newUser);
    return newUser;
  },

  updateCustomer: async (userData: Partial<User>) => {
    await loginService();
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
    await loginService();
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = mockUsers.find((u) => u.customer.customerId === customerId);
    if (user) {
      user.customer.status = "I";
    }
  },

  activateCustomer: async (customerId: string) => {
    await loginService();
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = mockUsers.find((u) => u.customer.customerId === customerId);
    if (user) {
      user.customer.status = "A";
    }
  },
};
