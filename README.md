# 📦yh-validator
[![npm version](https://img.shields.io/npm/v/yh-validator.svg)](https://www.npmjs.com/package/yh-validator)
[![npm total downloads](https://img.shields.io/npm/dt/yh-validator.svg)](https://www.npmjs.com/package/yh-validator)
[![license](https://img.shields.io/npm/l/yh-validator.svg)](https://github.com/huntergera/yh-validator/main/LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/huntergera/yh-validator.svg?logo=github&style=flat&colorB=blue)](https://github.com/huntergera/yh-validator/stargazers)

A lightweight, modular form validation library written in **TypeScript**, designed to be framework-agnostic and easy to use in any JavaScript or TypeScript project.

---

## 🚀 Features

- 📧 Email validation
- 📞 International phone number validation (with country support)
- 🔐 Configurable password strength validation
- 👤 Flexible username validation
- ↔️ Equality comparison for objects and arrays
- 💳 Credit card number validation
- 🌐 URL validation using built-in URL constructor
- 📅 Validate Date Format
- 🛠 Modular structure — import only what you need
- 📦 Lightweight and dependency-minimized
- 🔐 TypeScript-first with full type safety

---

## 📦 Installation

```
npm install yh-validator
```
or
```
yarn add yh-validator
```

## ⚠️ Tree-shaking notice
To ensure optimal bundle size, import validators directly from their paths, for example:
```ts
import { isEmail } from "yh-validator/isEmail";
import { isPhone } from "yh-validator/isPhone";
import { isStrongPassword } from "yh-validator/isStrongPassword";
```

## ✨ Usage
### 📧 Validate Email
```ts
import { isEmail } from 'yh-validator/isEmail';

console.log(isEmail('test@example.com')); // true
console.log(isEmail('invalid-email'));    // false
```

### 📞 Validate Phone Number
```ts
import { isPhone } from 'yh-validator/isPhone';

// With international format
console.log(isPhone('+380961234567')); // true

// With country code
console.log(isPhone('0961234567', 'UA')); // true

// Invalid
console.log(isPhone('12345')); // false
```

### 🔐 Validate Password Strength
The `isStrongPassword` function returns an object containing `valid: boolean` and an `errors: string[]` array, providing detailed feedback on why a password might not meet the criteria.
```ts
import { isStrongPassword } from 'yh-validator/isStrongPassword';

// Basic usage with default options (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
const result1 = isStrongPassword('StrongP@ss1');
console.log(result1.valid);   // true
console.log(result1.errors);  // []

// Password missing required elements
const result2 = isStrongPassword('weakpassword');
console.log(result2.valid);   // false
console.log(result2.errors);  // ["Password must contain at least 1 uppercase letter(s).", "Password must contain at least 1 number(s).", "Password must contain at least 1 special character(s)."]

// Custom options
const result3 = isStrongPassword('simple123', {
  minLength: 6,
  minUppercase: 0,
  minLowercase: 0,
  minNumbers: 1,
  minSpecialChars: 0,
});
console.log(result3.valid);   // true
console.log(result3.errors);  // [] (valid based on custom relaxed rules)

const result4 = isStrongPassword('tooShort', { minLength: 10 });
console.log(result4.valid);   // false
console.log(result4.errors);  // ["Password must be at least 10 characters long."]
```

### 👤 Validate Username
The `isUsername` function provides configurable rules for validating usernames, returning a detailed result object.
```ts
import { isUsername } from 'yh-validator/isUsername';

// Basic usage with default options (min 3, max 30, alphanumeric, dashes, underscores, periods allowed)
const result1 = isUsername('john_doe123');
console.log(result1.valid);  // true
console.log(result1.errors); // []

// Username too short
const result2 = isUsername('ab');
console.log(result2.valid);  // false
console.log(result2.errors[0]); // ["Username must be at least 3 characters long."]

// Username with disallowed characters (e.g., !)
const result3 = isUsername('user!name');
console.log(result3.valid);  // false
console.log(result3.errors[0]); // ["Username contains disallowed characters."]

// Custom options: allow spaces, longer minLength, specific blacklist
const result4 = isUsername('My User Name', { 
  minLength: 5, 
  allowSpaces: true, 
  blacklist: ['admin', 'guest'] 
});
console.log(result4.valid);  // true
console.log(result4.errors); // []

// Custom options: check against a specific blacklist
const result5 = isUsername('admin', { blacklist: ['admin', 'root'] });
console.log(result5.valid);  // false
console.log(result5.errors); // ["Username is reserved or not allowed."]
```

### ↔️ Equality Comparison
```ts
import { isEqual } from 'yh-validator/isEqual';

console.log(isEqual('hello', 'hello')); // true
```

### 💳 Credit card number validation
```ts
import { isCreditCard } from 'yh-validator/isCreditCard';

console.log(isCreditCard('4111 1111 1111 1111')); // true
console.log(isCreditCard('1234 5678 9012 3456')); // false
```

### 🌐 Validate URL
```ts
import { isUrl } from 'yh-validator/isUrl';

console.log(isUrl('https://example.com')); // true
console.log(isUrl('ftp://ftp.site.net'));  // true
console.log(isUrl('not a url'));           // false
console.log(isUrl(12345));                 // false
```

### 📅 Validate Date Format
Supports 3 common formats:
- `DD/MM/YYYY`
- `MM-DD-YYYY`
- `YYYY.MM.DD`
```ts
import { isDate } from 'yh-validator/isDate';

console.log(isDate('25/12/2020')); // true
console.log(isDate('12-25-2020')); // true
console.log(isDate('2020.12.25')); // true
console.log(isDate('32/01/2022')); // false
console.log(isDate('2020/12.25')); // false
```

## 🧩 Integration with Schema Validation Libraries
You can easily integrate `yh-validator` functions with popular schema validation libraries like `Zod`, `Yup` and others using their custom validation methods. These libraries typically allow you to define custom validation rules that return a boolean (valid/invalid) or throw an error with a custom message.

### Integrating with Zod
(You'll need to install `zod`: `npm install zod`)
```ts
import { z } from 'zod';
import { isEmail } from 'yh-validator/isEmail';
import { isStrongPassword } from 'yh-validator/isStrongPassword';

export const registrationSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  
  email: z.string()
    .min(1, 'Email is required')
    .refine((value) => isEmail(value), 'Enter a valid email address'),
  
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long." }) // Base Zod length check
    .refine((value) => {
      // Use isStrongPassword to check complexity
      const result = isStrongPassword(value);
      return result.valid; // Zod's .refine expects a boolean
    }, (value) => {
      // If validation fails, Zod calls this function to get the error message.
      // Re-run isStrongPassword to get the detailed errors to display.
      const result = isStrongPassword(value); 
      return { message: result.errors[0] || "Password is not strong enough." };
    }),
});
```

### Integrating with Yup
(You'll need to install `yup`: `npm install yup`)
```ts
import * as yup from 'yup';
import { isEmail } from 'yh-validator/isEmail';
import { isStrongPassword } from 'yh-validator/isStrongPassword';

export const userProfileSchema = yup.object().shape({
  email: yup.string()
    .required('Email is required.')
    .test(
      'is-valid-email', 
      'Please enter a valid email address.', 
      (value) => value ? isEmail(value) : false
    ),
  
  password: yup.string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters long (base check).') // Optional: you can add a base length measurement Yup
    .test(
      'is-strong-password', 
      '', // Empty string as message, we will generate dynamic message
      function (value) {
        if (!value) return false; // Handle empty/null values if not caught by .required()

        const result = isStrongPassword(value, {
          minLength: 8, // Ensure this matches or is greater than Yup's .min()
          minUppercase: 1,
          minLowercase: 1,
          minNumbers: 1,
          minSpecialChars: 1,
        });
        
        if (!result.valid) {
          // If validation fails, use this.createError to provide detailed message
          return this.createError({ message: result.errors[0] || "Password is not strong enough." });
        }
        return true; // Password is strong
      }
    ),
});
```

## 📘 API Reference

| Function             | Description                                                                                                 | Return Type                       |
|----------------------|-------------------------------------------------------------------------------------------------------------|-----------------------------------|
| `isEmail(email)`     | Validate email address                                                                                      | `boolean`                         |
| `isPhone(phone, countryCode?)` | Validate international phone number, `countryCode (optional)` - ISO 2-letter country code (e.g., "US", "UA") | `boolean`                         |
| `isStrongPassword(password, options?)` | Check password strength                                                                                     | `{ valid: boolean; errors: string[] }` |
| `isUsername(username, options?)` | Validate username with custom rules                                                                         | `{ valid: boolean; errors: string[] }` |
| `isEqual(a, b)`      | Equality check between two values                                                                           | `boolean`                         |
| `isCreditCard(card)`      | Validates credit card number using Luhn algo                                                                           | `boolean`                         |
| `isUrl(input)`     | Validates if string is a valid URL using `URL()` constructor                                                                           | `boolean`                         |
| `isDate(date)`     | Validates if the input is a valid date string in one of the supported formats| `boolean`                         |


`isEmail(email: string): boolean`

Validates whether the string is a well-formed email address.

`isPhone(phoneNumber: string, countryCode?: string): boolean`

Validates international phone numbers. If no `countryCode` is provided, assumes the number starts with `+`.

`phoneNumber` — phone string to validate

`countryCode` — (optional) ISO 2-letter country code (e.g. `"US"`, `"UA"`)

Internally uses the [`phone`](https://www.npmjs.com/package/phone) library.

`isStrongPassword(password: string, options?: PasswordValidationOptions): PasswordValidationResult`

Validates the strength of a password based on configurable criteria.
- `password` (string): The password string to validate.
  - `options` (object, optional): An object to customize validation criteria.
  - `minLength` (number): Minimum total length of the password (default: 8).
  - `minUppercase` (number): Minimum number of uppercase letters (default: 1).
  - `minLowercase` (number): Minimum number of lowercase letters (default: 1).
  - `minNumbers` (number): Minimum number of digits (default: 1).
  - `minSpecialChars` (number): Minimum number of special characters (default: 1).
- Returns: `PasswordValidationResult` - An object `{ valid: boolean; errors: string[] }`.
  - `valid:` true if the password meets all criteria, false otherwise.
  - `errors:` An array of strings, each describing a failed validation criterion.

`PasswordValidationOptions` Interface:
```ts
interface PasswordValidationOptions {
    minLength?: number;       // Default: 8
    minUppercase?: number;    // Default: 1
    minLowercase?: number;    // Default: 1
    minNumbers?: number;      // Default: 1
    minSpecialChars?: number; // Default: 1
}
```
`PasswordValidationResult` Interface:
```ts
interface PasswordValidationResult {
    valid: boolean;   // True if all validation rules passed
    errors: string[]; // Array of error messages if validation failed
}
```
`isUsername(username: string, options?: UsernameValidationOptions): UsernameValidationResult`
Validates a username based on configurable criteria, including length, allowed characters, and format.
- `username` (string): The username string to validate.
- `options` (object, optional): An object to customize validation criteria.
  - `minLength` (number): Minimum total length of the username `(default: 3)`.
  - `maxLength` (number): Maximum total length of the username `(default: 30)`.
  - `allowSpaces` (boolean): Allow spaces within the username `(default: false)`.
  - `allowDashes` (boolean): Allow hyphens - `(default: true)`.
  - `allowUnderscores` (boolean): Allow underscores _ `(default: true)`.
  - `allowPeriods` (boolean): Allow periods . `(default: true)`.
  - `noLeadingTrailingSpecialChars` (boolean): Disallow special characters or spaces at the start or end `(default: true).
  - `noConsecutiveSpecialChars` (boolean): Disallow two or more consecutive special characters like -- or __ `(default: true)`.
  - `blacklist` (string[]): An array of usernames that are explicitly disallowed (case-insensitive) `(default: [])`.
- Returns: `UserNameValidationResult` - An object `{ valid: boolean; errors: string[] }`.
  - valid: true if the userName meets all criteria, false otherwise.
  - errors: An array of strings, each describing a failed validation criterion.
  
`UserNameValidationOptions` Interface:
```ts
interface UserNameValidationOptions {
  minLength?: number;
  maxLength?: number;
  allowSpaces?: boolean;
  allowDashes?: boolean;
  allowUnderscores?: boolean;
  allowPeriods?: boolean;
  noLeadingTrailingSpecialChars?: boolean;
  noConsecutiveSpecialChars?: boolean;
  blacklist?: string[];
}
```
`UserNameValidationResult` Interface:
```ts
interface UserNameValidationResult {
  valid: boolean;
  errors: string[];
}
```
`isEqual(a: string, b: string): boolean`
- `a (string)`: The first value to compare.
- `b (string)`: The second value to compare.
- Returns: boolean - true if the two values are equal, false otherwise.

`isUrl(input: unknown): boolean`

Validates whether the input is a valid URL using the built-in URL constructor.

## 🧪 Running Tests
```
npm test
```
Uses Vitest for unit testing.

## 📁 Project Structure
```
src/
├── isCreditCard.ts         # Credit Card number validator
├── isEmail.ts              # Email validator
├── isEqual.ts              # equality comparison
├── isPhone.ts              # Phone validator
├── isStrongPassword.ts     # Password validator
├── isUsername.ts           # userName validator
├── isUrl.ts                # URL validator
├── isDate.ts               # Date validator
└── index.ts                # Exports

tests/
├── creditCard.test.ts
├── email.test.ts
├── isEqual.test.ts
├── password.test.ts
├── phone.test.ts
├── url.test.ts
└── username.test.ts
```

## ❓ Why this exists
There are many username validation libraries — but most either:
- lack of flexibility in character rules,
- don’t support Formik/Yup integration well,
- or don’t support things like blacklists or special character positioning.

yh-validator was built to provide strict, customizable username validation with minimal dependencies — usable in modern React forms or plain JavaScript.

## 📄 License
MIT
This project is licensed under the [MIT License](https://github.com/huntergera/yh-validator/blob/master/LICENSE).

## 📫 Contact
Feel free to reach out if you have suggestions or need help integrating this package.

GitHub: [@huntergera](https://github.com/huntergera)

Email: [yuriihieorhiu@gmail.com](mailto:yuriihieorhiu@gmail.com)