import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { activationApi } from "../services/activationApi";
import { LoaderOverlay } from "./LoaderOverlay";

interface ActivateCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivate: (customerData: any) => Promise<void>;
  loading?: boolean;
}

export function ActivateCustomerModal({
  isOpen,
  onClose,
  onActivate,
  loading,
}: ActivateCustomerModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [activation, setActivation] = useState(false);
  const [customerData, setCustomerData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Limpiar el formulario cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setCustomerData(null);
      setError(null);
    }
  }, [isOpen]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;

    setCustomerData(null);
    setError(null);
    setSearching(true);

    console.log("searching", searchTerm);
    try {
      const customer = await activationApi.searchCustomer(searchTerm);
      if (customer) {
        const customerId = await activationApi.generateCustomerId();
        setCustomerData({
          ...customer,
          customerId,
        });
      } else {
        setError("No se encontró ningún cliente con ese correo o teléfono");
      }
    } catch {
      setError("Error al buscar el cliente");
    } finally {
      setSearching(false);
    }
  };

  const getPackageInfo = (planId: number) => {
    switch (planId) {
      case 11:
        return {
          serviceMenuId: 6212,
          name: "M+ Paquete Básico",
          serviceId: 78100,
        };
      case 12:
        return {
          serviceMenuId: 6217,
          name: "M+ DEPORTE",
          serviceId: 78104,
        };
      default:
        return {
          serviceMenuId: 6212,
          name: "M+ DEPORTE",
          serviceId: 78100,
        };
    }
  };

  const handleActivate = async () => {
    if (!customerData) return;
    setSearching(true);
    try {
      const contactId = customerData.id;
      const response = await activationApi.activateCustomer(contactId);
      console.log(response);
      setSearchTerm("");
      setCustomerData(null);
      setError(null);
      onClose();
    } catch {
      setError("Error al activar el cliente");
    } finally {
      setSearching(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <LoaderOverlay isLoading={searching} />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Activar Nuevo Cliente
            </h2>

            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label
                  htmlFor="searchTerm"
                  className="block text-sm font-medium text-gray-700"
                >
                  Buscar por carnet de identidad
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    id="searchTerm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="CI..."
                    disabled={searching || loading}
                  />
                  <button
                    type="submit"
                    disabled={searching || loading}
                    className="absolute inset-y-0 right-0 px-3 flex items-center bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {customerData && (
                <div className="space-y-4 border-t pt-4 mt-4">
                  <input type="hidden" value={customerData.customerId} />

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ID Cliente
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {customerData.customerId}
                    </p>
                  </div> */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nombre Completo
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {customerData.fullName}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CI
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {customerData.ci}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Teléfono
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {customerData.phone}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {customerData.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Paquete a Activar
                    </label>
                    <p className="mt-1 text-sm font-medium text-indigo-600">
                      {getPackageInfo(customerData.planId).name}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancelar
                </button>
                {customerData && (
                  <button
                    type="button"
                    onClick={handleActivate}
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {loading ? "Activando..." : "Activar Cliente"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
