import type { FC, RefObject } from "react";
import { Affix, Text } from "@mantine/core";
import type { BoxProps, CardProps } from "@mantine/core";

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

import {
  HomePageObsidianNoteFragment,
  HomePageGraphQueryDocument,
} from "~/queries";

import ClockIcon from "~icons/heroicons/clock-20-solid";

type Node = BaseNode &
  HomePageObsidianNoteFragment & {
    radius: number;
    isDragging?: boolean;
  };
type Link = BaseLink<Node>;
type DragEvent = D3DragEvent<HTMLElement, Node, Node>;

const NODE_RADIUS_MIN_SIZE = 4;
const NODE_RADIUS_MAX_SIZE = 30;
const NODE_RADIUS_MULTIPLIER = 0.3;
const LINK_FORCE = 0.02;
const BODY_FORCE = -350;
const BODY_FORCE_MAX_DISTANCE = 250;
const TAG_COLORS: Record<string, string> = {
  person: "pink",
  day: "gray",
  place: "orange",
  event: "red",
};

export type HomePageGraphProps = BoxProps;

const HomePageGraph: FC<HomePageGraphProps> = ({ sx, ...otherProps }) => {
  const { ref: containerRef, width, height } = useElementSize<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement>(null);

  const onError = useApolloErrorCallback("Failed to load Obsidian entries");
  const { data, loading } = useQuery(HomePageGraphQueryDocument, {
    variables: {},
    onError,
  });
  const { notes } = data?.notesConnection ?? {};

  const [focusedNote, setFocusedNote] =
    useState<HomePageObsidianNoteFragment | null>(null);
  if (!import.meta.env.SSR) {
    useLayoutEffect(() => {
      if (svgRef.current && notes && width && height) {
        return render({
          notes,
          svgRef,
          width,
          height,
          onFocus: setFocusedNote,
          onBlur: () => setFocusedNote(null),
        });
      }
    }, [notes, svgRef.current]);
  }
  return (
    <>
      <Box
        ref={containerRef}
        sx={[
          ({ colors, fontSizes, fn }) => ({
            position: "relative",
            ".node": {
              transitionProperty: "fill-opacity",
              transitionTimingFunction: "ease-in-out",
              transitionDuration: "150ms",
              circle: {
                cursor: "pointer",
                fill: colors.dark[4],
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
            },
            ".node.dimmed": {
              "&:not(.day)": {
                fillOpacity: 0.15,
              },
              "&.day": {
                fillOpacity: 0.3,
                strokeOpacity: 0.3,
              },
            },
            ".node.focused": {
              circle: {
                fill: colors.indigo[fn.primaryShade()],
              },
              text: {
                fill: colors.gray[8],
              },
            },
            ".node:not(.focused)": {
              "&.person": {
                circle: {
                  fill: colors.pink[4],
                },
              },
              "&.day": {
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
          }),
          ...packSx(sx),
        ]}
        {...otherProps}
      >
        <LoadingOverlay visible={loading} loaderProps={{ size: "md" }} />
        <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />
      </Box>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={!!focusedNote}>
          {style => (
            <>
              {focusedNote && (
                <NoteInfoCard note={focusedNote} {...{ style }} />
              )}
            </>
          )}
        </Transition>
      </Affix>
    </>
  );
};

export default HomePageGraph;

type NoteInfoCardProps = Omit<CardProps, "children"> & {
  readonly note: HomePageObsidianNoteFragment;
};

const NoteInfoCard: FC<NoteInfoCardProps> = ({ note, ...otherProps }) => {
  const { name, modifiedAt: modifiedAtISO, tags = [], blurb } = note;
  const modifiedAgo = useMemo(() => {
    return DateTime.fromISO(modifiedAtISO).toRelativeCalendar();
  }, [modifiedAtISO]);
  const tag = useMemo(() => first(tags), [tags]);
  return (
    <Card p="xs" radius="md" withBorder w={300} {...otherProps}>
      <Group spacing={8} noWrap>
        <Text size="sm" weight={500} lineClamp={1}>
          {name}
        </Text>
        {!!tag && (
          <Badge
            variant="outline"
            size="xs"
            radius="sm"
            color={TAG_COLORS[tag] || "gray"}
            sx={{ flexShrink: 0 }}
          >
            {tag}
          </Badge>
        )}
      </Group>
      {!!modifiedAgo && (
        <Group spacing={4} mt={-3}>
          <Box sx={({ colors }) => ({ color: colors.gray[6] })}>
            <ClockIcon width={12} height={12} />
          </Box>
          <Text size="xs" color="dimmed" sx={{ lineHeight: 1.4 }}>
            Updated {modifiedAgo}
          </Text>
        </Group>
      )}
      {!!blurb && (
        <>
          <Divider
            mt={2}
            mb={4}
            sx={({ colors }) => ({ borderColor: colors.gray[3] })}
          />
          <Text size="xs" color="gray.7" sx={{ lineHeight: 1.4 }}>
            {blurb}
          </Text>
        </>
      )}
    </Card>
  );
};
const nodeRadius = (note: HomePageObsidianNoteFragment): number => {
  const references = note.references.length + note.referencedBy.length;
  const size = NODE_RADIUS_MIN_SIZE + references * NODE_RADIUS_MULTIPLIER;
  return Math.min(size, NODE_RADIUS_MAX_SIZE);
};

const nodeLinks = (node: Node, validNodeIds: Set<string>): Link[] => {
  const { id: source } = node;
  return node.references
    .filter(({ id }) => validNodeIds.has(id))
    .map(({ id: target }) => ({ source, target }));
};

type RenderOptions = {
  readonly notes: ReadonlyArray<HomePageObsidianNoteFragment>;
  readonly svgRef: RefObject<SVGSVGElement | null>;
  readonly width: number;
  readonly height: number;
  readonly onFocus: (entry: HomePageObsidianNoteFragment) => void;
  readonly onBlur: (entry: HomePageObsidianNoteFragment) => void;
};

const render = ({
  notes,
  svgRef,
  width,
  height,
  onFocus,
  onBlur,
}: RenderOptions): (() => void) => {
  let isDragging = false;

  // Construct nodes and links
  const nodes = notes.map<Node>(entry => ({
    ...entry,
    radius: nodeRadius(entry),
  }));
  const validNodeIds = new Set(nodes.map(({ id }) => id));
  const links = nodes.flatMap(node => nodeLinks(node, validNodeIds));

  // Draw SVG
  const svg = select(svgRef.current).attr("viewBox", `0 0 ${width} ${height}`);

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
    .attr("class", node => ["node", ...node.tags].join(" "));

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
    });

  // Draw node labels
  nodeGroups
    .append("text")
    .text(node => {
      const { name, aliases } = node;
      return first(aliases) || name;
    })
    .attr("text-anchor", "middle")
    .attr("dy", ({ radius }) => radius + 15);

  // Configure force simulation
  const simulation = forceSimulation(nodes)
    .force(
      "link",
      forceLink<Node, Link>(links)
        .id(({ id }) => id)
        .strength(LINK_FORCE)
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
      forceManyBody().strength(BODY_FORCE).distanceMax(BODY_FORCE_MAX_DISTANCE),
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

  return () => {
    svg.remove();
  };
};
