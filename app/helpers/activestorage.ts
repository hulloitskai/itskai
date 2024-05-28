import { start } from "@rails/activestorage?client";

export const setupActiveStorage = (): void => {
  start();
};
