export class MathExtra {
  public static round(value: number, decimalPlace: number = 0): number {
    const rounded = Math.round(
      Number(`${value.toFixed(decimalPlace + 2)}e${decimalPlace}`),
    );
    return Number(`${rounded}e-${decimalPlace}`);
  }
}
