# [Task 8] - Data Validation Library
EDU AI Challenge <br>
In this task, we’ll use Cursor IDE to build and test a reusable data validation library for complex inputs.
## Theory
In this challenge, you’ll use Cursor IDE not just as a coding tool, but as an intelligent assistant to help you design and implement a reusable validation library from scratch. 
 
**AI Technique**: This task explores how AI-powered development can assist in three key areas:
 
**AI-Assisted Validator Design**
Cursor can help you build type-safe validator functions for primitive types (like string, number, boolean) and guide you through creating validators for more complex structures (arrays, nested objects, optional fields, etc.). You’ll learn to prompt the AI to design reusable patterns that align with your chosen language’s type system and conventions.
 
**AI-Driven Refactoring and Documentation**
As your library grows in complexity, maintaining clean and well-documented code becomes essential. Use Cursor to generate inline documentation, usage examples, and even refactor parts of your codebase for better readability, modularity, and adherence to best practices.
 
**Smart Test Generation**
Validating the validator is just as important. You’ll use AI to help create a comprehensive test suite with examples of valid and invalid data inputs. These tests will serve both as correctness checks and usage documentation for future developers.
 
## Task
Your task is to build a robust validation library in your preferred programming language (JavaScript, Python, Java, etc.) that can validate complex data structures leveraging Cursor IDE's capabilities.
Start with this basic template that you can adapt to your language of choice.
```js
// Schema Builder
class Schema {
  static string(): StringValidator {
    return new StringValidator();
  }
  
  static number(): NumberValidator {
    return new NumberValidator();
  }
  
  static boolean(): BooleanValidator {
    return new BooleanValidator();
  }
  
  static date(): DateValidator {
    return new DateValidator();
  }
  
  static object<T>(schema: Record<string, Validator<any>>): ObjectValidator<T> {
    return new ObjectValidator<T>(schema);
  }
  
  static array<T>(itemValidator: Validator<T>): ArrayValidator<T> {
    return new ArrayValidator<T>(itemValidator);
  }
}

// Define a complex schema
const addressSchema = Schema.object({
  street: Schema.string(),
  city: Schema.string(),
  postalCode: Schema.string().pattern(/^\d{5}$/).withMessage('Postal code must be 5 digits'),
  country: Schema.string()
});

const userSchema = Schema.object({
  id: Schema.string().withMessage('ID must be a string'),
  name: Schema.string().minLength(2).maxLength(50),
  email: Schema.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  age: Schema.number().optional(),
  isActive: Schema.boolean(),
  tags: Schema.array(Schema.string()),
  address: addressSchema.optional(),
  metadata: Schema.object({}).optional()
});

// Validate data
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

const result = userSchema.validate(userData);

```
**Implement Core Validator Functions**
- Use Cursor’s AI to help you write type-safe validator functions for primitive types (e.g., string, number, boolean).
- Extend your library to support complex types such as arrays and objects.
- Ensure your validators follow your language’s best practices and type system. <br>
  
**Leverage AI for Documentation and Refactoring**
- Use Cursor’s AI to generate inline documentation and usage examples.
- Refactor your code with AI suggestions to ensure clarity, maintainability, and adherence to your style guide.

**Test with Diverse Data Patterns**
- Write comprehensive test cases covering valid and invalid data scenarios. Use Cursor’s AI to generate and expand your test suite, ensuring robust validation coverage.

## Verification
You need to provide **all of the following**:
1. Validation library code based on template
2. Unit tests for this validation library
3 .Guide on how to run your application and use your library(readme.md)
4. Tests coverage report(test_report.txt) * - you can use any file extension for test_report
 
Place your solution files in the appropriate folder of the Challenge project repository on your GitHub account.

## Requirements
1. Validation library implementation should have complete, type-safe validator functions for primitive and complex types
2. Validation library code should have inline comments explaining what this or that function does
3. Guide(readme.md) should contain clear instructions on how to run the application and use your validator library
4. Unit tests should cover all core functionality, and test coverage should be at least 60%.
