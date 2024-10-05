export const sentencify = (message: string): string => {
  if (message.endsWith(".")) {
    return message;
  }
  return `${message}.`;
};
