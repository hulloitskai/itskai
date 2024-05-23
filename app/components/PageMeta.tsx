import type { FC } from "react";
import { SharedPageProps } from "~/helpers/inertia";

const PageMeta: FC = () => {
  const { props } = usePage<SharedPageProps>();
  const { csrf } = props;
  return (
    <Head>
      <meta name="csrf-param" content={csrf.param} />
      <meta name="csrf-token" content={csrf.token} />
    </Head>
  );
};

export default PageMeta;
