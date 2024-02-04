import {Controller, Post, Body} from "@nestjs/common";
import {User} from "src/entities/user.entity";
import {AuthService} from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(
    @Body() {user}: {user: User},
  ): Promise<{user: User} | {errors?: string[]}> {
    return await this.authService.register(user);
  }
}
