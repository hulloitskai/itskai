import type { ImportsMap, PresetName } from "unplugin-auto-import/types";

export const imports: Array<ImportsMap | PresetName> = [
  "react",
  {
    "~/components": [
      "AppLayout",
      "AnchorContainer",
      "Empty",
      "Head",
      "PageHeader",
      "Time",
    ],
    "~/components/icons": [
      "AddIcon",
      "AlertIcon",
      "CheckCircleIcon",
      "CreateIcon",
      "DeleteIcon",
      "DashboardIcon",
      "EditIcon",
      "OpenExternalIcon",
      "SaveIcon",
      "SearchIcon",
      "SettingsIcon",
      "UserIcon",
    ],
    "~/helpers/apollo/preloading": ["usePreloadedQuery"],
    "~/helpers/apollo/errors": ["formatApolloError", "useApolloAlertCallback"],
    "~/helpers/form": ["parseFormErrors", "showFormErrorsAlert"],
    "~/helpers/inertia/layout": ["buildLayout"],
    "~/helpers/inertia/page": ["usePage", "usePageErrors", "usePageProps"],
    "~/helpers/inertia/router": ["useRouter"],
    "~/helpers/luxon": ["useParseDateTime"],
    "~/helpers/meta": ["getMeta", "requireMeta"],
    "~/helpers/notifications": ["showNotice", "showAlert"],
    "~/helpers/react": ["useMounted"],
    "~/helpers/utils": [
      "resolve",
      "formatJSON",
      "formatError",
      "isUrl",
      "usePrevious",
    ],
    "@apollo/client": [
      "useApolloClient",
      "useQuery",
      "useLazyQuery",
      "useSubscription",
      "useMutation",
    ],
    "@fullstory/browser": [
      ["setVars", "setFSVars"],
      ["isInitialized", "isFSInitialized"],
    ],
    "@inertiajs/react": ["Link"],
    "@mantine/core": [
      "packSx",
      "rem",
      "useMantineTheme",
      "useMantineColorScheme",
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
      "MediaQuery",
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
      "useDidUpdate",
      "useElementSize",
      "useLogger",
      "useMediaQuery",
      "useViewportSize",
      "useWindowEvent",
    ],
    "@mantine/notifications": ["showNotification"],
    "@mantine/modals": ["openModal", "closeAllModals"],
    "lodash-es": [
      "first",
      "get",
      "isEmpty",
      "isEqual",
      "keyBy",
      "mapKeys",
      "mapValues",
      "omit",
      "pick",
      "take",
      "uniqBy",
    ],
    luxon: ["DateTime", "Duration"],
    "tiny-invariant": [["default", "invariant"]],
  },
];
