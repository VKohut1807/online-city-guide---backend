import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "src/entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(user: User): Promise<{user: User} | {errors?: string[]}> {
    const errors: string[] = [];

    if (!user.username) {
      errors.push("Username is required.");
    }

    if (!user.email) {
      errors.push("Email is required.");
    }

    if (!user.password) {
      errors.push("Password is required.");
    }
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const existingUser = await this.userRepository.findOne({
      where: [{username: user?.username}, {email: user?.email}],
    });

    if (existingUser) {
      errors.push("User with this username or email already exists.");
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);

    return {user: newUser};
  }
}
