export class User{
    id:any
    username:any;
    email:string;

  password:any;

  roles:Role[]
 // roles: { id: number; name: string; }[];

}

export interface Role {
  id: number;
  name: string;
}
