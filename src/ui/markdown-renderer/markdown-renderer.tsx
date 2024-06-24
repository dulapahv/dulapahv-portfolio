import Markdown from "react-markdown";
import RehypeAutoLinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import RehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { aRenderer } from "./a-renderer";
import { checkboxRenderer } from "./checkbox-renderer";
import { codeRenderer } from "./code-renderer";
import { hrRenderer } from "./hr-renderer";
import { preRenderer } from "./pre-renderer";
import { tdRenderer } from "./td-renderer";
import { thRenderer } from "./th-renderer";
import { theadRenderer } from "./thead-renderer";
import { trRenderer } from "./tr-renderer";

type MarkdownRendererProps = {
  children: string;
};

export function MarkdownRenderer({ children }: MarkdownRendererProps) {
  return (
    <div className="prose-mofu prose prose-neutral max-w-none dark:prose-invert">
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          RehypeSlug,
          RehypeAutoLinkHeadings,
          rehypeRaw,
          rehypeHighlight,
          rehypeKatex,
        ]}
        components={{
          a: aRenderer,
          input: checkboxRenderer,
          pre: preRenderer,
          code: codeRenderer,
          hr: hrRenderer,
          thead: theadRenderer,
          tr: trRenderer,
          th: thRenderer,
          td: tdRenderer,
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}

const string = `# A demo of \`react-markdown\`

\`react-markdown\` is a markdown component for React.

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using \`dangerouslySetInnerHTML\`
* Lets you define your own components (to render \`MyHeading\` instead of \`'h1'\`)
* Has a lot of plugins

## Contents

Here is an example of a plugin in action
([\`remark-toc\`](https://github.com/remarkjs/remark-toc)).
**This section is replaced by an actual table of contents**.

## Syntax highlighting

Here is an example of a plugin to highlight code:
[\`rehype-highlight\`](https://github.com/rehypejs/rehype-highlight).

\`\`\`js
/* Test */
import React from 'react'
import ReactDOM from 'react-dom'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

const markdown = \`
# Your markdown here
\`

ReactDOM.render(
  <Markdown rehypePlugins={[rehypeHighlight]}>{markdown}</Markdown>,
  document.querySelector('#content')
)
\`\`\`

Pretty neat, eh?

## GitHub flavored markdown (GFM)

For GFM, you can *also* use a plugin:
[\`remark-gfm\`](https://github.com/remarkjs/react-markdown#use).
It adds support for GitHub-specific extensions to the language:
tables, strikethrough, tasklists, and literal URLs.

These features **do not work by default**.
👆 Use the toggle above to add the plugin.

| Feature    | Support              |
| ---------: | :------------------- |
| CommonMark | 100%                 |
| GFM        | 100% w/ \`remark-gfm\` |

~~strikethrough~~

* [ ] task list
* [x] checked item

https://example.com

## HTML in markdown

⚠️ HTML in markdown is quite unsafe, but if you want to support it, you can
use [\`rehype-raw\`](https://github.com/rehypejs/rehype-raw).
You should probably combine it with
[\`rehype-sanitize\`](https://github.com/rehypejs/rehype-sanitize).

<blockquote>
  👆 Use the toggle above to add the plugin.
</blockquote>

## Components

You can pass components to change things:

\`\`\`js
/* Test */
import React from 'react'
import ReactDOM from 'react-dom'
import Markdown from 'react-markdown'
import MyFancyRule from './components/my-fancy-rule.js'

const markdown = \`
# Your markdown here
\`

ReactDOM.render(
  <Markdown
    components={{
      // Use h2s instead of h1s
      h1: 'h2',
      // Use a component instead of hrs
      hr(props) {
        const {node, ...rest} = props
        return <MyFancyRule {...rest} />
      }
    }}
  >
    {markdown}
  </Markdown>,
  document.querySelector('#content')
)
\`\`\`

## More info?

Much more info is available in the
[readme on GitHub](https://github.com/remarkjs/react-markdown)!

***

A component by [Espen Hovlandsdal](https://espen.codes/)`;
