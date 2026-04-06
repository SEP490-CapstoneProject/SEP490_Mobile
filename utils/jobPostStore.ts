import { create } from "zustand";

type Job = any;

type JobStore = {
  jobs: Job[];

  setJobs: (jobs: Job[]) => void;
  toggleSave: (postId: number) => void;
};

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],

  setJobs: (jobs) =>
    set({
      jobs: jobs.map((j) => ({
        ...j,
        isSaved: Boolean(j.isSaved),
      })),
    }),

  toggleSave: (postId) =>
    set((state) => ({
      jobs: state.jobs.map((j) =>
        j.postId === postId ? { ...j, isSaved: !Boolean(j.isSaved) } : j,
      ),
    })),
}));
