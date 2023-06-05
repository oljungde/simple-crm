export class Customer {
    name: string | undefined;
    street: string | undefined;
    zipCode: string | undefined;
    city: string | undefined;
    homepage: string | undefined;
    email: string | undefined;
    contacts: Array<any> | undefined;
    

    public toJSON() {
        return {
            name: this.name,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            homepage: this.homepage,
            email: this.email,
            contacts: this.contacts,
        };
    }
}