import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { checkboxRenderer } from "./checkbox-renderer";
import { codeRenderer } from "./code-renderer";
import { hrRenderer } from "./hr-renderer";
import { linkRenderer } from "./link-renderer";
import { preRenderer } from "./pre-renderer";
import { theadRenderer } from "./thead-renderer";
import { trRenderer } from "./tr-renderer";

type MarkdownRendererProps = {
  children: string;
};

export function MarkdownRenderer({ children }: MarkdownRendererProps) {
  return (
    <div className={`prose dark:prose-invert prose-mofu max-w-none`}>
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          rehypeSanitize,
          rehypeRaw,
          rehypeHighlight,
          rehypeKatex,
        ]}
        components={{
          a: linkRenderer,
          input: checkboxRenderer,
          pre: preRenderer,
          code: codeRenderer,
          hr: hrRenderer,
          thead: theadRenderer,
          tr: trRenderer,
        }}
      >
        {string}
      </Markdown>
    </div>
  );
}

const string = `The Game Development program provides students with a comprehensive understanding of game design theory, game engine architecture, and programming languages commonly used in the industry. Students will learn to create engaging gameplay mechanics, design immersive worlds, and optimize game performance. Through collaborative projects and internships, students gain practical experience in game development and production pipelines. Graduates are prepared for careers as game designers, level designers, and gameplay programmers in the gaming industry.

Test description

**Test description**

*Test description*

<u>Test description</u>



[Test description](https://youtube.com/)

* Test description

1. Test description

* [ ] Test description
* [x] Test description

$$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$

\`Hello, World!\`

\`\`\`ts
import useSWR from 'swr'
import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  const { data, error } = useSWR('/api/navigation', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <Navbar links={data.links} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

ReactDOM.render(
  <Markdown rehypePlugins={[rehypeHighlight]}>{markdown}</Markdown>,
  document.querySelector('#content')
)
\`\`\`

***

| Test description     | Test description   | Test description        |
| -------------------- | ------------------ | ----------------------- |
| **Test description** | *Test description* | <u>Test description</u> |
| \`Test description\`   | Test description   | Test description        |`;
