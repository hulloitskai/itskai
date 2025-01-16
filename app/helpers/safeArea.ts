import { useViewportSize } from "@mantine/hooks";

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const useSafeViewportRect = (): Rect | undefined => {
  const [rect, setRect] = useState<Rect | undefined>();
  const viewport = useViewportSize();
  const standalone = useMediaQuery("(display-mode: standalone)");
  useEffect(() => {
    if (!standalone) {
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
    const width = viewport.width - leftInset - rightInset;
    const height = viewport.height - topInset - bottomInset;
    setRect({ x: leftInset, y: topInset, width, height });
  }, [viewport, standalone]);
  return rect;
};

const getPixels = (value: string): number =>
  CSSNumericValue.parse(value).to("px").value;
