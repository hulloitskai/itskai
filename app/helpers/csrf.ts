export const useCSRFToken = (): string => {
  const {
    csrf: { token },
  } = usePageProps();
  return token;
};
