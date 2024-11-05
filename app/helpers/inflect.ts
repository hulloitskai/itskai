export const sentencify = (message: string): string => {
  if (!message) {
    return "";
  }
  if (message.endsWith(".")) {
    return message;
  }
  return `${message}.`;
};
