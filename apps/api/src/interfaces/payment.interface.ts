export interface ICreatePayment {
  order_id: number;
  payment_method: string;
  amount: number;
  transaction_id: string;
}

export interface IUploadPaymentProof {
  payment_id: number;
  file_path: string;
}
