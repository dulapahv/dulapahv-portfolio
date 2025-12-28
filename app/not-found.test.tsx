import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import NotFound from "./not-found";

const RETURN_HOME_REGEX = /return home/i;
const ERROR_MESSAGE_REGEX =
  /sorry, the page you are looking for does not exist/i;

describe("Not Found Page", () => {
  it("should render page not found heading", () => {
    render(<NotFound />);
    expect(
      screen.getByRole("heading", { name: "Page Not Found" })
    ).toBeInTheDocument();
  });

  it("should render return home link", () => {
    render(<NotFound />);
    const homeLink = screen.getByRole("link", { name: RETURN_HOME_REGEX });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveProperty("href", "http://localhost:3000/");
  });

  it("should render error message", () => {
    render(<NotFound />);
    expect(screen.getByText(ERROR_MESSAGE_REGEX)).toBeInTheDocument();
  });

  it("should display 404 status code", () => {
    render(<NotFound />);
    expect(screen.getByText("Status: 404")).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(<NotFound />);
    expect(container).toMatchSnapshot();
  });
});
