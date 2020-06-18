import {Advertiser} from './advertiser';

export interface PageableAdvertiser {

  content: Advertiser[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  first: boolean;
  sort: string;
}
