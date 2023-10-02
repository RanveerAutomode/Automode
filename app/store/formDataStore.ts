import { create } from "zustand";

interface FormStoreState {
  formStoreData: any;
  setFormStoreData: (data: { [key: string]: any }) => void;
}

const useFormStore = create<FormStoreState>((set) => ({
  formStoreData: {},
  setFormStoreData: (data) =>
    set((state) => ({ formStoreData: { ...state.formStoreData, ...data } })),
}));

interface AddressStoreState {
  addresses: any[];
  addAddress: (address: any) => void;
}

const useAddressStore = create<AddressStoreState>((set) => ({
  addresses: [],
  addAddress: (address) =>
    set((state) => ({ addresses: [...state.addresses, address] })),
}));

export { useFormStore, useAddressStore };
