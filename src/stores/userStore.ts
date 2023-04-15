import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { supabase } from "../lib/supabase";

type UserStoreType = {
  session: Session | null;
};

export const userStore = create<UserStoreType>()(
  immer((set, get, state) => {
    supabase.auth.onAuthStateChange((e, s) => {
      console.log(e);
      console.log(s);
      set((store) => {
        store.session = s;
      });
    });

    return {
      session: null,
    };
  })
);
