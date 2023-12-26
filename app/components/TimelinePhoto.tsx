import type { FC } from "react";
import { Image, ImageProps } from "@mantine/core";

import type { TimelinePhotoFragment } from "~/helpers/graphql";

type TimelinePhotoProps = ImageProps & {
  readonly photo: TimelinePhotoFragment;
};

const TimelinePhoto: FC<TimelinePhotoProps> = ({
  photo: { id, image },
  ...otherProps
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setTimeout(() => {
      setMounted(false);
    }, 8000);
  }, []);
  const size = 540;
  const key = useMemo(() => Math.floor(Math.random() * 1_000_000), [id]);
  const rotation = useMemo(() => Math.floor(key % 18), [key]);
  const xOffset = useMemo(() => Math.floor(key % 60), [key]);
  const yOffset = useMemo(() => Math.floor((key + 30) % 80), [key]);
  const corner = useMemo(() => Math.floor(key % 4), [key]);
  return (
    <Transition transition="pop" {...{ mounted }}>
      {style => (
        <Image
          pos="absolute"
          w={size}
          h={size}
          fit="contain"
          src={image.url}
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

export default TimelinePhoto;
