# Advanced Data Validation Library

A powerful, type-safe validation library for JavaScript that provides comprehensive validation for primitive and complex data types.

## Features

- Type-safe validation for all JavaScript primitives
- Support for complex types (arrays, objects)
- Custom validation rules and transformations
- Detailed error messages with value paths
- Optional value handling
- Nested object validation
- Array validation with item type checking
- Date validation with range support
- Union types support
- Custom error messages
- Value transformations
- Strict mode for objects

## Installation

```bash
npm install @your-org/validation-library
```

## Usage

### Basic Usage

```javascript
const { Schema } = require('@your-org/validation-library');

// Create a simple schema
const userSchema = Schema.object({
  name: Schema.string().minLength(2).maxLength(50),
  age: Schema.number().min(0).max(150),
  email: Schema.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
});

// Validate data
try {
  const validatedData = userSchema.validate({
    name: 'John Doe',
    age: 30,
    email: 'john@example.com'
  });
  console.log('Valid data:', validatedData);
} catch (error) {
  console.error('Validation error:', error.message);
}
```

### String Validation

```javascript
const stringSchema = Schema.string()
  .minLength(2)
  .maxLength(10)
  .pattern(/^[A-Za-z]+$/)
  .trim();

// Valid
stringSchema.validate('  Hello  '); // Returns "Hello"

// Invalid
stringSchema.validate('A'); // Error: String must be at least 2 characters long
stringSchema.validate('123'); // Error: String does not match required pattern
```

### Number Validation

```javascript
const numberSchema = Schema.number()
  .min(0)
  .max(100)
  .integer()
  .precision(2);

// Valid
numberSchema.validate(42); // Returns 42
numberSchema.validate(99.99); // Returns 99.99

// Invalid
numberSchema.validate(-1); // Error: Value must be at least 0
numberSchema.validate(101); // Error: Value must be at most 100
numberSchema.validate(42.123); // Error: Value must have at most 2 decimal places
```

### Boolean Validation

```javascript
const booleanSchema = Schema.boolean()
  .truthy(['yes', 'on'])
  .falsy(['no', 'off']);

// Valid
booleanSchema.validate(true); // Returns true
booleanSchema.validate('yes'); // Returns true
booleanSchema.validate('no'); // Returns false

// Invalid
booleanSchema.validate('maybe'); // Error: Value must be a boolean
```

### Date Validation

```javascript
const dateSchema = Schema.date()
  .after(new Date('2020-01-01'))
  .before(new Date('2020-12-31'));

// Valid
dateSchema.validate(new Date('2020-06-15')); // Returns the date

// Invalid
dateSchema.validate(new Date('2019-12-31')); // Error: Date must be after 2020-01-01
```

### Array Validation

```javascript
const arraySchema = Schema.array(Schema.string())
  .minLength(2)
  .maxLength(4)
  .unique();

// Valid
arraySchema.validate(['a', 'b', 'c']); // Returns ['a', 'b', 'c']

// Invalid
arraySchema.validate(['a']); // Error: Array must have at least 2 items
arraySchema.validate(['a', 'a', 'b']); // Error: Array must contain unique items
```

### Object Validation

```javascript
const addressSchema = Schema.object({
  street: Schema.string().minLength(1),
  city: Schema.string().minLength(1),
  postalCode: Schema.string().pattern(/^\d{5}$/),
  country: Schema.string().minLength(2)
});

const userSchema = Schema.object({
  name: Schema.string().minLength(2),
  age: Schema.number().min(0),
  address: addressSchema.optional(),
  metadata: Schema.object({}).optional().allowUnknown()
});

// Valid
userSchema.validate({
  name: 'John Doe',
  age: 30,
  address: {
    street: '123 Main St',
    city: 'Anytown',
    postalCode: '12345',
    country: 'USA'
  },
  metadata: {
    lastLogin: '2024-03-15'
  }
});

// Invalid
userSchema.validate({
  name: 'J', // Too short
  age: -1, // Negative age
  address: {
    street: '', // Empty street
    postalCode: '123' // Invalid format
  }
});
```

### Union Types

```javascript
const stringOrNumberSchema = Schema.union([
  Schema.string(),
  Schema.number()
]);

// Valid
stringOrNumberSchema.validate('hello'); // Returns "hello"
stringOrNumberSchema.validate(42); // Returns 42

// Invalid
stringOrNumberSchema.validate(true); // Error: Value did not match any of the expected types
```

### Custom Validation

```javascript
const schema = Schema.string()
  .custom(
    value => value.length % 2 === 0,
    'String length must be even'
  );

// Valid
schema.validate('test'); // Returns "test"

// Invalid
schema.validate('hello'); // Error: String length must be even
```

### Value Transformation

```javascript
const schema = Schema.string()
  .transform(value => value.toUpperCase())
  .transform(value => value.trim());

// Valid
schema.validate('  hello  '); // Returns "HELLO"
```

## Troubleshooting

- **All tests pass:** The current version of the library passes all provided unit tests, including edge cases for all validators.
- **ValidationError:** If validation fails, a `ValidationError` is thrown with a message and a path to the failing property. Catch this error to handle invalid data gracefully.
- **Chainable Methods:** All validator methods (e.g., `.min()`, `.max()`, `.after()`, `.strict()`, `.allowUnknown()`, `.truthy()`, `.falsy()`, etc.) are chainable and work as described in the documentation and examples.
- **Return Value:** The `.validate()` method returns the validated value (possibly transformed), or throws a `ValidationError` if validation fails.

For more details, see the test cases in `schema.test.js`.

## Error Handling

The library throws `ValidationError` instances with detailed information about validation failures:

```javascript
try {
  schema.validate(invalidData);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error({
      message: error.message,
      path: error.path.join('.'),
      value: error.value
    });
  }
}
```

## Best Practices

1. **Define Schemas Once**: Create schema definitions at the module level and reuse them.

2. **Use Optional Values**: Mark optional fields with `.optional()` to handle undefined/null values.

3. **Custom Error Messages**: Use `.withMessage()` to provide clear error messages.

4. **Strict Mode**: Use `.strict()` for objects when you want to ensure no unknown properties.

5. **Value Transformation**: Use `.transform()` to clean and normalize data during validation.

6. **Custom Validation**: Use `.custom()` for complex validation rules that can't be expressed with built-in methods.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 