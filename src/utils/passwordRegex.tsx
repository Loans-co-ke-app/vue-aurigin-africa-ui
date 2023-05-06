/**
 * Password Regex
 */
const passwordRegex1 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
/**
 * Password Regex with
 * 1. At least 1 uppercase letter
 * 2. At least 1 lowercase letter
 * 3. At least 1 number
 * 4. At least 8 characters long
 * 5. At least 1 special character
 */
const passwordRegex2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
/**
 * Password Regex with
 * 1. At least 1 uppercase letter
 * 2. At least 1 lowercase letter
 * 3. At least 1 number
 * 4. At least 1 special character
 * 5. At least 8 characters long
 * 6. At most 32 characters long
 * 
 */
const passwordRegex = new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*-()])(?=.{8,32})/, 'g');

export { passwordRegex1, passwordRegex2, passwordRegex}
