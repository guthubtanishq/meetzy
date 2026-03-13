import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      // Private — never shown to others
      realName: "",
      age: null,
      gender: "",
      email: "",
      password: "",

      // Public — shown to matches
      anonymousId: "",
      traits: [],
      supportPreference: "Mixed",
      currentMood: "Calm",
      note: "",
      isOnboarded: false,

      // Actions
      setPrivateInfo: (data) => set((state) => ({ ...state, ...data })),
      setPublicInfo: (data) => set((state) => ({ ...state, ...data })),
      setTraits: (traits) => set({ traits }),
      setAnonymousId: (id) => set({ anonymousId: id }),
      setMood: (mood) => set({ currentMood: mood }),
      setSupport: (pref) => set({ supportPreference: pref }),
      reset: () => set({
        realName: "",
        age: null,
        gender: "",
        email: "",
        password: "",
        anonymousId: "",
        traits: [],
        supportPreference: "Mixed",
        currentMood: "Calm",
        note: "",
        isOnboarded: false,
      }),
    }),
    {
      name: 'meetzy-secure-storage',
    }
  )
);

export default useUserStore;
