const TRUTHY_VALUES = ["1", "true", "t"];

export const isTruthy = (value: any): boolean => {
  switch (typeof value) {
    case "string":
      return TRUTHY_VALUES.includes(value.toLowerCase());
    case "number":
      return Number.isFinite(value) && value > 0;
    case "boolean":
      return value;
    default:
      return false;
  }
};

export const resolve = <T>(f: () => T): T => f();
