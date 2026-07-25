const BLOCK_START = /^(export|import)\s/;
const EXCESS_BLANK_LINES = /\n{3,}/g;

const braceDelta = (line: string): number => {
  let delta = 0;
  for (const char of line) {
    if (char === "{") {
      delta++;
    } else if (char === "}") {
      delta--;
    }
  }
  return delta;
};

/**
 * Strips MDX-only syntax from a document body so the result reads as plain
 * Markdown.
 *
 * Only `import`/`export` statements are removed. Component *usage* is left
 * alone: just two components appear across the content, and their children are
 * readable prose that an agent is better off seeing than losing.
 */
export const mdxToMarkdown = (source: string): string => {
  const result: string[] = [];
  let depth = 0;
  let inBlock = false;

  for (const line of source.split("\n")) {
    if (!inBlock && BLOCK_START.test(line)) {
      inBlock = true;
      depth = 0;
    }

    if (inBlock) {
      depth += braceDelta(line);
      // A brace-less statement (`import x from "y";`) ends on its own line.
      if (depth <= 0) {
        inBlock = false;
      }
      continue;
    }

    result.push(line);
  }

  return result.join("\n").replace(EXCESS_BLANK_LINES, "\n\n").trim();
};
