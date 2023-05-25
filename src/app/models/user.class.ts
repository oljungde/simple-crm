export class User {
    firstName: string | undefined;
    lastName: string | undefined;
    birthDate: number | undefined;
    street: string | undefined;
    postalCode: number | undefined;
    city: string | undefined;


    constructor(obj?: any) {
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.birthDate = obj ? obj.birthDate : '';
    this.street = obj ? obj.street : '';
    this.postalCode = obj ? obj.postalCode : '';
    this.city = obj ? obj.city : '';
    }


    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            street: this.street,
            postalCode: this.postalCode,
            city: this.city
        };
    }
}