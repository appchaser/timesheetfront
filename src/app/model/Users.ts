export class User{
    id:any
    username:any;
    email:any;

  password:any;

  roles:Role[]
 // roles: { id: number; name: string; }[];

}

export interface Role {
  id: any;
  name: any;
}
