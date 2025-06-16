/**
 * Advanced Data Validation Library
 * Provides type-safe validation with enhanced features for primitive and complex data types
 */

/**
 * Custom error class for validation errors
 */
class ValidationError extends Error {
  constructor(message, path = '') {
    super(message);
    this.name = 'ValidationError';
    this.path = path;
  }
}

/**
 * Base validator class that all specific validators extend
 */
class Validator {
  constructor() {
    this.rules = [];
    this.transformations = [];
    this.isOptional = false;
    this.customMessage = null;
  }

  /**
   * Marks this validator as optional
   * @returns {Validator} Returns this validator for chaining
   */
  optional() {
    this.isOptional = true;
    return this;
  }

  /**
   * Sets a custom error message for validation failures
   * @param {string} message - The custom error message
   * @returns {Validator} Returns this validator for chaining
   */
  message(msg) {
    this.customMessage = msg;
    return this;
  }

  /**
   * Adds a transformation function to the validation chain
   * @param {Function} fn - Function to transform the value
   * @returns {Validator} Returns this validator for chaining
   */
  transform(fn) {
    this.transformations.push(fn);
    return this;
  }

  /**
   * Validates a value with all configured rules
   * @param {*} value - Value to validate
   * @param {string} path - The path to the value
   * @returns {Object} The validation result
   * @throws {ValidationError} If validation fails
   */
  validate(value, path = '') {
    if (this.isOptional && (value === undefined || value === null)) {
      return value;
    }

    for (const rule of this.rules) {
      const result = rule(value, path);
      if (!result.isValid) {
        throw new ValidationError(result.message, result.path);
      }
    }

    let transformedValue = value;
    for (const transform of this.transformations) {
      transformedValue = transform(transformedValue);
    }

    return transformedValue;
  }
}

/**
 * String validator with enhanced string-specific validation rules
 */
class StringValidator extends Validator {
  constructor() {
    super();
    this.rules.push((value, path) => {
      if (typeof value !== 'string') {
        return {
          isValid: false,
          message: this.customMessage || 'Value must be a string',
          path
        };
      }
      return { isValid: true };
    });
  }

  /**
   * Sets minimum length requirement for the string
   * @param {number} length - Minimum required length
   * @returns {StringValidator} Returns this validator for chaining
   */
  minLength(length) {
    this.rules.push((value, path) => {
      if (value.length < length) {
        return {
          isValid: false,
          message: this.customMessage || `String must be at least ${length} characters long`,
          path
        };
      }
      return { isValid: true };
    });
    return this;
  }

  /**
   * Sets maximum length requirement for the string
   * @param {number} length - Maximum allowed length
   * @returns {StringValidator} Returns this validator for chaining
   */
  maxLength(length) {
    this.rules.push((value, path) => {
      if (value.length > length) {
        return {
          isValid: false,
          message: this.customMessage || `String must be at most ${length} characters long`,
          path
        };
      }
      return { isValid: true };
    });
    return this;
  }

  /**
   * Sets a regex pattern the string must match
   * @param {RegExp} regex - Regular expression pattern
   * @returns {StringValidator} Returns this validator for chaining
   */
  pattern(regex) {
    this.rules.push((value, path) => {
      if (!regex.test(value)) {
        return {
          isValid: false,
          message: this.customMessage || 'String does not match required pattern',
          path
        };
      }
      return { isValid: true };
    });
    return this;
  }

  /**
   * Sets allowed enum values for the string
   * @param {string[]} values - Array of allowed values
   * @returns {StringValidator} Returns this validator for chaining
   */
  enum(values) {
    this.rules.push((value, path) => {
      if (!values.includes(value)) {
        return {
          isValid: false,
          message: this.customMessage || `Value must be one of: ${values.join(', ')}`,
          path
        };
      }
      return { isValid: true };
    });
    return this;
  }

  /**
   * Enables string trimming
   * @returns {StringValidator} Returns this validator for chaining
   */
  trim() {
    this.transformations.push(value => value.trim());
    return this;
  }
}

/**
 * Number validator with enhanced numeric validation rules
 */
class NumberValidator extends Validator {
  constructor() {
    super();
    this.rules.push((value, path) => {
      if (typeof value !== 'number' || isNaN(value)) {
        return {
          isValid: false,
          message: this.customMessage || 'Value must be a number',
          path
        };
      }
      return { isValid: true };
    });
  }

  /**
   * Sets minimum value requirement
   * @param {number} minValue - Minimum allowed value
   * @returns {NumberValidator} Returns this validator for chaining
   */
  min(minValue) {
    this.rules.push((value, path) => {
      if (value < minValue) {
        return {
          isValid: false,
          message: this.customMessage || `Number must be at least ${minValue}`,
          path
        };
      }
      return { isValid: true };
    });
    return this;
  }

  /**
   * Sets maximum value requirement
   * @param {number} maxValue - Maximum allowed value
   * @returns {NumberValidator} Returns this validator for chaining
   */
  max(maxValue) {
    this.rules.push((value, path) => {
      if (value > maxValue) {
        return {
          isValid: false,
          message: this.customMessage || `Number must be at most ${maxValue}`,
          path
        };
      }
      return { isValid: true };
    });
    return this;
  }

  /**
   * Requires the number to be an integer
   * @returns {NumberValidator} Returns this validator for chaining
   */
  integer() {
    this.rules.push((value, path) => {
      if (!Number.isInteger(value)) {
        return {
          isValid: false,
          message: this.customMessage || 'Number must be an integer',
          path
        };
      }
      return { isValid: true };
    });
    return this;
  }

  /**
   * Requires the number to be positive
   * @returns {NumberValidator} Returns this validator for chaining
   */
  positive() {
    this.rules.push((value, path) => {
      if (value <= 0) {
        return {
          isValid: false,
          message: this.customMessage || 'Number must be positive',
          path
        };
      }
      return { isValid: true };
    });
    return this;
  }

  /**
   * Requires the number to be negative
   * @returns {NumberValidator} Returns this validator for chaining
   */
  negative() {
    this.rules.push((value, path) => {
      if (value >= 0) {
        return {
          isValid: false,
          message: this.customMessage || 'Number must be negative',
          path
        };
      }
      return { isValid: true };
    });
    return this;
  }

  /**
   * Sets the maximum number of decimal places
   * @param {number} digits - Maximum decimal places
   * @returns {NumberValidator} Returns this validator for chaining
   */
  precision(digits) {
    this.rules.push((value, path) => {
      const str = value.toString();
      const decimalPlaces = str.includes('.') ? str.split('.')[1].length : 0;
      if (decimalPlaces > digits) {
        return {
          isValid: false,
          message: this.customMessage || `Number must have at most ${digits} decimal places`,
          path
        };
      }
      return { isValid: true };
    });
    return this;
  }
}

/**
 * Boolean validator with enhanced boolean validation rules
 */
class BooleanValidator extends Validator {
  constructor() {
    super();
    this.truthyValues = [];
    this.falsyValues = [];
    this.rules.push((value, path) => {
      if (typeof value === 'boolean') {
        return { isValid: true };
      }
      if (typeof value === 'string') {
        if (this.truthyValues.includes(value)) return { isValid: true };
        if (this.falsyValues.includes(value)) return { isValid: true };
      }
      return {
        isValid: false,
        message: this.customMessage || 'Value must be a boolean',
        path
      };
    });
  }

  /**
   * Sets custom truthy values
   * @param {boolean[]} values - Array of values to consider as true
   * @returns {BooleanValidator} Returns this validator for chaining
   */
  truthy(values = []) {
    this.truthyValues = values;
    return this;
  }

  /**
   * Sets custom falsy values
   * @param {boolean[]} values - Array of values to consider as false
   * @returns {BooleanValidator} Returns this validator for chaining
   */
  falsy(values = []) {
    this.falsyValues = values;
    return this;
  }

  validate(value, path = '') {
    if (this.isOptional && (value === undefined || value === null)) {
      return value;
    }
    if (typeof value === 'string') {
      if (this.truthyValues.includes(value)) return true;
      if (this.falsyValues.includes(value)) return false;
    }
    return super.validate(value, path);
  }
}

/**
 * Date validator with enhanced date validation rules
 */
class DateValidator extends Validator {
  constructor() {
    super();
    this.rules.push((value, path) => {
      if (!(value instanceof Date) || isNaN(value.getTime())) {
        return {
          isValid: false,
          message: this.customMessage || 'Value must be a valid date',
          path
        };
      }
      return { isValid: true };
    });
  }

  /**
   * Sets minimum date requirement
   * @param {Date|string} date - Minimum allowed date
   * @returns {DateValidator} Returns this validator for chaining
   */
  min(date) {
    this.rules.push((value, path) => {
      if (value <= date) {
        return {
          isValid: false,
          message: this.customMessage || `Date must be after ${date.toISOString()}`,
          path
        };
      }
      return { isValid: true };
    });
    return this;
  }

  /**
   * Sets maximum date requirement
   * @param {Date|string} date - Maximum allowed date
   * @returns {DateValidator} Returns this validator for chaining
   */
  before(date) {
    this.rules.push((value, path) => {
      if (value >= date) {
        return {
          isValid: false,
          message: this.customMessage || `Date must be before ${date.toISOString()}`,
          path
        };
      }
      return { isValid: true };
    });
    return this;
  }

  /**
   * Sets expected date format
   * @param {string} format - Date format string
   * @returns {DateValidator} Returns this validator for chaining
   */
  format(format) {
    this.rules.push((value, path) => {
      if (typeof value !== 'string' || value.match(format) === null) {
        return {
          isValid: false,
          message: this.customMessage || 'Date must match the expected format',
          path
        };
      }
      return { isValid: true };
    });
    return this;
  }

  after(date) {
    return this.min(date);
  }
}

/**
 * Array validator with enhanced array validation rules
 */
class ArrayValidator extends Validator {
  constructor(itemValidator) {
    super();
    this.itemValidator = itemValidator;
    this.rules.push((value, path) => {
      if (!Array.isArray(value)) {
        return {
          isValid: false,
          message: this.customMessage || 'Value must be an array',
          path
        };
      }
      return { isValid: true };
    });
  }

  /**
   * Sets minimum array length requirement
   * @param {number} length - Minimum required array length
   * @returns {ArrayValidator} Returns this validator for chaining
   */
  minLength(length) {
    this.rules.push((value, path) => {
      if (value.length < length) {
        return {
          isValid: false,
          message: this.customMessage || `Array must have at least ${length} items`,
          path
        };
      }
      return { isValid: true };
    });
    return this;
  }

  /**
   * Sets maximum array length requirement
   * @param {number} length - Maximum allowed array length
   * @returns {ArrayValidator} Returns this validator for chaining
   */
  maxLength(length) {
    this.rules.push((value, path) => {
      if (value.length > length) {
        return {
          isValid: false,
          message: this.customMessage || `Array must have at most ${length} items`,
          path
        };
      }
      return { isValid: true };
    });
    return this;
  }

  /**
   * Requires array elements to be unique
   * @returns {ArrayValidator} Returns this validator for chaining
   */
  unique() {
    this.rules.push((value, path) => {
      const unique = new Set(value);
      if (unique.size !== value.length) {
        return {
          isValid: false,
          message: this.customMessage || 'Array must contain unique values',
          path
        };
      }
      return { isValid: true };
    });
    return this;
  }

  /**
   * Validates a value as an array with element validation
   * @param {*} value - Value to validate
   * @param {Array} path - The path to the value
   * @returns {Object} The validation result
   * @throws {ValidationError} If validation fails
   */
  validate(value, path = []) {
    const result = super.validate(value, path);
    if (this.isOptional && (value === undefined || value === null)) {
      return value;
    }
    if (this.itemValidator) {
      return result.map((item, index) => 
        this.itemValidator.validate(item, `${path}[${index}]`)
      );
    }
    return result;
  }
}

/**
 * Object validator with enhanced object validation rules
 */
class ObjectValidator extends Validator {
  constructor(schema) {
    super();
    this.schema = schema;
    this.strictMode = true;
    this.rules.push((value, path) => {
      if (typeof value !== 'object' || value === null) {
        return {
          isValid: false,
          message: this.customMessage || 'Value must be an object',
          path
        };
      }
      return { isValid: true };
    });
  }

  /**
   * Enables strict mode (no unknown keys allowed)
   * @returns {ObjectValidator} Returns this validator for chaining
   */
  strict(strict = true) {
    this.strictMode = strict;
    return this;
  }

  allowUnknown() {
    this.strictMode = false;
    return this;
  }

  /**
   * Validates a value as an object with schema validation
   * @param {*} value - Value to validate
   * @param {Array} path - The path to the value
   * @returns {Object} The validation result
   * @throws {ValidationError} If validation fails
   */
  validate(value, path = []) {
    const result = super.validate(value, path);
    if (this.isOptional && (value === undefined || value === null)) {
      return value;
    }

    const validated = {};
    const errors = [];

    // Validate known properties
    for (const [key, validator] of Object.entries(this.schema)) {
      try {
        validated[key] = validator.validate(value[key], `${path}.${key}`);
      } catch (error) {
        if (error instanceof ValidationError) {
          errors.push(error);
        } else {
          throw error;
        }
      }
    }

    // Check for unknown properties in strict mode
    if (this.strictMode) {
      for (const key of Object.keys(value)) {
        if (!this.schema.hasOwnProperty(key)) {
          errors.push(new ValidationError(`Unknown property: ${key}`, `${path}.${key}`));
        }
      }
    } else {
      // In non-strict mode, copy unknown properties as-is
      for (const key of Object.keys(value)) {
        if (!this.schema.hasOwnProperty(key)) {
          validated[key] = value[key];
        }
      }
    }

    if (errors.length > 0) {
      throw errors[0]; // Throw the first error
    }

    return validated;
  }
}

/**
 * Main Schema builder class providing static factory methods for validators
 */
class Schema {
  /**
   * Creates a string validator
   * @returns {StringValidator} New string validator instance
   */
  static string() {
    return new StringValidator();
  }
  
  /**
   * Creates a number validator
   * @returns {NumberValidator} New number validator instance
   */
  static number() {
    return new NumberValidator();
  }
  
  /**
   * Creates a boolean validator
   * @returns {BooleanValidator} New boolean validator instance
   */
  static boolean() {
    return new BooleanValidator();
  }
  
  /**
   * Creates a date validator
   * @returns {DateValidator} New date validator instance
   */
  static date() {
    return new DateValidator();
  }
  
  /**
   * Creates an object validator with a given schema
   * @param {Object} schema - Object mapping property names to validators
   * @returns {ObjectValidator} New object validator instance
   */
  static object(schema) {
    return new ObjectValidator(schema);
  }
  
  /**
   * Creates an array validator with item validation
   * @param {Validator} itemValidator - Validator for array items
   * @returns {ArrayValidator} New array validator instance
   */
  static array(itemValidator) {
    return new ArrayValidator(itemValidator);
  }

  /**
   * Creates a validator that matches any of the provided validators
   * @param {Validator[]} validators - Array of validators to try
   * @returns {Validator} New union validator instance
   */
  static union(validators) {
    return new class extends Validator {
      validate(value, path = '') {
        if (this.isOptional && (value === undefined || value === null)) {
          return value;
        }

        const errors = [];
        for (const validator of validators) {
          try {
            return validator.validate(value, path);
          } catch (error) {
            if (error instanceof ValidationError) {
              errors.push(error);
            } else {
              throw error;
            }
          }
        }

        throw new ValidationError(
          this.customMessage || 'Value does not match any of the allowed types',
          path
        );
      }
    }();
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Schema,
    ValidationError,
    StringValidator,
    NumberValidator,
    BooleanValidator,
    DateValidator,
    ArrayValidator,
    ObjectValidator
  };
}

// Example usage demonstration
if (typeof window === 'undefined' && require.main === module) {
  // Define a complex schema for demonstration
  const addressSchema = Schema.object({
    street: Schema.string().minLength(1),
    city: Schema.string().minLength(1),
    postalCode: Schema.string().pattern(/^\d{5}$/).withMessage('Postal code must be 5 digits'),
    country: Schema.string().minLength(2)
  });

  const userSchema = Schema.object({
    id: Schema.string().withMessage('ID must be a string'),
    name: Schema.string().minLength(2).maxLength(50),
    email: Schema.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    age: Schema.number().min(0).max(150).optional(),
    isActive: Schema.boolean(),
    tags: Schema.array(Schema.string()).minLength(1),
    address: addressSchema.optional(),
    metadata: Schema.object({}).optional().allowUnknown()
  });

  // Test data
  const userData = {
    id: "12345",
    name: "John Doe",
    email: "john@example.com",
    isActive: true,
    tags: ["developer", "designer"],
    address: {
      street: "123 Main St",
      city: "Anytown",
      postalCode: "12345",
      country: "USA"
    }
  };

  try {
    const validatedData = userSchema.validate(userData);
    console.log('Validation Result:', validatedData);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error('Validation Error:', {
        message: error.message,
        path: error.path.join('.'),
        value: error.value
      });
    } else {
      console.error('Error:', error);
    }
  }
}
  