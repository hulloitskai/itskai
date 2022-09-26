import type { FunctionComponent, ComponentClass } from "react";
import ReactOnRails from "react-on-rails";
import { basename } from "path";

type ReactComponent = FunctionComponent | ComponentClass;

// Build map of all components by name.
const context = require.context("app/components", true, /\.tsx$/);
const components = context
  .keys()
  .reduce<Record<string, ReactComponent>>((components, key) => {
    const name = basename(key, ".tsx");
    components[name] = context(key);
    return components;
  }, {});

// Register components.
ReactOnRails.register(components);
