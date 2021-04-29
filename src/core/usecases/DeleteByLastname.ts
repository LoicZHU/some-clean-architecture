import {Usecase} from "../domain/models/Usecase";
import {UserRepository} from "../domain/repositories/UserRepository";

interface DeleteByLastnameCommand {
    lastname: string;
}

interface DeleteByLastnameResponse {
    deleted: boolean;
}

export class DeleteByLastname implements Usecase<DeleteByLastnameCommand, DeleteByLastnameResponse> {
    constructor(private readonly _userRepository: UserRepository) {
    }

    execute(request?: DeleteByLastnameCommand): DeleteByLastnameResponse {
        if (request && request.lastname.trim() !== '') {
            return {deleted: this._userRepository.deleteByLastname(request.lastname)};
        } else {
            throw new Error('Error! Missing {lastname: string} parameter.');
        }
    }
}
