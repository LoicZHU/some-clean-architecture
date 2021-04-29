import {CreateUser} from "../core/usecases/CreateUser";
import {UserRepository} from "../core/domain/repositories/UserRepository";
import {InMemoryUserRepository} from "../adapters/repositories/InMemoryUserRepository";
import {GetByLastname} from "../core/usecases/GetByLastname";
import {DeleteByLastname} from "../core/usecases/DeleteByLastname";
import {UpdateFirstname} from "../core/usecases/UpdateFirstname";

describe('User unit testing, from Create to Delete', () => {
    let userRepository: UserRepository;

    beforeAll(() => {
        userRepository = new InMemoryUserRepository()
    })

    it('Should create a user', () => {
        const createUser = new CreateUser(userRepository).execute({
            firstname: 'John',
            lastname: 'Doe'
        })
        expect(createUser.props.lastname).toEqual('Doe')
    })

    it('Should read a user based on his lastname', () => {
        const createUser = new CreateUser(userRepository).execute({
            firstname: 'Barack',
            lastname: 'Obama'
        })

        const getByLastname = new GetByLastname(userRepository).execute({lastname: 'Obama'});

        expect(getByLastname).toEqual(createUser);
    })

    it('Should throw an Error with message \'USER_NOT_FOUND\' if user does not exist', () => {
        const getByLastname = () => {
            return new GetByLastname(userRepository).execute({lastname: 'zzz'});
        }

       expect(() => getByLastname()).toThrow('USER_NOT_FOUND')
    })

    it('Should update user properties except the lastname', () => {
        new CreateUser(userRepository).execute({
            firstname: 'James',
            lastname: 'Bond'
        });

        const userUpdated = new UpdateFirstname(userRepository).execute({
            lastname: 'Bond',
            newFirstname: 'Tom'
        });

        expect(userUpdated.props.firstname).toEqual('Tom');
    })


    it('Should remove a user based on his lastname', () => {
        new CreateUser(userRepository).execute({
            firstname: 'James',
            lastname: 'Bond'
        });

        const deleteByLastName = new DeleteByLastname(userRepository).execute({lastname: 'Bond'});

        expect(deleteByLastName).toEqual({deleted: true});
    })

    it('Should throw error if trying to delete non existing user', () => {
        function deleteByLastName() {
            return new DeleteByLastname(userRepository).execute({lastname: 'zef'});
        }

        expect(() => deleteByLastName()).toThrow('USER_NOT_FOUND')
    })

    it('Should throw error if trying to delete without giving parameter', () => {
        function deleteByLastName() {
            return new DeleteByLastname(userRepository).execute();
        }

        expect(() => deleteByLastName()).toThrow('Error! Missing {lastname: string} parameter.')
    })
})
