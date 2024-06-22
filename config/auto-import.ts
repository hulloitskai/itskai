import { InlinePreset } from "unimport";
import type { ImportsMap, PresetName } from "unplugin-auto-import/types";

export const imports: Array<ImportsMap | PresetName | InlinePreset> = [
  // == Presets
  "react",

  // == Exports
  {
    "~/components": ["AnchorContainer", "EmptyCard", "Head", "Time", "TimeAgo"],
    "~/components/icons": [
      "AddIcon",
      "RemoveIcon",
      "AlertIcon",
      "SuccessIcon",
      "CreateIcon",
      "DeleteIcon",
      "EditIcon",
      "OpenExternalIcon",
      "SaveIcon",
      "SearchIcon",
      "SettingsIcon",
      "UserIcon",
      "AuthenticateIcon",
      "DeactivateIcon",
      "ClipboardIcon",
      "CancelIcon",
      "SendIcon",
    ],
    "~/helpers/actioncable": ["useCable"],
    "~/helpers/actioncable/subscription": ["useSubscription"],
    "~/helpers/authentication": ["useAuthenticatedUser"],
    "~/helpers/errors": ["formatError"],
    "~/helpers/inertia/layout": ["buildLayout"],
    "~/helpers/inertia/page": ["usePage", "usePageProps"],
    "~/helpers/inertia/form": ["useInertiaForm"],
    "~/helpers/inflect": [
      "camelizeKeys",
      "underscoreKeys",
      "deepCamelizeKeys",
      "deepUnderscoreKeys",
    ],
    "~/helpers/json": ["formatJSON"],
    "~/helpers/luxon": ["useParseDateTime"],
    "~/helpers/meta": ["getMeta", "requireMeta"],
    "~/helpers/notifications": ["showNotice", "showAlert"],
    "~/helpers/routes": [["default", "routes"]],
    "~/helpers/fetch": ["useFetch"],
    "~/helpers/fetch/form": ["useFetchForm"],
    "~/helpers/form": ["useFieldFilled", "useFormFilled", "useFormDirty"],
    "~/helpers/utils": ["resolve", "isTruthy"],
    "@fullstory/browser": ["FullStory", ["isInitialized", "isFsInitialized"]],
    "@inertiajs/react": ["Link", "router"],
    "@mantine/core": [
      "rem",
      "useMantineTheme",
      "useMantineColorScheme",
      "getThemeColor",
      "parseThemeColor",
      "Alert",
      "Anchor",
      "Badge",
      "Box",
      "Button",
      "Card",
      "Center",
      "Checkbox",
      "Chip",
      "Container",
      "Divider",
      "Flex",
      "Group",
      "List",
      "LoadingOverlay",
      "Menu",
      "Skeleton",
      "Space",
      "Stack",
      "Text",
      "Textarea",
      "TextInput",
      "Title",
      "Tooltip",
      "Transition",
    ],
    "@mantine/form": ["useForm"],
    "@mantine/hooks": [
      "useDebouncedValue",
      "useDebouncedCallback",
      "useDidUpdate",
      "useElementSize",
      "useLogger",
      "useMediaQuery",
      "useViewportSize",
      "useWindowEvent",
    ],
    "@mantine/notifications": ["showNotification"],
    "@mantine/modals": ["openModal", "closeAllModals"],
    clsx: [["clsx", "cx"]],
    "lodash-es": [
      "first",
      "last",
      "get",
      "identity",
      "isEmpty",
      "isEqual",
      "isNil",
      "isUndefined",
      "keyBy",
      "mapKeys",
      "mapValues",
      "omit",
      "omitBy",
      "pick",
      "take",
      "uniqBy",
    ],
    "@uidotdev/usehooks": ["usePrevious", "useIsClient"],
    luxon: ["DateTime", "Duration"],
    "tiny-invariant": [["default", "invariant"]],
  },

  // == Types
  {
    from: "react",
    imports: ["ComponentPropsWithoutRef", "FC", "PropsWithChildren"],
    type: true,
  },
  {
    from: "@mantine/core",
    imports: ["BoxProps"],
    type: true,
  },
  {
    from: "~/helpers/inertia",
    imports: ["PageComponent"],
    type: true,
  },
  {
    from: "~/types/SharedPageProps",
    imports: [["default", "SharedPageProps"]],
    type: true,
  },
];
