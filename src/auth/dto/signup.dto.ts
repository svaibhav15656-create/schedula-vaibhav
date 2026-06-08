import { UserRole } from "src/users/user-role.enum";

export class SignupDto {
  name!: string;
  email!: string;
  password!: string;
  role!: UserRole;
}