import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface OrderItem {
  typeId: string;
  typeName: string;
  quantity: number;
  price: number;
  weightKg: number;
}

export type PaymentMethod = 'gopay' | 'ovo' | 'dana' | 'qris';

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalEstimate: number;
  totalWeight: number;
  transportMode: 'Motor' | 'Mobil Pickup' | 'Truk' | 'Gerobak';
  damageSeverity: 'Ringan' | 'Sedang' | 'Parah';
  pickupDate: string;
  addressId: string;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

interface OrderState {
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'createdAt'>) => string;
  getOrdersByUserId: (userId: string) => Order[];
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      createOrder: (orderData) => {
        const id = `ORD-${Math.random().toString(36).slice(2, 11).toUpperCase()}`;
        const newOrder: Order = {
          ...orderData,
          id,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ orders: [newOrder, ...state.orders] }));
        return id;
      },
      getOrdersByUserId: (userId) => {
        return get().orders.filter((o) => o.userId === userId);
      },
    }),
    {
      name: 'relecta-orders',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
