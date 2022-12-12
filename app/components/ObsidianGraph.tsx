import type { FC } from "react";

import { Affix } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import { drag } from "d3-drag";
import type { D3DragEvent } from "d3-drag";
import {
  forceSimulation,
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceX,
  forceY,
} from "d3-force";
import type {
  SimulationNodeDatum as BaseNode,
  SimulationLinkDatum as BaseLink,
} from "d3-force";
import { select } from "d3-selection";

import ObsidianGraphInfoCard from "./ObsidianGraphInfoCard";

import type {
  ObsidianGraphEntryFragment,
  ObsidianGraphNoteFragment,
} from "~/queries";

type Node = BaseNode &
  ObsidianGraphEntryFragment & {
    radius: number;
    isDragging?: boolean;
  };
type Link = BaseLink<Node>;
type DragEvent = D3DragEvent<HTMLElement, Node, Node>;

const NodeRadiusMinSize = 4;
const NodeRadiusMaxSize = 30;
const NodeRadiusMultiplier = 0.3;
const LinkForce = 0.02;
const BodyForce = -350;
const BodyForceMaxDistance = 250;

export type ObsidianGraphProps = BoxProps & {
  readonly entries: ReadonlyArray<ObsidianGraphEntryFragment> | undefined;
  readonly loading?: boolean;
  readonly hasMore?: boolean;
  readonly fetchMore?: () => void;
};

const ObsidianGraph: FC<ObsidianGraphProps> = ({
  entries,
  loading = false,
  hasMore = false,
  fetchMore,
  sx,
  ...otherProps
}) => {
  const router = useRouter();

  const { ref: containerRef, width, height } = useElementSize<HTMLDivElement>();
  const size = useMemo(() => [width, height], [width, height]);
  const [debouncedSize] = useDebouncedValue(size, 500);
  const renderSize = useMemo(
    () => (isEqual(debouncedSize, [0, 0]) ? size : debouncedSize),
    [size, debouncedSize],
  );
  const svgRef = useRef<SVGSVGElement>(null);

  const [focusedEntry, setFocusedEntry] =
    useState<ObsidianGraphEntryFragment | null>(null);
  if (!import.meta.env.SSR) {
    useEffect(() => {
      const { current: target } = svgRef;
      const [width, height] = renderSize;
      if (target && entries && width && height) {
        requestAnimationFrame(() => {
          renderGraph(target, {
            entries,
            onFocus: setFocusedEntry,
            onBlur: () => setFocusedEntry(null),
            onClick: ({ url }) => {
              router.visit(url);
            },
          });
        });
        return () => {
          requestAnimationFrame(() => {
            clearGraph(target);
          });
        };
      }
    }, [svgRef.current, renderSize, entries]);
  }

  return (
    <>
      <Box
        ref={containerRef}
        pos="relative"
        h={560}
        sx={[
          ({ colors, fontSizes, fn }) => ({
            "> svg": {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              ".node": {
                transitionProperty: "fill-opacity",
                transitionTimingFunction: "ease-in-out",
                transitionDuration: "150ms",
                circle: {
                  fill: colors.dark[3],
                  transitionProperty: "fill",
                  transitionTimingFunction: "ease-in-out",
                  transitionDuration: "150ms",
                },
                text: {
                  pointerEvents: "none",
                  fill: colors.gray[6],
                  fontSize: fontSizes.xs,
                  fontWeight: 500,
                  transitionProperty: "fill",
                  transitionTimingFunction: "ease-in-out",
                  transitionDuration: "150ms",
                },
                "&:not(.focused)": {
                  "&.person": {
                    circle: {
                      fill: colors.pink[4],
                    },
                  },
                  "&.day, &.month": {
                    circle: {
                      fill: colors.gray[2],
                      stroke: colors.gray[4],
                    },
                  },
                  "&.place": {
                    circle: {
                      fill: colors.orange[4],
                    },
                  },
                  "&.event": {
                    circle: {
                      fill: colors.red[4],
                    },
                  },
                },
                "&.focused": {
                  circle: {
                    fill: colors.indigo[fn.primaryShade()],
                  },
                  text: {
                    fill: colors.gray[8],
                  },
                },
                "&.dimmed": {
                  "&:not(.day):not(.month)": {
                    fillOpacity: 0.15,
                  },
                  "&.day, &.month": {
                    fillOpacity: 0.3,
                    strokeOpacity: 0.3,
                  },
                },
                "&.note": {
                  cursor: "pointer",
                },
              },
              ".link": {
                stroke: colors.gray[3],
                strokeWidth: 1.5,
                strokeOpacity: 0.7,
                transitionProperty: "stroke-opacity",
                transitionTimingFunction: "ease-in-out",
                transitionDuration: "150ms",
              },
              ".link.focused": {
                stroke: colors.indigo[3],
                strokeOpacity: 1,
              },
              ".link.dimmed": {
                strokeOpacity: 0.2,
              },
            },
          }),
          ...packSx(sx),
        ]}
        {...otherProps}
      >
        <LoadingOverlay visible={loading} loaderProps={{ size: "md" }} />
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          {...{ width, height }}
        />
        <Center pos="absolute" left={0} bottom={20} right={0}>
          <Transition transition="slide-up" mounted={hasMore && !!fetchMore}>
            {style => (
              <Button
                variant="default"
                size="xs"
                compact
                onClick={() => {
                  invariant(fetchMore);
                  fetchMore();
                }}
                {...{ style }}
              >
                Show More
              </Button>
            )}
          </Transition>
        </Center>
      </Box>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={!!focusedEntry}>
          {style => (
            <>
              {focusedEntry && (
                <ObsidianGraphInfoCard entry={focusedEntry} {...{ style }} />
              )}
            </>
          )}
        </Transition>
      </Affix>
    </>
  );
};

export default ObsidianGraph;

const nodeRadius = (note: ObsidianGraphEntryFragment): number => {
  let referenceCount = note.referencedBy.length;
  if (note.type === "ObsidianNote") {
    referenceCount += note.references.length;
  }
  const size = NodeRadiusMinSize + referenceCount * NodeRadiusMultiplier;
  return Math.min(size, NodeRadiusMaxSize);
};

const nodeLinks = (node: Node, validNodeIds: Set<string>): Link[] => {
  const { id: target } = node;
  return node.referencedBy
    .filter(({ id }) => validNodeIds.has(id))
    .map(({ id: source }) => ({ source, target }));
};

type RenderGraphOptions = {
  readonly entries: ReadonlyArray<ObsidianGraphEntryFragment>;
  readonly onFocus: (entry: ObsidianGraphEntryFragment) => void;
  readonly onBlur: (entry: ObsidianGraphEntryFragment) => void;
  readonly onClick: (entry: ObsidianGraphNoteFragment) => void;
};

const renderGraph = (
  target: SVGSVGElement,
  { entries, onFocus, onBlur, onClick }: RenderGraphOptions,
) => {
  const { width, height } = target.getBoundingClientRect();
  const svg = select(target);
  let isDragging = false;

  // Construct nodes and links
  const nodes = entries.map<Node>(entry => ({
    ...entry,
    radius: nodeRadius(entry),
  }));
  const validNodeIds = new Set(nodes.map(({ id }) => id));
  const links = nodes.flatMap(node => nodeLinks(node, validNodeIds));

  // Define arrowhead
  // svg
  //   .append("svg:defs")
  //   .append("svg:marker")
  //   .attr("id", "arrowhead")
  //   .attr("refX", 6)
  //   .attr("refY", 6)
  //   .attr("markerWidth", 30)
  //   .attr("markerHeight", 30)
  //   .attr("orient", "auto")
  //   .append("path")
  //   .attr("d", "M 0 0 12 6 0 12 3 6")
  //   .style("fill", "black");

  // Draw link lines
  const linkLines = svg
    .selectAll(".link")
    .data(links)
    .join("line")
    .classed("link", true);
  // .attr("marker-end", "url(#arrowhead)");

  // Draw node groups
  const nodeGroups = svg
    .selectAll(".node")
    .data(nodes)
    .join("g")
    .attr("class", node => {
      let classes = [];
      switch (node.type) {
        case "ObsidianNote":
          classes = ["note", ...node.tags];
          break;
        case "ObsidianStub":
          classes = ["stub"];
          break;
      }
      return ["node", ...classes].join(" ");
    });

  // Draw node circles
  nodeGroups
    .append("circle")
    .attr("r", ({ radius }) => radius)
    .on("mouseover", (event, node) => {
      if (!isDragging) {
        nodeGroups.classed("focused", ({ id }) => id === node.id);
        linkLines.classed("focused", ({ source, target }) => {
          return [source, target].includes(node);
        });
        nodeGroups.classed(
          "dimmed",
          otherNode =>
            otherNode.id !== node.id &&
            !otherNode.referencedBy.some(({ id }) => id === node.id) &&
            !node.referencedBy.some(({ id }) => id === otherNode.id),
        );
        linkLines.classed(
          "dimmed",
          ({ source, target }) => ![source, target].includes(node),
        );
        onFocus(node);
      }
    })
    .on("mouseout", (event, node) => {
      if (!isDragging) {
        nodeGroups.classed("focused", false);
        linkLines.classed("focused", false);
        nodeGroups.classed("dimmed", false);
        linkLines.classed("dimmed", false);
        onBlur(node);
      }
    })
    .on("click", (event: MouseEvent, node) => {
      if (event.altKey) {
        const { name } = node;
        navigator.clipboard.writeText(name).then(() => {
          showNotice({
            title: "Copied note name!",
            message: name,
          });
        });
      } else {
        if (node.type === "ObsidianNote") {
          onClick(node);
        }
      }
    });

  // Draw node labels
  nodeGroups
    .append("text")
    .text(({ displayName }) => displayName)
    .attr("text-anchor", "middle")
    .attr("dy", ({ radius }) => radius + 15);

  // Configure force simulation
  const simulation = forceSimulation(nodes)
    .force(
      "link",
      forceLink<Node, Link>(links)
        .id(({ id }) => id)
        .strength(LinkForce)
        .iterations(2),
    )
    .force(
      "collide",
      forceCollide<Node>(({ radius }) => radius)
        .strength(0.5)
        .iterations(1),
    )
    .force(
      "charge",
      forceManyBody().strength(BodyForce).distanceMax(BodyForceMaxDistance),
    )
    .force("center", forceCenter(width / 2, height / 2))
    .force("gravity.x", forceX(width / 2))
    .force("gravity.y", forceY(height / 2))
    .on("tick", () => {
      nodeGroups.attr("transform", ({ x, y }) => `translate(${x}, ${y})`);
      linkLines
        .attr("x1", ({ source }) => (source as Node).x!)
        .attr("y1", ({ source }) => (source as Node).y!)
        .attr("x2", ({ target }) => (target as Node).x!)
        .attr("y2", ({ target }) => (target as Node).y!);
    })
    .alpha(1)
    .restart();

  // Configure dragging interactions
  nodeGroups.call(
    drag()
      .on("start", ({ active, subject }: DragEvent) => {
        isDragging = true;
        if (!active) {
          simulation.alphaTarget(0.3).restart();
        }
        subject.isDragging = true;
        subject.fx = subject.x;
        subject.fy = subject.y;
      })
      .on("drag", ({ subject, x, y }: DragEvent) => {
        subject.fx = x;
        subject.fy = y;
      })
      .on("end", ({ active, subject }: DragEvent) => {
        isDragging = false;
        if (!active) {
          simulation.alphaTarget(0);
        }
        subject.isDragging = false;
        subject.fx = null;
        subject.fy = null;
      }) as any,
  );
};

const clearGraph = (target: SVGSVGElement) => {
  select(target).selectChildren().remove();
};
