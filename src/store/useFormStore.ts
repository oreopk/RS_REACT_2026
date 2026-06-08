import { create } from 'zustand';
import type { sendData } from '../types/dataTypes';

type SubmissionInput = Omit<sendData, 'id' | 'createdAt'>;

type FormStore = {
  countries: string[];
  submissions: sendData[];
  addSubmission: (data: SubmissionInput) => void;
};

const COUNTRIES = ['Russia', 'USA', 'Germany', 'France'];

export const useFormStore = create<FormStore>()((set) => ({
  countries: COUNTRIES,
  submissions: [],
  addSubmission: (data) =>
    set((state) => ({
      submissions: [
        { ...data, id: crypto.randomUUID(), createdAt: Date.now() },
        ...state.submissions,
      ],
    })),
}));
