import { IUser } from "./user";

export interface IBaseEntity {
  id?: string;
  created?: string;
  edited?: string;
  createdBy?: IUser;
  editedBy?: IUser;
  isDirty?: boolean;
  properties?: IProperty[];
}

export interface IProperty {
  key: string;
  value: string;
}
