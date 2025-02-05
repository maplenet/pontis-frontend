import React from 'react';
import { User, CreateUserInput, CreateUserSchema } from '../types/user';

interface UserFormProps {
  onSubmit: (data: CreateUserInput) => void;
  initialData?: User;
  loading?: boolean;
}

export function UserForm({ onSubmit, initialData, loading }: UserFormProps) {
  const [formData, setFormData] = React.useState<CreateUserInput>(() => {
    if (initialData) {
      return {
        customerId: initialData.customerId,
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        pin: initialData.pin,
        status: initialData.status,
        customerAccount: initialData.customerAccount,
        customerInfo: initialData.customerInfo
      };
    }
    return {
      customerId: '',
      firstName: '',
      lastName: '',
      pin: '',
      status: 'A',
      customerAccount: {
        login: '',
        password: ''
      },
      customerInfo: {
        address: '',
        cellPhone: '',
        email: '',
        lastLocationCode: '',
        name: '',
        mobilePhone: '',
        ruc: '',
        user: '',
        serviceModule: ''
      }
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = CreateUserSchema.parse(formData);
      onSubmit(validated);
    } catch (error) {
      console.error('Error de validación:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Apellido
          </label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.customerInfo.email}
          onChange={(e) => setFormData({
            ...formData,
            customerInfo: { ...formData.customerInfo, email: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="cellPhone" className="block text-sm font-medium text-gray-700">
          Teléfono Celular
        </label>
        <input
          type="tel"
          id="cellPhone"
          value={formData.customerInfo.cellPhone}
          onChange={(e) => setFormData({
            ...formData,
            customerInfo: { ...formData.customerInfo, cellPhone: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Dirección
        </label>
        <input
          type="text"
          id="address"
          value={formData.customerInfo.address}
          onChange={(e) => setFormData({
            ...formData,
            customerInfo: { ...formData.customerInfo, address: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="serviceModule" className="block text-sm font-medium text-gray-700">
          Módulo de Servicio
        </label>
        <select
          id="serviceModule"
          value={formData.customerInfo.serviceModule}
          onChange={(e) => setFormData({
            ...formData,
            customerInfo: { ...formData.customerInfo, serviceModule: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={loading}
        >
          <option value="">Seleccionar módulo</option>
          <option value="6212">M+ Paquete Básico</option>
          <option value="6213">M+ Paquete Estándar</option>
          <option value="6214">M+ Paquete Premium</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}