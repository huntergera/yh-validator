# 🔍yh-validator

A lightweight, modular form validation library written in **TypeScript**, designed to be framework-agnostic and easy to use in any JavaScript or TypeScript project.

---

## 🚀 Features

- ✅ Email validation
- 📞 International phone number validation (with country support)
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

## ✨ Usage
### ✅ Validate Email
```
import { validateEmail } from 'yh-validator';

console.log(validateEmail('test@example.com')); // true
console.log(validateEmail('invalid-email'));    // false
```

### 📞 Validate Phone Number
```
import { validatePhone } from '@your-scope/validator-lib';

// With international format
console.log(validatePhone('+380961234567')); // true

// With country code
console.log(validatePhone('0961234567', 'UA')); // true

// Invalid
console.log(validatePhone('12345')); // false
```

## 📘 API Reference
`validateEmail(email: string): boolean`

Validates whether the string is a well-formed email address.

`validatePhone(phoneNumber: string, countryCode?: string): boolean`

Validates international phone numbers. If no `countryCode` is provided, assumes the number starts with `+`.

`phoneNumber` — phone string to validate

`countryCode` — (optional) ISO 2-letter country code (e.g. `"US"`, `"UA"`)

## 🧪 Running Tests
```
npm test
```
Uses Vitest for unit testing.

## 📁 Project Structure
```
src/
├── email.ts       # Email validator
├── phone.ts       # Phone validator
└── index.ts       # Exports

tests/
├── email.test.ts
└── phone.test.ts
```

## 📄 License
MIT


## 📫 Contact
Feel free to reach out if you have suggestions or need help integrating this package.

GitHub: [@huntergera](https://github.com/huntergera)

Email: [yuriihieorhiu@gmail.com](mailto:yuriihieorhiu@gmail.com)

