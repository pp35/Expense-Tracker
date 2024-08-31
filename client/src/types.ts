// src/types/index.ts
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Expense {
  id: string;
  userId: string;
  category: string;
  amount: number;
  date: string;
}

export interface Budget {
  id: string;
  userId: string;
  category: string;
  limit: number;
  month: string;
}
