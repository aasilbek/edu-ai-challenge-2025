# [Task 6] - Enigma Machine
EDU AI Challenge
In this task, we'll practice using Cursor IDE to detect bugs, implement fixes, and generate unit tests—all with AI assistance.
 
Welcome to the Broken Enigma Machine Challenge! In this task, you are provided with a simplified implementation of the classic Enigma cipher machine. The code is mostly functional, but contains a bug that affects the correctness of encryption or decryption.
The Enigma machine is a rotor-based cipher device historically used for secure communication. This implementation includes:
- Multiple rotors with configurable wiring and stepping
-A plugboard for letter swaps
- Reflector logic
- Basic CLI interface for encrypting and decrypting messages 


You can find detailed description of how Enigma Machine CLI application from enigma.js file works in README.md

## Theory
Cursor IDE is a powerful AI-driven development environment designed to help you write, analyze, and debug code more efficiently. Unlike traditional IDEs, Cursor integrates advanced AI capabilities directly into your workflow, acting as an intelligent assistant that understands context, detects issues, and suggests improvements in real time.
 
When working on bug-fixing tasks, Cursor excels at analyzing code logic, identifying potential errors, and proposing targeted fixes. It can spot common issues like null pointer exceptions, infinite loops, or incorrect variable assignments—often before you even run the program. By leveraging natural language, you can describe a problem (e.g., "This function returns incorrect values for large inputs") and get precise suggestions for fixes or optimizations.
 
Cursor also helps you understand why a bug occurs. Instead of just pointing out errors, it explains the underlying problem, helping you learn while you debug. Whether you're dealing with a tricky race condition, a memory leak, or a simple syntax mistake, Cursor speeds up the process by narrowing down possibilities and offering validated solutions.
 
For this challenge, you'll use Cursor to locate and fix a bug in a given code snippet. Pay attention to how the AI interprets the issue, suggests corrections, and explains its reasoning—this will help you not only complete the task but also improve your debugging skills for future projects.
 
**AI Technique**: In this challenge, you'll explore several powerful AI-driven development techniques:

1. **AI-Powered Code Comprehension**: Rapidly understand the intricacies of the enigma.js codebase. Instead of spending extensive time manually deciphering the existing implementation, you'll learn to prompt the AI to explain complex sections, summarize the functionality of different components (like rotors, the plugboard, and the reflector), and quickly grasp the overall architecture. This allows you to get to the core of the problem faster.
2. **AI-Assisted Bug Diagnosis & Resolution**: Collaborate with an AI partner to pinpoint and fix the elusive bug. You'll practice describing the incorrect behavior to the AI, asking it to analyze potential logical flaws in the encryption/decryption process, and exploring different hypotheses. The AI can help trace execution paths and suggest code modifications, turning bug-fixing into an interactive and more insightful process.
3. **AI-Driven Test Development**: Streamline the creation of a robust test suite. You'll direct the AI to generate test cases that cover various Enigma machine configurations and scenarios. This includes crafting inputs and expected outputs to validate the fix and meet the challenge's 60% test coverage requirement, showcasing how AI can significantly reduce the manual effort in testing.
4. **AI-Enhanced Explanations & Documentation**: Articulate your findings with AI assistance. After identifying and fixing the bug, you'll use the AI to help you clearly describe the issue and your solution. This could involve generating concise code comments or drafting a brief write-up, demonstrating how AI can aid in effectively communicating technical details. <br>
5. 
By working through these aspects, you'll gain practical experience in using AI to augment your development skills, making you more efficient and effective in understanding, debugging, and testing code.

## Task
Your challenge is to analyze the provided code in 
```js
const readline = require('readline');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function mod(n, m) {
  return ((n % m) + m) % m;
}

const ROTORS = [
  { wiring: 'EKMFLGDQVZNTOWYHXUSPAIBRCJ', notch: 'Q' }, // Rotor I
  { wiring: 'AJDKSIRUXBLHWTMCQGZNPYFVOE', notch: 'E' }, // Rotor II
  { wiring: 'BDFHJLCPRTXVZNYEIWGAKMUSQO', notch: 'V' }, // Rotor III
];
const REFLECTOR = 'YRUHQSLDPXNGOKMIEBFZCWVJAT';

function plugboardSwap(c, pairs) {
  for (const [a, b] of pairs) {
    if (c === a) return b;
    if (c === b) return a;
  }
  return c;
}

class Rotor {
  constructor(wiring, notch, ringSetting = 0, position = 0) {
    this.wiring = wiring;
    this.notch = notch;
    this.ringSetting = ringSetting;
    this.position = position;
  }
  step() {
    this.position = mod(this.position + 1, 26);
  }
  atNotch() {
    return alphabet[this.position] === this.notch;
  }
  forward(c) {
    const idx = mod(alphabet.indexOf(c) + this.position - this.ringSetting, 26);
    return this.wiring[idx];
  }
  backward(c) {
    const idx = this.wiring.indexOf(c);
    return alphabet[mod(idx - this.position + this.ringSetting, 26)];
  }
}

class Enigma {
  constructor(rotorIDs, rotorPositions, ringSettings, plugboardPairs) {
    this.rotors = rotorIDs.map(
      (id, i) =>
        new Rotor(
          ROTORS[id].wiring,
          ROTORS[id].notch,
          ringSettings[i],
          rotorPositions[i],
        ),
    );
    this.plugboardPairs = plugboardPairs;
  }
  stepRotors() {
    if (this.rotors[2].atNotch()) this.rotors[1].step();
    if (this.rotors[1].atNotch()) this.rotors[0].step();
    this.rotors[2].step();
  }
  encryptChar(c) {
    if (!alphabet.includes(c)) return c;
    this.stepRotors();
    c = plugboardSwap(c, this.plugboardPairs);
    for (let i = this.rotors.length - 1; i >= 0; i--) {
      c = this.rotors[i].forward(c);
    }

    c = REFLECTOR[alphabet.indexOf(c)];

    for (let i = 0; i < this.rotors.length; i++) {
      c = this.rotors[i].backward(c);
    }

    return c;
  }
  process(text) {
    return text
      .toUpperCase()
      .split('')
      .map((c) => this.encryptChar(c))
      .join('');
  }
}

function promptEnigma() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter message: ', (message) => {
    rl.question('Rotor positions (e.g. 0 0 0): ', (posStr) => {
      const rotorPositions = posStr.split(' ').map(Number);
      rl.question('Ring settings (e.g. 0 0 0): ', (ringStr) => {
        const ringSettings = ringStr.split(' ').map(Number);
        rl.question('Plugboard pairs (e.g. AB CD): ', (plugStr) => {
          const plugPairs =
            plugStr
              .toUpperCase()
              .match(/([A-Z]{2})/g)
              ?.map((pair) => [pair[0], pair[1]]) || [];

          const enigma = new Enigma(
            [0, 1, 2],
            rotorPositions,
            ringSettings,
            plugPairs,
          );
          const result = enigma.process(message);
          console.log('Output:', result);
          rl.close();
        });
      });
    });
  });
}

if (require.main === module) {
  promptEnigma();
}


```

identify the root cause of the bug, and fix it.
Objectives:

1. Find and Fix the Bug:
    - Carefully review the code and determine why encryption and decryption do not produce correct results.
    - Implement a fix that restores correct Enigma behavior.
2. Explain the Issue:
    - Briefly describe the bug and your fix in comments or a short write-up.
3. Add Tests:
    - Add unit tests to verify correct Enigma operation.
  

Note: you can translate the code to the programming language of your choice if you like

## Verification
You need to provide **all of the following**:
1. Fixed Enigma CLI application(enigma.js or alternative using other programming language)
2. File(s) with unit tests
3. Description of the bug and your fix(**fix.md**)
4. Tests coverage report(**test_report.txt**) * - you can use any file extension for test_report
 
Place your solution files in the appropriate folder of the Challenge project repository on your GitHub account
 
## Requirements
1. The fixed code should correctly encrypt and decrypt messages according to Enigma rules.
2. Unit tests should cover all core functionality, and test coverage should be at least 60%.