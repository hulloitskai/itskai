export const formatError = ({ message }: Error): string => {
  const capitalizedMessage = message.charAt(0).toUpperCase() + message.slice(1);
  return capitalizedMessage + (message.endsWith(".") ? "" : ".");
};
