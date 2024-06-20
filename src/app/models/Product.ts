export interface Product {
  _id: string,
  name: string,
  code: string,
  category: string,
  description: string,
  price: number,
  amount: number,
  status: boolean;
  creationDate: Date;
  deleteDate: Date;
}
