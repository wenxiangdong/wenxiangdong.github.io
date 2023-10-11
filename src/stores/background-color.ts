import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
type StoreValue = {
  value: string;
};
export const backgroundColorStore = createStore(
  persist<StoreValue>(
    () => ({
      value: "",
    }),
    {
      name: "BackgroundColor",
    }
  )
);
