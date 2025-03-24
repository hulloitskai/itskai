const PageMeta: FC = () => {
  const { csrf } = usePageProps();
  return (
    <Head>
      <meta head-key="csrf-param" name="csrf-param" content={csrf.param} />
      <meta head-key="csrf-token" name="csrf-token" content={csrf.token} />
    </Head>
  );
};

export default PageMeta;
