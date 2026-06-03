import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Address {
  id: string;
  userId: string;
  label: string;
  fullName: string;
  phoneNumber: string;
  fullAddress: string;
  isMain: boolean;
}

interface AddressState {
  addresses: Address[];
  createAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setMainAddress: (id: string) => void;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      addresses: [],
      createAddress: (data) => {
        const newAddress = { ...data, id: crypto.randomUUID() };
        set((state) => {
          const updatedAddresses = data.isMain
            ? state.addresses.map((a) =>
                a.userId === data.userId ? { ...a, isMain: false } : a
              ).concat(newAddress)
            : [...state.addresses, newAddress];
          return { addresses: updatedAddresses };
        });
      },
      updateAddress: (id, data) => {
        set((state) => ({
          addresses: state.addresses.map((a) => (a.id === id ? { ...a, ...data } : a)),
        }));
      },
      deleteAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        }));
      },
      setMainAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isMain: a.id === id,
          })),
        }));
      },
    }),
    {
      name: 'relecta-addresses',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
