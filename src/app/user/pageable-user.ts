import {User} from './user';

export interface PageableUser {

  content: User[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  first: boolean;
  sort: string;
}
