export interface RoleResponse {
  totalRecordsRoles: number;
  roles:             Role[];
  previusPage:       null;
  currentPage:       string;
  nextPage:          string;
  limit:             number;
  skip:              number;
}

export interface Role {
  _id?:         string;
  name:        string;
  description: string;
  isActive?:    boolean;
  createdAt?:   Date;
  updatedAt?:   Date;
}
