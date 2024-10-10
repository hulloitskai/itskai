import { FullStory } from "@fullstory/browser";

const FullStoryTracking: FC = () => {
  const {
    component,
    props: { currentUser },
  } = usePage();

  // == Current user tracking
  useEffect(() => {
    if (isFsInitialized()) {
      if (currentUser) {
        const { email, id, name } = currentUser;
        void FullStory("setIdentityAsync", {
          uid: id,
          properties: { email, displayName: name },
          anonymous: false,
        });
      } else {
        void FullStory("setIdentityAsync", { anonymous: true });
      }
    }
  }, [currentUser?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // == Page tracking
  useEffect(() => {
    if (isFsInitialized()) {
      void FullStory("setPropertiesAsync", {
        type: "page",
        properties: {
          pageName: component,
        },
      });
    }
  }, [component]);

  return null;
};

export default FullStoryTracking;
