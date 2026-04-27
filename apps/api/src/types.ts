export type JwtUser = {
  sub: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "WORKER";
};
