export interface Kid {
    id?: string;
    name?: string;
    birth?: number;
    login?: string;
    password?: string;
    parentId?: string;
    heroId?: number;
    badges?: Array<boolean>;
  }