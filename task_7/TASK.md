# [Task 7] - Sea Battle Game
EDU AI Challenge
In this task, we’ll practice using Cursor IDE to refactor an outdated code base.
 
Welcome to the Sea Battle Code Challenge! You are provided with a simple, legacy-style command-line interface (CLI) implementation of the classic Sea Battle (Battleship) game (seabattle.js). This version is functional but written using older JavaScript conventions (ES5 var, global variables, etc.).
The existing game features:
- A 10x10 grid.
- Random ship placement for both player and CPU.
- Turn-based gameplay where the player inputs coordinates (e.g., 00, 34).
- A basic CPU opponent with 'hunt' and 'target' modes.
- Text-based display of the player's board and their view of the opponent's board.

You can find detailed description of how Sea Battle application from seabattle.js file works in README.md
 
## Theory
 
Cursor's AI deeply understands code structure, helping you improve architecture while preserving functionality. It analyzes complex implementations, identifies organization opportunities, and suggests modernizations that maintain core behavior.
 
The tool explains the reasoning behind each refactoring suggestion, whether you're breaking down components or improving encapsulation. Ask questions about separation of concerns or maintainability to get specific, context-aware advice.
 
Cursor ensures safe transformations by maintaining functional integrity throughout changes. It suggests incremental improvements that move code forward without breaking existing behavior. This approach develops your architectural judgment while you work.
 
**AI Technique**: This Sea Battle challenge is a great way to see how AI can streamline complex coding tasks:

- **Understanding Legacy Code**: Quickly make sense of the existing seabattle.js by asking AI to explain its structure and logic before you refactor.
- **Code Modernization & Refactoring**:
    - Get AI assistance to upgrade syntax (e.g., ES5 to ES6+).
    - Collaborate with AI on improving code structure, such as separating concerns or applying design patterns.
    - Use AI to enhance readability with better naming and formatting.
    - If rewriting in a new language, leverage AI for translation and idiomatic expressions.
- **Efficient Test Generation**: Direct AI to create unit tests for core game logic, including various game states and CPU behaviors, to help build out your test suite.
- **Architectural Guidance**: Discuss refactoring strategies and design choices with AI to explore different approaches.
- **Maintaining Core Functionality**: Use AI as a cross-reference to ensure game mechanics remain intact during refactoring.

Applying these AI techniques will help you modernize the codebase, improve its quality, and build tests more effectively.

## Task
Your challenge is to modernize and refactor [this codebase](/task_7/before_change_seabattle.js). <br>
Objectives:
1. Modernize & Refactor the Codebase:
    - Update the JavaScript code to modern ECMAScript standards (ES6+), utilizing features such as classes, modules, let/const, arrow functions, and Promises/async-await where appropriate. Alternatively, you may rewrite the entire game logic in a language of your choice (e.g., Python, TypeScript, Java, C#, Go).
    - Improve code structure and organization. This should include clear separation of concerns (e.g., game logic, display/UI, utilities), reduction or elimination of global variables, and encapsulation of state and behavior, possibly by adopting a suitable architectural pattern (e.g., MVC, or distinct modules/classes for core components).
    - Enhance readability and maintainability through consistent code style, clear naming conventions for variables and functions, and well-structured code.
    - Ensure the core game mechanics remain the same, including: a 10x10 grid, turn-based coordinate input (e.g., 00, 34), standard Battleship hit/miss/sunk logic, and the existing CPU opponent's 'hunt' and 'target' modes.
2. Add Unit Tests:
    - Implement unit tests to verify the core game logic. Tests should cover critical functionalities.
    - Choose a testing framework appropriate for your chosen language (e.g., Jest for JavaScript/TypeScript, Pytest for Python). Aim for meaningful test coverage of the core logic modules.
    - Ensure that test coverage is at least 60% across the core modules.
 
## Verification
You need to provide **all of the following**: <br>
1. Refactored Sea Battle application
2. Unit tests for Sea Battle application
3. Description of what was done and achieved by your refactoring(**refactoring.md**)
4. Tests coverage report(**test_report.txt**) * - you can use any file extension for test_report
 
Place your solution files in the appropriate folder of the Challenge project repository on your GitHub account
 
## Requirements
1. The refactored game must accurately implement all original core game mechanics and rules.
2. The refactored code must demonstrate clear organization and employ modern language features (e.g., ES6+ for JavaScript) as stated in task description.
3. Unit tests should cover all core functionality, and test coverage should be at least 60%.
