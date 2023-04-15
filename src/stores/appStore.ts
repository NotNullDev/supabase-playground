import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type AppDocument = {
  id: string;
  name: string;
  description: string;
};

export type AppStoreType = {
  documents: AppDocument[];
};

export const appStore = create<AppStoreType>()(
  immer((set, get, state) => {
    return {
      documents: [],
    };
  })
);
