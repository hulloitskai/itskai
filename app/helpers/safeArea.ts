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
    if (!mobileStandalone) {
      setRect(undefined);
      return;
    }

    const documentStyle = getComputedStyle(document.documentElement);
    const [leftInset, topInset, rightInset, bottomInset] = [
      "left",
      "top",
      "right",
      "bottom",
    ].map(side =>
      getPixels(documentStyle.getPropertyValue(`--safe-area-inset-${side}`)),
    ) as [number, number, number, number];
    if (!leftInset && !topInset && !rightInset && !bottomInset) {
      setRect(undefined);
      return;
    }

    const x = leftInset;
    const y = topInset;
    const width = viewport.width - leftInset - rightInset;
    const height = viewport.height - topInset - bottomInset;
    setRect({ x, y, width, height });
  }, [mobileStandalone, viewport]);
  return rect;
};

const getPixels = (value: string): number =>
  CSSNumericValue.parse(value).to("px").value;
