export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  propertiesId?: string[];
  contractsId?: string[];
  rawPassword?: string;
}

export interface Property {
  id?: string;
  ownerId?: string;
  housingType?: HousingType;
  location?: Location;
  description?: string;
  bedAmount?: number;
  squareFootage?: number;
  pricePerDay?: number;
}

export enum HousingType {
  house,
  flat,
}

export interface Location {
  country: string;
  city: string;
  zipCode?: number;
  street: string;
  number: number;
}

export interface Contract {
  id?: string;
  ownerId: string;
  tenantId: string;
  startingDate: Date;
  endingDate: Date;
  propertyId: string;
}

export interface Auth {
  email: string;
  password: string;
}
