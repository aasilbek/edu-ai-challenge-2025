const {
  Schema,
  ValidationError,
  StringValidator,
  NumberValidator,
  BooleanValidator,
  DateValidator,
  ArrayValidator,
  ObjectValidator
} = require('./schema');

describe('Schema Validation Library', () => {
  describe('String Validator', () => {
    it('validates basic string values', () => {
      const validator = Schema.string();
      expect(validator.validate('test')).toBe('test');
      expect(() => validator.validate(123)).toThrow(ValidationError);
    });

    it('handles optional values', () => {
      const validator = Schema.string().optional();
      expect(validator.validate(undefined)).toBeUndefined();
      expect(validator.validate(null)).toBeNull();
    });

    it('validates string length constraints', () => {
      const validator = Schema.string().minLength(2).maxLength(5);
      expect(validator.validate('test')).toBe('test');
      expect(() => validator.validate('a')).toThrow(ValidationError);
      expect(() => validator.validate('toolong')).toThrow(ValidationError);
    });

    it('validates string patterns', () => {
      const validator = Schema.string().pattern(/^[A-Z]+$/);
      expect(validator.validate('ABC')).toBe('ABC');
      expect(() => validator.validate('abc')).toThrow(ValidationError);
    });

    it('validates enum values', () => {
      const validator = Schema.string().enum(['red', 'green', 'blue']);
      expect(validator.validate('red')).toBe('red');
      expect(() => validator.validate('yellow')).toThrow(ValidationError);
    });

    it('trims strings when configured', () => {
      const validator = Schema.string().trim();
      expect(validator.validate('  test  ')).toBe('test');
    });

    it('applies custom transformations', () => {
      const validator = Schema.string().transform(s => s.toUpperCase());
      expect(validator.validate('test')).toBe('TEST');
    });
  });

  describe('Number Validator', () => {
    it('validates basic number values', () => {
      const validator = Schema.number();
      expect(validator.validate(123)).toBe(123);
      expect(() => validator.validate('123')).toThrow(ValidationError);
    });

    it('handles optional values', () => {
      const validator = Schema.number().optional();
      expect(validator.validate(undefined)).toBeUndefined();
      expect(validator.validate(null)).toBeNull();
    });

    it('validates number range constraints', () => {
      const validator = Schema.number().min(0).max(100);
      expect(validator.validate(50)).toBe(50);
      expect(() => validator.validate(-1)).toThrow(ValidationError);
      expect(() => validator.validate(101)).toThrow(ValidationError);
    });

    it('validates integer values', () => {
      const validator = Schema.number().integer();
      expect(validator.validate(123)).toBe(123);
      expect(() => validator.validate(123.45)).toThrow(ValidationError);
    });

    it('validates positive/negative values', () => {
      const positiveValidator = Schema.number().positive();
      const negativeValidator = Schema.number().negative();
      
      expect(positiveValidator.validate(1)).toBe(1);
      expect(() => positiveValidator.validate(-1)).toThrow(ValidationError);
      
      expect(negativeValidator.validate(-1)).toBe(-1);
      expect(() => negativeValidator.validate(1)).toThrow(ValidationError);
    });

    it('validates decimal precision', () => {
      const validator = Schema.number().precision(2);
      expect(validator.validate(123.45)).toBe(123.45);
      expect(() => validator.validate(123.456)).toThrow(ValidationError);
    });
  });

  describe('Boolean Validator', () => {
    it('validates basic boolean values', () => {
      const validator = Schema.boolean();
      expect(validator.validate(true)).toBe(true);
      expect(validator.validate(false)).toBe(false);
      expect(() => validator.validate('true')).toThrow(ValidationError);
    });

    it('handles optional values', () => {
      const validator = Schema.boolean().optional();
      expect(validator.validate(undefined)).toBeUndefined();
      expect(validator.validate(null)).toBeNull();
    });

    it('validates custom truthy/falsy values', () => {
      const validator = Schema.boolean()
        .truthy(['yes', 'on'])
        .falsy(['no', 'off']);
      
      expect(validator.validate('yes')).toBe(true);
      expect(validator.validate('no')).toBe(false);
      expect(() => validator.validate('maybe')).toThrow(ValidationError);
    });
  });

  describe('Date Validator', () => {
    it('validates basic date values', () => {
      const validator = Schema.date();
      const date = new Date();
      expect(validator.validate(date)).toBe(date);
      expect(() => validator.validate('invalid')).toThrow(ValidationError);
    });

    it('handles optional values', () => {
      const validator = Schema.date().optional();
      expect(validator.validate(undefined)).toBeUndefined();
      expect(validator.validate(null)).toBeNull();
    });

    it('validates date ranges', () => {
      const minDate = new Date('2020-01-01');
      const maxDate = new Date('2020-12-31');
      const validator = Schema.date().after(minDate).before(maxDate);
      
      const validDate = new Date('2020-06-15');
      expect(validator.validate(validDate)).toBe(validDate);
      
      expect(() => validator.validate(new Date('2019-12-31'))).toThrow(ValidationError);
      expect(() => validator.validate(new Date('2021-01-01'))).toThrow(ValidationError);
    });
  });

  describe('Array Validator', () => {
    it('validates basic array values', () => {
      const validator = Schema.array(Schema.string());
      expect(validator.validate(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
      expect(() => validator.validate('not an array')).toThrow(ValidationError);
    });

    it('handles optional values', () => {
      const validator = Schema.array(Schema.string()).optional();
      expect(validator.validate(undefined)).toBeUndefined();
      expect(validator.validate(null)).toBeNull();
    });

    it('validates array length constraints', () => {
      const validator = Schema.array(Schema.string()).minLength(2).maxLength(4);
      expect(validator.validate(['a', 'b'])).toEqual(['a', 'b']);
      expect(() => validator.validate(['a'])).toThrow(ValidationError);
      expect(() => validator.validate(['a', 'b', 'c', 'd', 'e'])).toThrow(ValidationError);
    });

    it('validates array item types', () => {
      const validator = Schema.array(Schema.number());
      expect(validator.validate([1, 2, 3])).toEqual([1, 2, 3]);
      expect(() => validator.validate([1, '2', 3])).toThrow(ValidationError);
    });

    it('validates unique array items', () => {
      const validator = Schema.array(Schema.string()).unique();
      expect(validator.validate(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
      expect(() => validator.validate(['a', 'a', 'b'])).toThrow(ValidationError);
    });
  });

  describe('Object Validator', () => {
    it('validates basic object values', () => {
      const validator = Schema.object({
        name: Schema.string(),
        age: Schema.number()
      });
      
      const validObject = { name: 'John', age: 30 };
      expect(validator.validate(validObject)).toEqual(validObject);
      
      expect(() => validator.validate('not an object')).toThrow(ValidationError);
    });

    it('handles optional values', () => {
      const validator = Schema.object({
        name: Schema.string().optional(),
        age: Schema.number().optional()
      });
      
      expect(validator.validate({})).toEqual({});
      expect(validator.validate({ name: 'John' })).toEqual({ name: 'John' });
    });

    it('validates nested objects', () => {
      const validator = Schema.object({
        user: Schema.object({
          name: Schema.string(),
          age: Schema.number()
        })
      });
      
      const validObject = {
        user: { name: 'John', age: 30 }
      };
      expect(validator.validate(validObject)).toEqual(validObject);
      
      expect(() => validator.validate({
        user: { name: 'John', age: '30' }
      })).toThrow(ValidationError);
    });

    it('handles unknown properties', () => {
      const strictValidator = Schema.object({
        name: Schema.string()
      }).strict();
      
      const lenientValidator = Schema.object({
        name: Schema.string()
      }).allowUnknown();
      
      const object = { name: 'John', extra: 'value' };
      
      expect(() => strictValidator.validate(object)).toThrow(ValidationError);
      expect(lenientValidator.validate(object)).toEqual(object);
    });
  });

  describe('Union Validator', () => {
    it('validates values against multiple validators', () => {
      const validator = Schema.union([
        Schema.string(),
        Schema.number()
      ]);
      
      expect(validator.validate('test')).toBe('test');
      expect(validator.validate(123)).toBe(123);
      expect(() => validator.validate(true)).toThrow(ValidationError);
    });
  });

  describe('Complex Schema Example', () => {
    const addressSchema = Schema.object({
      street: Schema.string().minLength(1),
      city: Schema.string().minLength(1),
      postalCode: Schema.string().pattern(/^\d{5}$/),
      country: Schema.string().minLength(2)
    });

    const userSchema = Schema.object({
      id: Schema.string(),
      name: Schema.string().minLength(2).maxLength(50),
      email: Schema.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      age: Schema.number().min(0).max(150).optional(),
      isActive: Schema.boolean(),
      tags: Schema.array(Schema.string()).minLength(1),
      address: addressSchema.optional(),
      metadata: Schema.object({}).optional().allowUnknown()
    });

    it('validates a complex user object', () => {
      const userData = {
        id: '12345',
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        isActive: true,
        tags: ['developer', 'designer'],
        address: {
          street: '123 Main St',
          city: 'Anytown',
          postalCode: '12345',
          country: 'USA'
        },
        metadata: {
          lastLogin: '2024-03-15',
          preferences: { theme: 'dark' }
        }
      };

      expect(userSchema.validate(userData)).toEqual(userData);
    });

    it('handles validation errors in complex objects', () => {
      const invalidUserData = {
        id: '12345',
        name: 'J', // Too short
        email: 'invalid-email',
        age: 200, // Too high
        isActive: 'yes', // Not a boolean
        tags: [], // Empty array
        address: {
          street: '',
          city: 'Anytown',
          postalCode: '123', // Invalid format
          country: 'U' // Too short
        }
      };

      expect(() => userSchema.validate(invalidUserData)).toThrow(ValidationError);
    });
  });
}); 