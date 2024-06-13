import type { ComponentPropsWithoutRef, FC } from "react";
import { usePresence } from "framer-motion";

import type { ImageProps } from "@mantine/core";
import { Image } from "@mantine/core";

type TimelinePhotoFragment = any;

export interface TimelinePagePhotoProps
  extends ImageProps,
    Omit<ComponentPropsWithoutRef<"img">, "src" | "style" | "children"> {
  photo: TimelinePhotoFragment;
}

let lastCorner = 0;

const getNextCorner = () => {
  lastCorner = (lastCorner + 1) % 4;
  return lastCorner;
};

const TimelinePagePhoto: FC<TimelinePagePhotoProps> = ({
  photo: { image },
  ...otherProps
}) => {
  // == Transition
  const [mounted, setMounted] = useState(false);
  const [present, safeToRemove] = usePresence();
  useEffect(() => {
    if (present) {
      setMounted(true);
    } else {
      setMounted(false);
    }
  }, [present]);

  const size = 540;
  const [corner] = useState(getNextCorner);
  const [key] = useState(() => Math.floor(Math.random() * 1_000_000));
  const rotation = useMemo(() => Math.floor(key % 18), [key]);
  const xOffset = useMemo(() => Math.floor(key % 60), [key]);
  const yOffset = useMemo(() => Math.floor((key + 30) % 60), [key]);
  return (
    <Transition
      transition="pop"
      onExited={() => {
        safeToRemove?.();
      }}
      {...{ mounted }}
    >
      {style => (
        <Image
          pos="absolute"
          w={size}
          h={size}
          fit="contain"
          src={image.src}
          style={[
            style,
            { rotate: `${corner % 2 == 0 ? rotation : -rotation}deg` },
          ]}
          {...(corner === 0 && { left: xOffset, top: yOffset })}
          {...(corner === 1 && { right: xOffset, top: yOffset })}
          {...(corner === 2 && { right: xOffset, bottom: yOffset })}
          {...(corner === 3 && { left: xOffset, bottom: yOffset })}
          {...otherProps}
        />
      )}
    </Transition>
  );
};

export default TimelinePagePhoto;
