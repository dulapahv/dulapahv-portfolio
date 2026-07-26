import { describe, expect, it, vi } from "vitest";

vi.mock("content-collections", () => ({
  allProjects: [
    {
      slug: "test-project",
      title: "Test Project",
      description: "A test project",
      startDate: new Date("2024-01-01"),
      _meta: { path: "test-project" },
    },
  ],
  allBlogs: [
    {
      slug: "test-blog",
      title: "Test Blog",
      description: "A test blog",
      date: new Date("2024-06-01"),
      _meta: { path: "test-blog" },
    },
  ],
}));

import { BASE_URL, NAME } from "@/lib/constants";

import {
  collectionSchema,
  combineSchemas,
  contactPageSchema,
  createBlogPostingSchema,
  createFAQSchema,
  createProjectSchema,
  personSchema,
  profilePageSchema,
  websiteSchema,
} from "./json-ld";

describe("json-ld schemas", () => {
  describe("personSchema", () => {
    it("should have correct type and context", () => {
      expect(personSchema["@context"]).toBe("https://schema.org");
      expect(personSchema["@type"]).toBe("Person");
    });

    it("should have correct identity fields", () => {
      expect(personSchema.name).toBe(NAME);
      expect(personSchema.givenName).toBe("Dulapah");
      expect(personSchema.familyName).toBe("Vibulsanti");
      expect(personSchema.alternateName).toBe("DulapahV");
    });

    it("should have alumni information", () => {
      expect(personSchema.alumniOf).toBeInstanceOf(Array);
      expect(personSchema.alumniOf).toHaveLength(3);
    });

    it("should have credentials", () => {
      expect(personSchema.hasCredential).toBeInstanceOf(Array);
      expect(personSchema.hasCredential).toHaveLength(2);
    });

    it("should have known languages", () => {
      expect(personSchema.knowsLanguage).toBeInstanceOf(Array);
      expect(personSchema.knowsLanguage).toHaveLength(2);
    });

    it("should have knowsAbout with skills", () => {
      expect(personSchema.knowsAbout).toBeInstanceOf(Array);
      const skills = personSchema.knowsAbout as string[];
      expect(skills.length).toBeGreaterThan(0);
      expect(skills).toContain("Full-Stack Web Development");
    });
  });

  describe("websiteSchema", () => {
    it("should have correct type and context", () => {
      expect(websiteSchema["@context"]).toBe("https://schema.org");
      expect(websiteSchema["@type"]).toBe("WebSite");
    });

    it("should reference the base URL", () => {
      expect(websiteSchema.url).toBe(BASE_URL);
    });

    it("should have publisher reference", () => {
      expect(websiteSchema.publisher).toEqual({
        "@id": `${BASE_URL}/#person`,
      });
    });
  });

  describe("profilePageSchema", () => {
    it("should have correct type and context", () => {
      expect(profilePageSchema["@context"]).toBe("https://schema.org");
      expect(profilePageSchema["@type"]).toBe("ProfilePage");
    });

    it("should reference main entity", () => {
      expect(profilePageSchema.mainEntity).toEqual({
        "@id": `${BASE_URL}/#person`,
      });
    });

    it("should have primary image", () => {
      expect(profilePageSchema.primaryImageOfPage).toBeDefined();
    });
  });

  describe("contactPageSchema", () => {
    it("should have correct type and context", () => {
      expect(contactPageSchema["@context"]).toBe("https://schema.org");
      expect(contactPageSchema["@type"]).toBe("ContactPage");
    });

    it("should have contact URL", () => {
      expect(contactPageSchema.url).toBe(`${BASE_URL}/contact`);
    });

    it("should have breadcrumb with 2 items", () => {
      const breadcrumb = contactPageSchema.breadcrumb as {
        itemListElement: unknown[];
      };
      expect(breadcrumb.itemListElement).toHaveLength(2);
    });
  });

  describe("collectionSchema", () => {
    it("should generate schema for blog type", () => {
      const schema = collectionSchema("blog", {
        title: "Blog",
        description: "My blog posts",
      });

      expect(schema["@type"]).toBe("CollectionPage");
      expect(schema.url).toBe(`${BASE_URL}/blog`);
      expect(schema.name).toBe("Blog");
      expect(schema.description).toBe("My blog posts");
    });

    it("should generate schema for project type", () => {
      const schema = collectionSchema("project", {
        title: "Projects",
        description: "My projects",
      });

      expect(schema["@type"]).toBe("CollectionPage");
      expect(schema.url).toBe(`${BASE_URL}/project`);
    });

    it("should include item list from collection", () => {
      const schema = collectionSchema("blog", {
        title: "Blog",
        description: "Blog posts",
      });

      const mainEntity = schema.mainEntity as {
        numberOfItems: number;
        itemListElement: unknown[];
      };
      expect(mainEntity["@type"]).toBe("ItemList");
      expect(mainEntity.numberOfItems).toBe(1);
      expect(mainEntity.itemListElement).toHaveLength(1);
    });

    it("should have breadcrumb navigation", () => {
      const schema = collectionSchema("blog", {
        title: "Blog",
        description: "Blog posts",
      });

      const breadcrumb = schema.breadcrumb as {
        itemListElement: unknown[];
      };
      expect(breadcrumb.itemListElement).toHaveLength(2);
    });
  });

  describe("createBlogPostingSchema", () => {
    const mockPost = {
      title: "Test Post",
      description: "A test blog post",
      date: new Date("2024-06-15"),
      slug: "test-post",
      readingTime: "5 min read",
    };

    it("should create BlogPosting schema with correct fields", () => {
      const schema = createBlogPostingSchema(mockPost);

      expect(schema["@type"]).toBe("BlogPosting");
      expect(schema.headline).toBe("Test Post");
      expect(schema.description).toBe("A test blog post");
      expect(schema.url).toBe(`${BASE_URL}/blog/test-post`);
    });

    it("should convert readingTime to ISO 8601 duration", () => {
      const schema = createBlogPostingSchema(mockPost);

      expect(schema.timeRequired).toBe("PT5M");
    });

    it("should estimate word count from reading time", () => {
      const schema = createBlogPostingSchema(mockPost);

      expect(schema.wordCount).toBe(1000); // 5 * 200
    });

    it("should handle post without readingTime", () => {
      const schema = createBlogPostingSchema({
        title: "No Reading Time",
        description: "Test",
        date: new Date("2024-01-01"),
        slug: "no-reading-time",
      });

      expect(schema.timeRequired).toBeUndefined();
      expect(schema.wordCount).toBeUndefined();
    });

    it("should set isAccessibleForFree to true", () => {
      const schema = createBlogPostingSchema(mockPost);

      expect(schema.isAccessibleForFree).toBe(true);
    });

    it("should have author with person reference", () => {
      const schema = createBlogPostingSchema(mockPost);

      const author = schema.author as { "@type": string; name: string };
      expect(author["@type"]).toBe("Person");
      expect(author.name).toBe(NAME);
    });
  });

  describe("createProjectSchema", () => {
    it("should create CreativeWork schema", () => {
      const schema = createProjectSchema({
        title: "My Project",
        description: "A cool project",
        startDate: new Date("2024-01-01"),
        slug: "my-project",
      });

      expect(schema["@type"]).toBe("CreativeWork");
      expect(schema.name).toBe("My Project");
      expect(schema.url).toBe(`${BASE_URL}/project/my-project`);
    });

    it("should use endDate for dateModified when provided", () => {
      const endDate = new Date("2024-06-01");
      const schema = createProjectSchema({
        title: "My Project",
        description: "Test",
        startDate: new Date("2024-01-01"),
        endDate,
        slug: "my-project",
      });

      expect(schema.dateModified).toBe(endDate.toISOString());
    });

    it("should use current date for dateModified when no endDate", () => {
      const before = new Date();
      const schema = createProjectSchema({
        title: "My Project",
        description: "Test",
        startDate: new Date("2024-01-01"),
        slug: "my-project",
      });
      const after = new Date();

      const modified = new Date(schema.dateModified as string);
      expect(modified.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(modified.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });

  describe("createFAQSchema", () => {
    it("should create FAQPage schema with questions", () => {
      const faqs = [
        { question: "What is this?", answer: "A test FAQ" },
        { question: "Why?", answer: "For testing" },
      ];

      const schema = createFAQSchema(faqs);

      expect(schema).not.toBeNull();
      expect(schema?.["@type"]).toBe("FAQPage");
      const mainEntity = schema?.mainEntity as Array<{
        "@type": string;
        name: string;
      }>;
      expect(mainEntity).toHaveLength(2);
      expect(mainEntity[0]["@type"]).toBe("Question");
      expect(mainEntity[0].name).toBe("What is this?");
    });

    it("should return null for empty array", () => {
      expect(createFAQSchema([])).toBeNull();
    });

    it("should return null for undefined-like input", () => {
      expect(
        createFAQSchema(
          undefined as unknown as Array<{ question: string; answer: string }>
        )
      ).toBeNull();
    });
  });

  describe("combineSchemas", () => {
    it("should return single schema unwrapped", () => {
      const result = combineSchemas([websiteSchema]);
      const parsed = JSON.parse(result);

      expect(parsed["@type"]).toBe("WebSite");
      expect(Array.isArray(parsed)).toBe(false);
    });

    it("should return array for multiple schemas", () => {
      const result = combineSchemas([websiteSchema, personSchema]);
      const parsed = JSON.parse(result);

      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toHaveLength(2);
    });

    it("should produce valid JSON", () => {
      const result = combineSchemas([personSchema, websiteSchema]);
      expect(() => JSON.parse(result)).not.toThrow();
    });
  });
});
