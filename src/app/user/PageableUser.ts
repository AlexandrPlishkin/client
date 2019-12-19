import {User} from "./user";

export class PageableUser {

  content: User[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  first: boolean;
  sort: string;
}
