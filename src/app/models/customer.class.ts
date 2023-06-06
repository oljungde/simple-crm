export class Customer {
    customerId: string = '';
    name: string | undefined;
    street: string | undefined;
    zipCode: string | undefined;
    city: string | undefined;
    phone: string | undefined;
    homepage: string | undefined;
    email: string | undefined;


    public toJSON() {
        return {
            customerId: this.customerId,
            name: this.name,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            phone: this.phone,
            homepage: this.homepage,
            email: this.email,
        };
    }
}