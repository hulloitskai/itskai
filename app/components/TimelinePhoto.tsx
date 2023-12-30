import type { FC } from "react";
import { Image, ImageProps } from "@mantine/core";

import type { TimelinePhotoFragment } from "~/helpers/graphql";
import { DateTime } from "luxon";

type TimelinePhotoProps = ImageProps & {
  readonly photo: TimelinePhotoFragment;
  readonly timestamp: DateTime;
};

let lastCorner = 0;

const getNextCorner = () => {
  lastCorner = (lastCorner + 1) % 4;
  return lastCorner;
};

const TimelinePhoto: FC<TimelinePhotoProps> = ({
  photo,
  timestamp,
  ...otherProps
}) => {
  const { id: photoId, image } = photo;
  const takenAt = useParseDateTime(photo.takenAt);
  const hideAt = useMemo(() => takenAt.plus({ hours: 3 }), [takenAt]);
  const mounted = useMemo(
    () => timestamp > takenAt && timestamp < hideAt,
    [timestamp, takenAt, hideAt],
  );
  const size = 540;
  const [corner] = useState(getNextCorner);
  const key = useMemo(() => Math.floor(Math.random() * 1_000_000), [photoId]);
  const rotation = useMemo(() => Math.floor(key % 18), [key]);
  const xOffset = useMemo(() => Math.floor(key % 60), [key]);
  const yOffset = useMemo(() => Math.floor((key + 30) % 60), [key]);
  return (
    <Transition transition="pop" {...{ mounted }}>
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

export default TimelinePhoto;
