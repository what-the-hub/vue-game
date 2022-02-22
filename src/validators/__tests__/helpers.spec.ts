import { validatePassword } from '../helpers'

describe('test validatePassword function', () => {
  it('should return TRUE for validatePassword("Password123")', function () {
    expect(validatePassword('Password123')).toBe(true)
  })
  it('should return FALSE for validatePassword("Пароль123")', function () {
    expect(validatePassword('Пароль123')).toBe(false)
  })
  it('should return FALSE for validatePassword(12 as number)', function () {
    // @ts-ignore
    expect(validatePassword(12)).toBe(false)
  })
  it('should return FALSE for validatePassword("---------")', function () {
    expect(validatePassword('---------')).toBe(false)
  })
  it('should return FALSE for validatePassword("Psdf24")', function () {
    expect(validatePassword('Psdf24')).toBe(false)
  })
  it('should return FALSE for validatePassword("string length more 32 char")', function () {
    expect(validatePassword(
      'Ppppppppppp1111111111lllllllllllllllll333333333333'
    )).toBe(false)
  })
  it('should return TRUE for validatePassword("1newPASSWORDnew3")', function () {
    expect(validatePassword('1newPASSWORDnew3')).toBe(true)
  })
})
