export function compute(parent: number, op: string, child: number): number {
  switch (op) {
    case '+': return parent + child;
    case '-': return parent - child;
    case '*': return parent * child;
    case '/':
      if (child === 0) throw new Error('Division by zero');
      return parent / child;
    default:
      throw new Error('Invalid operation');
  }
}