class CustomerContact {
    contactId: string = '';
    customerRef: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    phone: string | undefined;
    email: string | undefined;
    position: string | undefined;


    constructor(obj?: any) {
        this.contactId = obj ? obj.contactId : '';
        this.customerRef = obj ? obj.customerRef : '';
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.phone = obj ? obj.phone : '';
        this.email = obj ? obj.email : '';
        this.position = obj ? obj.position : '';
    }


    public toJSON() {
        return {
            contactId: this.contactId,
            customerRef: this.customerRef,
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
            email: this.email,
            position: this.position
        };
    }
}