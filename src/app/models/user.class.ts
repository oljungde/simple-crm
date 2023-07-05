export class User {
  userId: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  team: string | undefined;
  fullName: string | undefined;


  constructor(obj?: any) {
    this.userId = obj ? obj.userId : '';
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.team = obj ? obj.team : '';
    this.fullName = obj ? obj.fullName : '';
  }


  public toJSON() {
    return {
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      team: this.team,
      fullName: this.firstName + ' ' + this.lastName,
    };
  }
}