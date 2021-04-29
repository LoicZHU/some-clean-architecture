import {Usecase} from "../domain/models/Usecase";
import {User} from "../domain/entities/User";
import {UserRepository} from "../domain/repositories/UserRepository";

interface GetByLastnameCommand {
    lastname: string;
}

export class GetByLastname implements Usecase<GetByLastnameCommand, User> {
    constructor(private readonly _userRepository: UserRepository) {
    }

    execute(request: GetByLastnameCommand): User {
        return this._userRepository.getByLastname(request.lastname);
    }
}
