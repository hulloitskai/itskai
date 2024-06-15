import { camelCase, snakeCase } from "lodash-es";

export const transformKeys = (
  object: Record<string, any>,
  transform: (key: string) => string,
): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [transform(key), value]),
  );
};

export const underscoreKeys = (
  object: Record<string, any>,
): Record<string, any> => {
  return transformKeys(object, snakeCase);
};

export const camelizeKeys = (
  object: Record<string, any>,
): Record<string, any> => {
  return transformKeys(object, camelCase);
};

export const deepTransformKeys = (
  object: Record<string, any>,
  transform: (key: string) => string,
): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      if (typeof value === "object") {
        if (Array.isArray(value)) {
          value = value.map(item => deepTransformKeys(item, transform));
        } else if (value) {
          value = deepTransformKeys(value, transform);
        }
      }
      return [transform(key), value];
    }),
  );
};

export const deepUnderscoreKeys = (
  object: Record<string, any>,
): Record<string, any> => {
  return deepTransformKeys(object, snakeCase);
};

export const deepCamelizeKeys = (
  object: Record<string, any>,
): Record<string, any> => {
  return deepTransformKeys(object, camelCase);
};
