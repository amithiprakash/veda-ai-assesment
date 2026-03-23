import { create } from "zustand";

type Question = {
  type: string;
  count: number;
  marks: number;
};

type Assignment = {
  dueDate: string;
  instructions: string;
  questions: Question[];
};

type Store = {
  assignment: Assignment;
  setAssignment: (data: Partial<Assignment>) => void;
  addQuestion: (q: Question) => void;
  removeQuestion: (index: number) => void;
};

export const useAssignmentStore = create<Store>((set) => ({
  assignment: {
    dueDate: "",
    instructions: "",
    questions: [],
  },

  setAssignment: (data) =>
    set((state) => ({
      assignment: { ...state.assignment, ...data },
    })),

  addQuestion: (q) =>
    set((state) => ({
      assignment: {
        ...state.assignment,
        questions: [...state.assignment.questions, q],
      },
    })),

  removeQuestion: (index) =>
    set((state) => ({
      assignment: {
        ...state.assignment,
        questions: state.assignment.questions.filter(
          (_, i) => i !== index
        ),
      },
    })),
}));