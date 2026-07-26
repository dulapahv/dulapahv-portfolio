import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import SecurityPage from "./page";

vi.mock("next/navigation", () => ({
  usePathname: () => "/security",
}));

describe("Security Page", () => {
  it("should match snapshot", () => {
    const component = SecurityPage();
    const { container } = render(component);

    expect(container).toMatchSnapshot();
  });
});
