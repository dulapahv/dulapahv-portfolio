import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ContactPage from "./page";

vi.mock("next/navigation", () => ({
  usePathname: () => "/contact",
}));

describe("Contact Page", () => {
  it("should match snapshot", () => {
    const component = ContactPage();
    const { container } = render(component);

    expect(container).toMatchSnapshot();
  });
});
