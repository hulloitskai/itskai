import type { FC } from "react";

const PageMeta: FC = () => {
  const { csrf } = usePageProps();
  return (
    <Head>
      <meta name="csrf-param" content={csrf.param} />
      <meta name="csrf-token" content={csrf.token} />
    </Head>
  );
};

export default PageMeta;
