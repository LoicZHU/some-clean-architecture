import {UserRepository} from "../../core/domain/repositories/UserRepository";
import {User} from "../../core/domain/entities/User";

// https://medium.com/javascript-in-plain-english/how-maps-work-in-javascript-7c3d131aaad9

export class InMemoryUserRepository implements UserRepository {
    private readonly _userDb: Map<string, User>

    constructor(
    ) {
        this._userDb = new Map<string, User>();
    }

    create(user: User): User {
        this._userDb.set(user.props.lastname, user);
        return user;
    }

    getByLastname(lastname: string): User {
        const userFound = this._userDb.get(lastname);

        if (!userFound) {
            throw new Error('USER_NOT_FOUND');
        } else {
            return userFound;
        }
    }

    updateFirstname(lastname: string, newFirstname: string): User {
        const userFound = this.getByLastname(lastname);
        userFound.props.firstname = newFirstname;

        this._userDb.set(lastname, userFound);

        return this.getByLastname(lastname);
    }

    deleteByLastname(lastname: string): boolean {
        const userFound = this.getByLastname(lastname);

        if (this._userDb.delete(userFound.props.lastname)) {
            return true;
        } else {
            throw new Error('Error on: delete by lastname.');
        }
    }

}
