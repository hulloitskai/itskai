import type { FC } from "react";

const FormAuthenticityField: FC = () => {
  const {
    csrf: { param, token },
  } = usePageProps();
  return <input type="hidden" name={param} value={token} />;
};

export default FormAuthenticityField;
