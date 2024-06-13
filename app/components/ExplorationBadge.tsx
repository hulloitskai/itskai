import type { ComponentPropsWithoutRef, FC } from "react";
import type { BoxProps } from "@mantine/core";
// import { waitForTheElement } from "wait-for-the-element";
// import scrollIntoView from "scroll-into-view";

// import classes from "./ExplorationBadge.module.css";

export interface ExplorationBadgeProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children"> {
  children: string;
}

const ExplorationBadge: FC<ExplorationBadgeProps> = ({
  children,
  ...otherProps
}) => {
  // // == Sending Message
  // const onSendMessageError = useApolloAlertCallback("Failed to send message");
  // const [sendMessage, { loading: messageSending }] = useMutation(
  //   SendPensieveMessageMutationDocument,
  //   {
  //     onError: onSendMessageError,
  //     onCompleted: () => {
  //       waitForTheElement("#pensieve", {
  //         timeout: 5000,
  //       }).then(el => {
  //         if (el instanceof HTMLElement) {
  //           scrollIntoView(el, () => {
  //             showNotice({
  //               title: "Message sent to Kai!",
  //               message:
  //                 "Feel free to continue messaging him, he'll get back to you soon :)",
  //             });
  //           });
  //         }
  //       });
  //     },
  //   },
  // );

  return (
    <Box pos="relative" {...otherProps}>
      <Tooltip
        label="Have some thoughts to share?"
        color="primary"
        withArrow
        openDelay={200}
        disabled
      >
        <Badge
          variant="default"
          size="lg"
          fw={600}
          // className={classes.badge}
          h="unset"
          py={4}
          styles={{
            root: {
              cursor: "not-allowed",
            },
            label: {
              whiteSpace: "unset",
              lineHeight: 1.4,
            },
          }}
          // onClick={() => {
          //   sendMessage({
          //     variables: {
          //       input: {
          //         text: `i've been thinking abt ${children}`,
          //       },
          //     },
          //   });
          // }}
        >
          {children}
        </Badge>
      </Tooltip>
      {/* <LoadingOverlay
        loaderProps={{ size: "xs" }}
        overlayProps={{ radius: "lg" }}
        visible={messageSending}
      /> */}
    </Box>
  );
};

export default ExplorationBadge;
