// Polyfill 'util' to include TextEncoder, TextDecoder
import util from "util";
import "fast-text-encoding";

Object.assign(util, { TextDecoder, TextEncoder });
