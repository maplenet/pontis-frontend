import axios from "axios";

interface ExternalCustomer {
  id: string;
  fullName: string;
  ci: string;
  phone: string;
  email: string;
  planId: number;
}
const API_ODOO_URL = import.meta.env.VITE_API_ODOO_URL;

// const mockExternalCustomers: ExternalCustomer[] = [
//   {
//     id: "33",
//     fullName: "Juan Pérez",
//     ci: "1234567",
//     phone: "0991234567",
//     email: "juan@example.com",
//     planId: 11
//   },
//   {
//     id: "34",
//     fullName: "María López",
//     ci: "7654321",
//     phone: "0997654321",
//     email: "maria@example.com",
//     planId: 12
//   }
// ];

let lastCustomerId = 32;

export const activationApi = {
  searchCustomer: async (searchTerm: string) => {
    try {
      const response = await axios.post(
        `${API_ODOO_URL}/users/search_contact`,
        {
          ci: searchTerm,
        }
      );
      const contact = response.data;
      if (!contact) {
        throw new Error("Cliente no encontrado");
      }
      lastCustomerId = parseInt(contact.id);
      return contact;
    } catch (err) {
      const detail = err.response.data.detail;
      console.error(detail);
      return { status: 400, detail };
    }
  },
  activateCustomer: async (idContact: number) => {
    const response = await axios.post(
      `${API_ODOO_URL}/users/activate_contact_from_odoo`,
      {
        id_contact: idContact,
      }
    );
    if (response.data.response === "OK") {
      return { success: true };
    }
  },

  generateCustomerId: async (): Promise<string> => {
    // lastCustomerId++;
    return `MAP1${lastCustomerId}`;
  },
};
