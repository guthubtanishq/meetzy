import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: {
        id: '',
        traits: [],
        supportPreference: 'Mixed',
        moodId: 0,
        isOnboarded: false,
      },
      setUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),
      addTrait: (trait) => set((state) => ({ 
        user: { ...state.user, traits: [...new Set([...state.user.traits, trait])] } 
      })),
      removeTrait: (trait) => set((state) => ({ 
        user: { ...state.user, traits: state.user.traits.filter(t => t !== trait) } 
      })),
      resetUser: () => set({ 
        user: { id: '', traits: [], supportPreference: 'Mixed', moodId: 0, isOnboarded: false } 
      }),
    }),
    {
      name: 'meetzy-storage',
    }
  )
);

export default useUserStore;
