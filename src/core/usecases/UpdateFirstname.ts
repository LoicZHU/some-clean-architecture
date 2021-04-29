import {Usecase} from "../domain/models/Usecase";
import {User} from "../domain/entities/User";
import {UserRepository} from "../domain/repositories/UserRepository";

interface UpdateFirstnameCommand {
    lastname: string,
    newFirstname: string
}

export class UpdateFirstname implements Usecase<UpdateFirstnameCommand, User> {
    constructor(private readonly _userRepository: UserRepository) {
    }

    execute(request: UpdateFirstnameCommand): User {
        return this._userRepository.updateFirstname(request.lastname, request.newFirstname);
    }
}