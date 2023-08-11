import type { FC } from "react";

const FormAuthenticityField: FC = () => {
  const { csrf } = usePageProps();
  const { param, token } = csrf;
  return <input type="hidden" name={param} value={token} />;
};

export default FormAuthenticityField;
