import type { FC } from "react";

// import { select } from "d3-selection";
// import { drag, D3DragEvent } from "d3-drag";
// import {
//   forceCenter,
//   forceCollide,
//   forceLink,
//   forceManyBody,
//   forceSimulation,
// } from "d3-force";

// import type { ObsidianGraphNoteFragment } from "~/queries";

const ObsidianGraph: FC = () => {
  const {
    ref: containerRef,
    width: containerWidth,
    height: containerHeight,
  } = useElementSize<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement>(null);

  if (!import.meta.env.SSR) {
    useLayoutEffect(() => {
      if (!containerRef.current) {
        return;
      }
    }, []);
  }

  return (
    <Box
      ref={containerRef}
      h={400}
      sx={({ colors }) => ({
        ".node": {
          transitionProperty: "fill-opacity",
          transitionTimingFunction: "ease-in-out",
          transitionDuration: "200ms",
        },
        ".node.faded": {
          fillOpacity: 0.15,
        },
        ".node circle": {
          cursor: "pointer",
          fill: colors.gray[7],
          transitionProperty: "fill",
          transitionTimingFunction: "ease-in-out",
          transitionDuration: "200ms",
        },
        ".node text": {
          pointerEvents: "none",
          fill: colors.gray[6],
          fontSize: "xs",
          transitionProperty: "fill",
          transitionTimingFunction: "ease-in-out",
          transitionDuration: "200ms",
        },
        ".node.focused circle": {
          fill: colors.indigo[5],
        },
        ".node.focused text": {
          fill: colors.gray[8],
        },
        ".node.highlighted:not(.focused) circle": {
          fill: "yellow.400",
        },
        // ".node.person:not(.highlighted):not(.focused) circle": {
        //   fill: "rgb(233, 100, 166)",
        // },
        // ".node.day:not(.highlighted):not(.focused) circle": {
        //   fill: "rgb(123, 159, 216)",
        // },
        // ".node.week:not(.highlighted):not(.focused) circle": {
        //   fill: "rgb(65, 101, 210)",
        // },
        // ".node.month:not(.highlighted):not(.focused) circle": {
        //   fill: "rgb(16, 39, 113)",
        // },
        ".link": {
          stroke: colors.gray[3],
          strokeWidth: 1.5,
          strokeOpacity: 0.5,
          transitionProperty: "stroke-opacity",
          transitionTimingFunction: "ease-in-out",
          transitionDuration: "200ms",
        },
        ".link.focused": {
          stroke: "purple.300",
          strokeOpacity: 1,
        },
        ".link.faded": {
          strokeOpacity: 0.3,
        },
      })}
    >
      <svg
        ref={svgRef}
        style={{ width: containerWidth, height: containerHeight }}
      />
    </Box>
  );
};

// const nodeRadius = (note?: ObsidianGraphNoteFragment): number => {
//   const { incoming, outgoing } = entry?.links ?? {};
//   const radius =
//     (incoming && outgoing ? incoming.length + outgoing.length : 0) * 0.25 + 4;
//   if (highlightedEntryId && entry) {
//     if (highlightedEntryId === entry.id && radius < 10) {
//       return 12;
//     }
//   }
//   return radius;
// };

export default ObsidianGraph;
