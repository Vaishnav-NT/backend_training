import CalculatorInterface from "./calculator_interface";

class Calculator implements CalculatorInterface {
  add(a: number, b: number): number {
    return a + b;
  }
  subtract(a: number, b: number): number {
    return a - b;
  }
  multiply(a: number, b: number): number {
    return a * b;
  }
  divide(a: number, b: number): number {
    if (b != 0) {
      return a / b;
    }
    throw new Error("Division By Zero");
  }
  mod(a: number, b: number): number {
    return a % b;
  }
}

let calculator1: Calculator = new Calculator();
console.log(calculator1.add(35.31, 441.1));
console.log(calculator1.multiply(3, 4));
console.log(calculator1.divide(20.8, 4));
