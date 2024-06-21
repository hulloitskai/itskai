export interface FormAuthenticityFieldProps
  extends ComponentPropsWithoutRef<"input"> {}

const FormAuthenticityField: FC<FormAuthenticityFieldProps> = props => {
  const { csrf } = usePageProps();
  const { param, token } = csrf;
  return <input type="hidden" name={param} value={token} {...props} />;
};

export default FormAuthenticityField;
