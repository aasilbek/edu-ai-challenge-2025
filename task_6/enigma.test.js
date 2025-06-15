const { Enigma, Rotor, plugboardSwap, alphabet, ROTORS, REFLECTOR } = require('./enigma.js');

describe('Enigma Machine Tests', () => {
  describe('Basic Functionality', () => {
    test('should encrypt and decrypt text correctly without plugboard', () => {
      const enigma1 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
      const enigma2 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
      
      const plaintext = 'HELLO';
      const encrypted = enigma1.process(plaintext);
      const decrypted = enigma2.process(encrypted);
      
      expect(decrypted).toBe(plaintext);
      expect(encrypted).not.toBe(plaintext);
    });

    test('should encrypt and decrypt text correctly with plugboard', () => {
      const plugboard = [['A', 'B'], ['C', 'D']];
      const enigma1 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], plugboard);
      const enigma2 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], plugboard);
      
      const plaintext = 'ABCD';
      const encrypted = enigma1.process(plaintext);
      const decrypted = enigma2.process(encrypted);
      
      expect(decrypted).toBe(plaintext);
      expect(encrypted).not.toBe(plaintext);
    });

    test('should handle single character encryption/decryption', () => {
      const enigma1 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
      const enigma2 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
      
      const char = 'A';
      const encrypted = enigma1.encryptChar(char);
      const decrypted = enigma2.encryptChar(encrypted);
      
      expect(decrypted).toBe(char);
      expect(encrypted).not.toBe(char);
    });

    test('should preserve non-alphabetic characters', () => {
      const enigma = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
      const input = 'HELLO 123!';
      const output = enigma.process(input);
      
      expect(output).toMatch(/^[A-Z 0-9!]+$/);
      expect(output.includes(' ')).toBeTruthy();
      expect(output.includes('1')).toBeTruthy();
      expect(output.includes('!')).toBeTruthy();
    });

    test('should convert lowercase to uppercase', () => {
      const enigma = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
      const result = enigma.process('hello');
      
      expect(result).toMatch(/^[A-Z]+$/);
    });
  });

  describe('Rotor Functionality', () => {
    test('should create rotor with correct properties', () => {
      const rotor = new Rotor('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'A', 0, 5);
      
      expect(rotor.wiring).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
      expect(rotor.notch).toBe('A');
      expect(rotor.ringSetting).toBe(0);
      expect(rotor.position).toBe(5);
    });

    test('should step rotor correctly', () => {
      const rotor = new Rotor('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'A', 0, 0);
      
      rotor.step();
      expect(rotor.position).toBe(1);
      
      rotor.position = 25;
      rotor.step();
      expect(rotor.position).toBe(0);
    });

    test('should detect notch position correctly', () => {
      const rotor = new Rotor('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'E', 0, 4);
      
      expect(rotor.atNotch()).toBeTruthy();
      
      rotor.step();
      expect(rotor.atNotch()).toBeFalsy();
    });

    test('should perform forward substitution', () => {
      const rotor = new Rotor(ROTORS[0].wiring, ROTORS[0].notch, 0, 0);
      const result = rotor.forward('A');
      
      expect(result).toBe('E'); // First letter of Rotor I wiring
    });

    test('should perform backward substitution', () => {
      const rotor = new Rotor(ROTORS[0].wiring, ROTORS[0].notch, 0, 0);
      const result = rotor.backward('E');
      
      expect(result).toBe('A');
    });

    test('should handle ring settings in forward substitution', () => {
      const rotor = new Rotor(ROTORS[0].wiring, ROTORS[0].notch, 1, 0);
      const result = rotor.forward('A');
      expect(result).toBe(ROTORS[0].wiring[25]); // Last letter due to ring setting
    });

    test('should handle ring settings in backward substitution', () => {
      const rotor = new Rotor(ROTORS[0].wiring, ROTORS[0].notch, 1, 0);
      const result = rotor.backward(ROTORS[0].wiring[25]);
      expect(result).toBe('A');
    });
  });

  describe('Rotor Stepping', () => {
    test('should step rightmost rotor on each character', () => {
      const enigma = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
      const initialPos = enigma.rotors[2].position;
      enigma.encryptChar('A');
      expect(enigma.rotors[2].position).toBe((initialPos + 1) % 26);
    });

    test('should handle rotor turnover (double stepping)', () => {
      // Set up so that the middle rotor is at its notch after the right rotor steps
      // Rotor II notch is at 'E' (4), Rotor III notch is at 'V' (21)
      const enigma = new Enigma([0, 1, 2], [0, 4, 20], [0, 0, 0], []);
      // Step 1: right rotor steps from 20 to 21 (at notch), middle rotor steps from 4 to 5 (off notch)
      enigma.encryptChar('A');
      expect(enigma.rotors[2].position).toBe(21); // right rotor
      expect(enigma.rotors[1].position).toBe(5);  // middle rotor stepped
      expect(enigma.rotors[0].position).toBe(0);  // left rotor did not step

      // Step 2: right rotor steps from 21 to 22 (off notch), middle rotor at 5 (not at notch), left rotor should not step
      enigma.encryptChar('A');
      expect(enigma.rotors[2].position).toBe(22);
      expect(enigma.rotors[1].position).toBe(5);
      expect(enigma.rotors[0].position).toBe(0);
    });

    test('should handle right rotor at notch', () => {
      const enigma = new Enigma([0, 1, 2], [0, 0, 20], [0, 0, 0], []);
      enigma.encryptChar('A');
      // After stepping, right rotor is at 21 (notch), so middle rotor should step
      expect(enigma.rotors[2].position).toBe(21);
      expect(enigma.rotors[1].position).toBe(1); // middle rotor stepped
    });
  });

  describe('Ring Settings', () => {
    test('should work with different ring settings', () => {
      const enigma1 = new Enigma([0, 1, 2], [0, 0, 0], [1, 2, 3], []);
      const enigma2 = new Enigma([0, 1, 2], [0, 0, 0], [1, 2, 3], []);
      
      const plaintext = 'TEST';
      const encrypted = enigma1.process(plaintext);
      const decrypted = enigma2.process(encrypted);
      
      expect(decrypted).toBe(plaintext);
    });

    test('should handle maximum ring settings', () => {
      const enigma = new Enigma([0, 1, 2], [0, 0, 0], [25, 25, 25], []);
      const result = enigma.process('A');
      expect(result.length).toBe(1);
      expect(alphabet.includes(result)).toBeTruthy();
    });
  });

  describe('Different Rotor Positions', () => {
    test('should work with different starting positions', () => {
      const enigma1 = new Enigma([0, 1, 2], [5, 10, 15], [0, 0, 0], []);
      const enigma2 = new Enigma([0, 1, 2], [5, 10, 15], [0, 0, 0], []);
      
      const plaintext = 'POSITIONS';
      const encrypted = enigma1.process(plaintext);
      const decrypted = enigma2.process(encrypted);
      
      expect(decrypted).toBe(plaintext);
    });

    test('should handle maximum rotor positions', () => {
      const enigma = new Enigma([0, 1, 2], [25, 25, 25], [0, 0, 0], []);
      const result = enigma.process('A');
      expect(result.length).toBe(1);
      expect(alphabet.includes(result)).toBeTruthy();
    });
  });

  describe('Plugboard Functionality', () => {
    test('plugboardSwap should swap characters correctly', () => {
      const pairs = [['A', 'B'], ['C', 'D']];
      expect(plugboardSwap('A', pairs)).toBe('B');
      expect(plugboardSwap('B', pairs)).toBe('A');
      expect(plugboardSwap('C', pairs)).toBe('D');
      expect(plugboardSwap('D', pairs)).toBe('C');
      expect(plugboardSwap('E', pairs)).toBe('E');
    });

    test('should handle empty plugboard', () => {
      expect(plugboardSwap('A', [])).toBe('A');
    });

    test('should work with multiple plugboard pairs', () => {
      const plugboard = [['A', 'B'], ['C', 'D'], ['E', 'F'], ['G', 'H']];
      const enigma1 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], plugboard);
      const enigma2 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], plugboard);
      const plaintext = 'ABCDEFGH';
      const encrypted = enigma1.process(plaintext);
      const decrypted = enigma2.process(encrypted);
      expect(decrypted).toBe(plaintext);
    });

    test('should handle invalid plugboard pairs', () => {
      const enigma = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], [['A', 'A']]);
      const result = enigma.process('A');
      expect(result).toMatch(/^[A-Z]$/); // Should be a single uppercase letter
    });
  });

  describe('Different Rotor Combinations', () => {
    test('should work with different rotor order', () => {
      const enigma1 = new Enigma([2, 1, 0], [0, 0, 0], [0, 0, 0], []);
      const enigma2 = new Enigma([2, 1, 0], [0, 0, 0], [0, 0, 0], []);
      
      const plaintext = 'ROTORS';
      const encrypted = enigma1.process(plaintext);
      const decrypted = enigma2.process(encrypted);
      
      expect(decrypted).toBe(plaintext);
    });

    test('should work with all possible rotor combinations', () => {
      const rotorOrders = [
        [0, 1, 2], [0, 2, 1],
        [1, 0, 2], [1, 2, 0],
        [2, 0, 1], [2, 1, 0]
      ];

      for (const order of rotorOrders) {
        const enigma1 = new Enigma(order, [0, 0, 0], [0, 0, 0], []);
        const enigma2 = new Enigma(order, [0, 0, 0], [0, 0, 0], []);
        
        const plaintext = 'TEST';
        const encrypted = enigma1.process(plaintext);
        const decrypted = enigma2.process(encrypted);
        
        expect(decrypted).toBe(plaintext);
      }
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty string', () => {
      const enigma = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
      const result = enigma.process('');
      expect(result).toBe('');
    });

    test('should handle string with only spaces and numbers', () => {
      const enigma = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
      const result = enigma.process('123 456');
      expect(result).toBe('123 456');
    });

    test('should handle maximum rotor position values', () => {
      const enigma = new Enigma([0, 1, 2], [25, 25, 25], [0, 0, 0], []);
      const result = enigma.process('Z');
      expect(result.length).toBe(1);
      expect(alphabet.includes(result)).toBeTruthy();
    });

    test('should handle invalid input characters', () => {
      const enigma = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
      const result = enigma.process('Hello, 世界!');
      // Only A-Z are encrypted, non-ASCII are removed, punctuation preserved
      expect(result).toMatch(/^[A-Z, !]+$/);
      expect(result.length).toBe(8); // 'HELLO, !' -> 8 chars
    });
  });

  describe('Historical Accuracy Tests', () => {
    test('should produce different outputs for same input with different settings', () => {
      const enigma1 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
      const enigma2 = new Enigma([0, 1, 2], [1, 1, 1], [0, 0, 0], []);
      const plaintext = 'ATTACK';
      const result1 = enigma1.process(plaintext);
      const result2 = enigma2.process(plaintext);
      expect(result1).not.toBe(result2);
    });

    test('should never encrypt a letter to itself', () => {
      const enigma = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
      for (let i = 0; i < alphabet.length; i++) {
        const char = alphabet[i];
        const encrypted = enigma.encryptChar(char);
        expect(encrypted).not.toBe(char);
      }
    });

    test('should maintain reciprocal property', () => {
      const enigma1 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
      const enigma2 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
      const char = 'A';
      const encrypted = enigma1.encryptChar(char);
      const decrypted = enigma2.encryptChar(encrypted);
      expect(decrypted).toBe(char);
    });
  });

  describe('Long Message Tests', () => {
    test('should handle long messages correctly', () => {
      const enigma1 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], [['A', 'B']]);
      const enigma2 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], [['A', 'B']]);
      const plaintext = 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG';
      const encrypted = enigma1.process(plaintext);
      const decrypted = enigma2.process(encrypted);
      expect(decrypted).toBe(plaintext);
    });

    test('should handle very long messages', () => {
      const enigma = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
      const plaintext = 'A'.repeat(1000);
      const result = enigma.process(plaintext);
      expect(result.length).toBe(1000);
      expect(result).toMatch(/^[A-Z]+$/);
    });
  });
}); 