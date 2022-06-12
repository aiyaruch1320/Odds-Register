export interface User {
  id: String,
  firstName: String,
  lastName: String,
  sex: String,
  birthDate: Date,
  tel: String,
  email: String,
  password: String
}

export interface UserRes {
  id: String,
  firstName: String,
  lastName: String,
  sex: String,
  birthDate: Date,
  tel: String,
  email: String,
  password: String,
  statusAccount: Boolean
}

export interface Pin{
  id: String,
  pin: String,
  uid: String,
  expireDate: Date
}
