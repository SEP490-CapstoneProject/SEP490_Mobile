import { create } from "zustand";

type Job = any;

type JobStore = {
  jobs: Job[];

  searchJobs: Job[];

  setJobs: (jobs: Job[]) => void;

  setSearchJobs: (jobs: Job[]) => void;

  toggleSave: (postId: number) => void;

  toggleSaveSearch: (postId: number) => void;
};

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],

  searchJobs: [],

  setJobs: (jobs) =>
    set({
      jobs: jobs.map((j) => ({
        ...j,
        isSaved: Boolean(j.isSaved),
      })),
    }),

  setSearchJobs: (jobs) =>
    set({
      searchJobs: jobs.map((j) => ({
        ...j,
        isSaved: Boolean(j.isSaved),
      })),
    }),

  toggleSave: (postId) =>
    set((state) => ({
      jobs: state.jobs.map((j) =>
        j.postId === postId
          ? {
              ...j,
              isSaved: !Boolean(j.isSaved),
            }
          : j,
      ),
    })),

  toggleSaveSearch: (postId) =>
    set((state) => ({
      searchJobs: state.searchJobs.map((j) =>
        j.postId === postId
          ? {
              ...j,
              isSaved: !Boolean(j.isSaved),
            }
          : j,
      ),
    })),
}));
