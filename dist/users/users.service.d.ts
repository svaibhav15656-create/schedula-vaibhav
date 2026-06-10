import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    create(user: Partial<User>): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}
