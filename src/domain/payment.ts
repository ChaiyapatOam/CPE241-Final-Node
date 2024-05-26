export interface TPayment {
  id: number;
  title: string | null;
  promotion_id?: number | null;
  booking_id: number;
  billing_method: string;
  price: number;
  paid_time: Date;
  created_at?: Date;
}

export interface TCreatePayment {
  title?: string | null;
  promotion_id?: number | null;
  booking_id: number;
  billing_method?: string;
  price: number;
}
