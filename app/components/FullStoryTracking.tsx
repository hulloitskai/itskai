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
        const { id, email, name } = currentUser;
        FullStory("setIdentityAsync", {
          uid: id,
          properties: { email, displayName: name },
          anonymous: false,
        });
      } else {
        FullStory("setIdentityAsync", { anonymous: true });
      }
    }
  }, [currentUser]);

  // == Page tracking
  useEffect(() => {
    if (isFsInitialized()) {
      FullStory("setPropertiesAsync", {
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
