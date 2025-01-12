import { useWebPush } from "~/helpers/webPush";

export interface FriendAutoPushRegistrationProps {
  friendToken: string;
}

const FriendAutoPushRegistration: FC<FriendAutoPushRegistrationProps> = ({
  friendToken,
}) => {
  const { subscribe, registration } = useWebPush();
  useEffect(
    () => {
      if (registration === null) {
        void subscribe(friendToken);
      }
    },
    [registration], // eslint-disable-line react-hooks/exhaustive-deps
  );
  return null;
};

export default FriendAutoPushRegistration;
