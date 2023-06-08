export class Customer {
    customerId: string = '';
    name: string | undefined;
    street: string | undefined;
    zipCode: string | undefined;
    city: string | undefined;
    phone: string | undefined;
    homepage: string | undefined;
    email: string | undefined;


    constructor(obj?: any) {
        this.customerId = obj ? obj.customerId : '';
        this.name = obj ? obj.name : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.phone = obj ? obj.phone : '';
        this.homepage = obj ? obj.homepage : '';
        this.email = obj ? obj.email : '';
    }


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