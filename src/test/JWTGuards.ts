import { AuthGuard } from "@nestjs/passport";

export class JWTGUard extends AuthGuard('jwt'){}