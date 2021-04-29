interface UserProperties {
    firstname: string;
    lastname: string;
}

export class User {
    props: UserProperties;

    constructor(
        userProperties: UserProperties
    ) {
        this.props = userProperties;
    }

}
