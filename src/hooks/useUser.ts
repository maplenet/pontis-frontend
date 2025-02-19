import { useState } from "react";
import { User, CreateUserInput, GetUsersParams } from "../types/user";
import { customerApi } from "../services/api";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserById = async (customerId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await customerApi.getCustomerById(customerId);
      setUser(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al obtener el cliente"
      );
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async (userParams: GetUsersParams) => {
    try {
      setLoading(true);
      setError(null);
      const users = await customerApi.getAllCustomers(userParams);
      setUsers(users);
      return users;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al obtener los clientes"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (customerId: string) => {
    try {
      setLoading(true);
      setError(null);
      await customerApi.deleteCustomer(customerId);
      setUser(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al eliminar el cliente"
      );
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: CreateUserInput) => {
    try {
      setLoading(true);
      setError(null);
      const newUser = await customerApi.createCustomer(userData);
      setUser(newUser);
      return newUser;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al crear el cliente"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await customerApi.updateCustomer(userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al actualizar el cliente"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (customerId: string, activate: boolean) => {
    try {
      setLoading(true);
      setError(null);
      if (activate) {
        await customerApi.activateCustomer(customerId);
      } else {
        await customerApi.inactivateCustomer(customerId);
      }
      await fetchUserById(customerId);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al cambiar el estado del cliente"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    users,
    loading,
    error,
    fetchUserById,
    getAllUsers,
    createUser,
    updateUser,
    toggleUserStatus,
    deleteUser,
  };
}
