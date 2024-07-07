"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  Button,
  ChangeCodeMirrorLanguage,
  CodeBlockEditorDescriptor,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeToggle,
  ConditionalContents,
  CreateLink,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  InsertCodeBlock,
  InsertFrontmatter,
  InsertImage,
  InsertSandpack,
  InsertTable,
  InsertThematicBreak,
  JsxComponentDescriptor,
  jsxPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  SandpackConfig,
  sandpackPlugin,
  Select,
  Separator,
  ShowSandpackInfo,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  useCodeBlockEditorContext,
  // ChangeAdmonitionType,
} from "@mdxeditor/editor";
import { useTheme } from "next-themes";

import "@mdxeditor/editor/style.css";

interface EditorProps {
  onChange: Dispatch<SetStateAction<string>>;
  markdown: string;
  markdownOld?: string;
}

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
    },
  ],
};

export function Editor({ onChange, markdown, markdownOld }: EditorProps) {
  const { resolvedTheme } = useTheme();

  const [forceDarkTheme, setForceDarkTheme] = useState(
    resolvedTheme === "dark",
  );

  return (
    <MDXEditor
      onChange={onChange}
      autoFocus={false}
      placeholder="Type here..."
      className={`rounded-lg border-2 w-full ${forceDarkTheme ? "dark-theme dark-editor border-default-800 dark:border-default-200" : "bg-white dark:border-default-800"}`}
      contentEditableClassName={`prose ${forceDarkTheme ? "" : "bg-white"}`}
      markdown={markdown}
      plugins={[
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
        markdownShortcutPlugin(),
        diffSourcePlugin({
          diffMarkdown: markdownOld,
          viewMode: "rich-text",
        }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: "JavaScript",
            jsx: "JSX",
            ts: "TypeScript",
            tsx: "TSX",
            css: "CSS",
            go: "GO",
            html: "HTML",
            java: "Java",
            json: "JSON",
            liquid: "Liquid",
            md: "Markdown",
            php: "PHP",
            py: "Python",
            rs: "Rust",
            scss: "Sass",
            xml: "XML",
            yaml: "YAML",
            "": "Plain Text",
          },
        }),
        directivesPlugin({
          directiveDescriptors: [AdmonitionDirectiveDescriptor],
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <Separator />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <Separator />
                <ListsToggle />
                <Separator />
                <BlockTypeSelect />
                <Separator />
                <CreateLink />
                <InsertTable />
                <InsertThematicBreak />
                <InsertCodeBlock />
                {/* <Button
                  onClick={() => {
                    setForceDarkTheme(!forceDarkTheme);
                  }}
                  title={"Toggle Editor Theme"}
                  className="flex size-8 items-center justify-center"
                >
                  {forceDarkTheme ? (
                    <MdDarkMode className="text-xl" />
                  ) : (
                    <MdLightMode className="text-xl" />
                  )}
                </Button> */}
                {/* <ChangeAdmonitionType /> */}
              </DiffSourceToggleWrapper>
            </>
          ),
        }),
      ]}
    />
  );
}
