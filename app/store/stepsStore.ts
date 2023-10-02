import { create } from "zustand";

type StepState = {
  currentStep: number;
  setCurrentStep: (step: number | ((prevStep: number) => number)) => void;
  completedSteps: boolean[];
};

const useStepsStore = create<StepState>((set) => ({
  currentStep: 0,
  completedSteps: [],
  setCurrentStep: (step) =>
    set((state) => {
      const newStep =
        typeof step === "function" ? step(state.currentStep) : step;
      const newCompletedSteps = [...state.completedSteps];
      if (newStep > 0) {
        newCompletedSteps[newStep - 1] = true;
      }
      return {
        currentStep: newStep,
        completedSteps: newCompletedSteps,
      };
    }),
}));

export default useStepsStore;
