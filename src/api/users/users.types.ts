export interface GetUsersResponse {
  info: InfoData;
  results: Data[];
}

export interface InfoData {
  page: number;
  results: number;
  seed: string;
  version: string;
}

export interface Data {
  cell: string;
  dob: DobData;
  email: string;
  gender: Gender;
  id: IdData;
  location: LocationData;
  login: LoginData;
  name: Name;
  nat: string;
  phone: string;
  picture: PictureData;
  registered: RegisteredData;
}

export interface DobData {
  age: number;
  date: string;
}

export interface IdData {
  name: string;
  value: string;
}
export interface LocationData {
  city: string;
  coordinates: { latitude: string; longitude: string };
  country: string;
  postcode: number;
  state: string;
  street: { number: number; name: string };
  timezone: { description: string; offset: string };
}

export interface LoginData {
  md5: string;
  password: string;
  salt: string;
  sha1: string;
  sha256: string;
  username: string;
  uuid: string;
}

export interface Name {
  first: string;
  last: string;
  title: string;
}

export interface PictureData {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface RegisteredData {
  age: number;
  date: string;
}

export type Gender = "female" | "male";
