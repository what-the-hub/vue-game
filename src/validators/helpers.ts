const passRegx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,32}$/

export function validatePassword (password: string) {
  return password.length === 0 || passRegx.test(password)
}
