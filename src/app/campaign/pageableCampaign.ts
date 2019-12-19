import {Campaign} from "./campaign";

export class PageableCampaign {

  content: Campaign[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  first: boolean;
  sort: string;
}
