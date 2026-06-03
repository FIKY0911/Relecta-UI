import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  fullName: string;
  email: string;
  password?: string;
}

interface AuthState {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
  register: (user: Omit<User, 'id'>) => { success: boolean; message: string };
  login: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      isAuthenticated: false,

      register: (userData) => {
        const { users } = get();
        const emailExists = users.some((u) => u.email === userData.email);

        if (emailExists) {
          return { success: false, message: 'Email already registered' };
        }

        const newUser: User = {
          ...userData,
          id: crypto.randomUUID(),
        };

        set({ users: [...users, newUser] });
        return { success: true, message: 'Registration successful' };
      },

      login: (email, password) => {
        const { users } = get();
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
          return { success: false, message: 'Invalid email or password' };
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _password, ...userWithoutPassword } = user;
        set({
          currentUser: userWithoutPassword as User,
          isAuthenticated: true,
        });
        return { success: true, message: 'Login successful' };
      },

      logout: () => {
        set({ currentUser: null, isAuthenticated: false });
      },
    }),
    {
      name: 'relecta-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        users: state.users,
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
