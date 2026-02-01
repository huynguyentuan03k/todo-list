import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CounterState {
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}
/**
 * nếu khởi tạo Store bên trong một hàm
 * const useCounterState = create<CounterState>( () =>{} ) , thì khi có 2 chố dùng đến
 * useCounterState này rồi nó sẽ tạo ra 1 bản sao chứ ko phải 1 biến duy nhất
 */
const useCounterState = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,

      increase: () => set((state) => ({ count: state.count + 1 })),

      decrease: () => set((state) => ({ count: state.count - 1 })),

      reset: () => set({ count: 0 }),
    }),
    {
      name: 'counter-storage', // key trong LocalStorage
    }
  )
);

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === 'counter-storage') {
      useCounterState.persist.rehydrate();
    }
  });
}

export default useCounterState;
