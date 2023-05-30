export class User {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    team: string | undefined;
    shortName: string | undefined;
    

    constructor(obj?: any) {
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.team = obj ? obj.team : '';
    this.shortName = obj ? obj.shortName : '';
    }


    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            team: this.team,
            shortName: this.shortName,
        };
    }
}