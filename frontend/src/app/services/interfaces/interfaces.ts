export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  propertiesId?: string[];
  contractsId?: string[];
  rawPassword?: string;
  isAdmin?: boolean;
}

export interface Rating {
  value?: number;
  amount?: number;
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
  isListed?: boolean;
  isSelected?: boolean; //? for frontend behavior nly
  services?: string[];
  constraints?: string[];
  rating?: Rating;
}

export enum HousingType {
  house,
  flat,
}

export interface Location {
  country: string;
  city: string;
  street: string;
  number: number;
}

export interface Contract {
  id?: string;
  ownerId?: string;
  tenantId?: string;
  checkInDate?: string;
  checkOutDate?: string;
  propertyId?: string;
  isAccepted?: boolean;
  rating?: number;
}

export interface RichContract {
  id?: string;
  ownerId?: string;
  tenantId?: string;
  checkInDate?: string;
  checkOutDate?: string;
  propertyId?: string;
  isAccepted?: boolean;
  rating?: number;
  isUserThePropertyOwner?: boolean;
  otherUser?: User;
  property?: Property;
}

export interface Auth {
  email: string;
  password: string;
}

export interface Alert {
  isError?: boolean;
  content?: string;
}
