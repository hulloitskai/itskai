import { useViewportSize } from "@mantine/hooks";

import "./safeArea.css";

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const useSafeViewportRect = (): Rect | undefined => {
  const [rect, setRect] = useState<Rect | undefined>();
  const mobileStandalone = useMediaQuery(
    "(display-mode: standalone) and (pointer: coarse)",
  );
  const viewport = useViewportSize();
  useEffect(() => {
    // Only detect safe area when in mobile standalone mode.
    if (!mobileStandalone) {
      setRect(undefined);
      return;
    }

    // If all insets are 0, keep the safe area viewport undefined.
    const insets = getSafeAreaInsets();
    if (!Object.values(insets).some(Boolean)) {
      setRect(undefined);
      return;
    }

    const x = insets.left;
    const y = insets.top;
    const width = viewport.width - insets.left - insets.right;
    const height = viewport.height - insets.top - insets.bottom;
    setRect({ x, y, width, height });
  }, [mobileStandalone, viewport]);
  return rect;
};

interface Insets {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

const getSafeAreaInsets = (): Insets => {
  const documentStyle = getComputedStyle(document.documentElement);
  const initialInsets = { left: 0, top: 0, right: 0, bottom: 0 };
  return mapValues(initialInsets, (_, side) =>
    getPixels(documentStyle.getPropertyValue(`--safe-area-inset-${side}`)),
  );
};

const getPixels = (value: string): number =>
  CSSNumericValue.parse(value).to("px").value;
