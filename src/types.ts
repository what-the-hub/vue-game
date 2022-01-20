export interface UserInputData {
  email: string;
  password: string;
}

export interface Errors {
  emailEr: RegExpMatchArray | boolean;
  passwordEr: RegExpMatchArray | boolean;
}
