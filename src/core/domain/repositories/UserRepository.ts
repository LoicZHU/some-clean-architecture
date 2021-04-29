import {User} from "../entities/User";

export interface UserRepository {
    create(user: User): User;
    getByLastname(lastname: string): User;
    updateFirstname(lastname: string, newFirstname: string): User;
    deleteByLastname(lastname: string): boolean;
}
