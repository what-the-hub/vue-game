import { validatePassword } from '../helpers'

describe('test validatePassword function', () => {
  it('should return TRUE if password contains latin characters and numbers',
    function () {
      expect(validatePassword('Password123')).toBe(true)
    })
  it('should return FALSE if password contains not latin characters',
    function () {
      expect(validatePassword('Пароль123')).toBe(false)
    })
  it('should return FALSE if string contains only special characters',
    function () {
      expect(validatePassword('---------')).toBe(false)
    })
  it('should return FALSE if string length less 8 ch',
    function () {
      expect(validatePassword('Psdf24')).toBe(false)
    })
  it('should return FALSE if string length more 32 ch',
    function () {
      expect(validatePassword(
        'Ppppppppppp1111111111lllllllllllllllll333333333333'
      )).toBe(false)
    })
})
