import { User } from "next-auth";

export interface AuthenticatedUser extends User {
  accessToken?: string,
  refreshToken?: string,
}