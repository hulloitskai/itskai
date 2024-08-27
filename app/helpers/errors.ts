export const formatError = ({ message }: Error): string => {
  message = message.charAt(0).toUpperCase() + message.slice(1);
  if (!!message && !message.endsWith(".")) {
    message += ".";
  }
  return message;
};
