import { NextRequest } from "next/server";

import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "./route";

vi.mock("next/og", () => ({
  ImageResponse: class MockImageResponse {
    constructor(
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      element: any,
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      options: any
    ) {
      this.element = element;
      this.options = options;
    }
    element: any;
    options: any;
  },
}));

vi.mock("node:fs/promises", () => {
  const readFile = vi.fn();
  const writeFile = vi.fn();
  return {
    readFile,
    writeFile,
    default: { readFile, writeFile },
    __mocks__: { readFile, writeFile },
  };
});

vi.mock("node:path", () => {
  const join = vi.fn((...args: string[]) => args.join("/"));
  return {
    join,
    default: { join },
    __mocks__: { join },
  };
});

/* eslint-disable  @typescript-eslint/no-explicit-any */
const { __mocks__: fsMocks } = vi.mocked(
  await import("node:fs/promises")
) as any;
/* eslint-disable  @typescript-eslint/no-explicit-any */
const { __mocks__: pathMocks } = vi.mocked(await import("node:path")) as any;

const mockReadFile = fsMocks.readFile;
const mockJoin = pathMocks.join;

describe("OG Image Route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Setup default mock implementations
    mockReadFile.mockResolvedValue(Buffer.from("mock-file-content"));
    mockJoin.mockImplementation((...args: string[]) => args.join("/"));
  });

  it("should generate OG image with title and description", async () => {
    const url = new URL(
      "https://example.com/og?title=Test%20Title&description=Test%20Description"
    );
    const request = new NextRequest(url);

    const response = await GET(request);

    expect(response).toBeDefined();
    expect(response).toBeInstanceOf(Object);
  });

  it("should generate OG image with only title (no description)", async () => {
    const url = new URL("https://example.com/og?title=Test%20Title");
    const request = new NextRequest(url);

    const response = await GET(request);

    expect(response).toBeDefined();
  });

  it("should handle amp-encoded parameters", async () => {
    const url = new URL(
      "https://example.com/og?amp;title=Test%20Title&amp;description=Test%20Description"
    );
    const request = new NextRequest(url);

    const response = await GET(request);

    expect(response).toBeDefined();
  });

  it("should return ImageResponse with correct dimensions", async () => {
    const url = new URL("https://example.com/og?title=Test");
    const request = new NextRequest(url);

    const response = await GET(request);

    // @ts-expect-error - accessing options for testing
    expect(response.options.width).toBe(1200);
    // @ts-expect-error - accessing options for testing
    expect(response.options.height).toBe(630);
  });

  it("should handle empty parameters", async () => {
    const url = new URL("https://example.com/og");
    const request = new NextRequest(url);

    const response = await GET(request);

    expect(response).toBeDefined();
  });

  it("should handle special characters in title", async () => {
    const url = new URL(
      "https://example.com/og?title=Test%20%26%20Special%20%3CCharacters%3E"
    );
    const request = new NextRequest(url);

    const response = await GET(request);

    expect(response).toBeDefined();
  });

  it("should handle very long title", async () => {
    const longTitle = "A".repeat(200);
    const url = new URL(
      `https://example.com/og?title=${encodeURIComponent(longTitle)}`
    );
    const request = new NextRequest(url);

    const response = await GET(request);

    expect(response).toBeDefined();
  });

  it("should handle very long description", async () => {
    const longDescription = "B".repeat(500);
    const url = new URL(
      `https://example.com/og?title=Test&description=${encodeURIComponent(longDescription)}`
    );
    const request = new NextRequest(url);

    const response = await GET(request);

    expect(response).toBeDefined();
  });

  it("should match OG image snapshot", async () => {
    const url = new URL(
      "https://example.com/og?title=Snapshot%20Test&description=Snapshot%20Description"
    );
    const request = new NextRequest(url);

    const response = await GET(request);

    expect(response).toMatchSnapshot();
  });
});
