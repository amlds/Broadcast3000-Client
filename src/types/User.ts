export default interface User {
  user: {
    id?: number;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    school?: string;
  }
}
