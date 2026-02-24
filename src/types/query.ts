export interface Query {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  status: string;      // new, read, resolved
  message: string;
  createdAt: string;
}