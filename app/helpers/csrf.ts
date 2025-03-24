export const useCSRFToken = (): string => {
  const { csrf } = usePageProps();
  return csrf.token;
};

export const isCSRFError = (error: any): boolean =>
  typeof error === "string" && error.includes("CSRF");
