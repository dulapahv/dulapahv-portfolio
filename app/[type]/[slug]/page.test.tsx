import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ContentPage from "./page";

describe("Content Detail Page", () => {
  it("should render blog post and match snapshot", async () => {
    const component = await ContentPage({
      params: Promise.resolve({
        type: "blog",
        slug: "improve-user-experience-with-invisibile-captcha",
      }),
      searchParams: Promise.resolve({}),
    });
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });

  it("should render project page and match snapshot", async () => {
    const component = await ContentPage({
      params: Promise.resolve({ type: "project", slug: "issho" }),
      searchParams: Promise.resolve({}),
    });
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });
});
