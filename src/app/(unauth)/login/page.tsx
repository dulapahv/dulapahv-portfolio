"use client";

import React from "react";

import { Editor } from "@/ui/mdx-editor";

export default function Page() {
  return (
    <div>
      <div>Login</div>
      <div className="">
        <Editor
          onChange={(str) => {
            console.log(str);
          }}
          markdown=""
          markdownOld=""
        />
      </div>
    </div>
  );
}
