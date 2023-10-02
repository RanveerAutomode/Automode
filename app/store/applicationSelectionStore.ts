import { create } from "zustand";

import Icon1 from "@/public/add-organization/application/img_1.png";
import Icon2 from "@/public/add-organization/application/img_2.png";
import Icon3 from "@/public/add-organization/application/img_3.png";

type State = {
  showError: boolean;
  setShowError: (value: boolean) => void;
  applicationData: Array<any>;
  setApplicationData: (data: Array<any>) => void;
};

export const useApplicationSelectionStore = create<State>((set) => ({
  showError: false,
  applicationData: [
    {
      id: 1,
      title: "Customer Relationship Management",
      description:
        "Used by businesses to manage and analyze interactions with customers and potential customers throughout the entire customer lifecycle",
      icon: Icon1,
      selected: false,
    },
    {
      id: 2,
      title: "Human Resource",
      description:
        "Responsible for various tasks related to employee recruitment, training, performance management, compensation, benefits, employee relations, and more.",
      icon: Icon2,
      selected: false,
    },
    {
      id: 3,
      title: "Accounts",
      description:
        "Used to record financial transactions. These categories are organized in a system called a chart of accounts. Each account represents a specific type of activity.",
      icon: Icon3,
      selected: false,
    },
  ],
  setShowError: (value: boolean) => set(() => ({ showError: value })),
  setApplicationData: (data: Array<any>) =>
    set(() => ({ applicationData: data })),
}));
