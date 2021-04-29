import {Usecase} from "../domain/models/Usecase";
import {User} from "../domain/entities/User";
import {UserRepository} from "../domain/repositories/UserRepository";

interface CreateUserCommand {
    firstname: string;
    lastname: string;
}

export class CreateUser implements Usecase<CreateUserCommand, User> {
    constructor(private readonly _userRepository: UserRepository) {
    }

    execute(request: CreateUserCommand): User {
        const user = new User({
            firstname: request.firstname,
            lastname: request.lastname
        })

        return this._userRepository.create(user);
    }
}
