import axios from "axios";
import { User, CreateUserInput } from "../types/user";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const customerApi = {
  getCustomerById: async (customerId: string) => {
    const response = await axios.post(`${API_BASE_URL}/customers/getCustomer`, {
      customerId,
    });
    const user = response.data.response;
    if (!user) {
      throw new Error("Cliente no encontrado");
    }
    return user;
  },

  deleteCustomer: async (customerId: string) => {
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
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser = { ...userData };
    // mockUsers.push(newUser);
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
