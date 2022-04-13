export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  propertiesId?: string[];
  contractsId?: string[];
  rawPassword?: string;
}

export interface Auth {
  email: string;
  password: string;
}
