/// <reference types="vite/client" />

declare module "*.md" {
  const attributes: {
    title: string;
    date: string;
    excerpt: string;
    author: string;
    tags: string[];
  };

  // When "Mode.Markdown" is requested
  const markdown: string;

  // When "Mode.TOC" is requested
  const toc: { level: string; content: string }[];

  // When "Mode.HTML" is requested
  const html: string;

  // When "Mode.React" is requested. VFC could take a generic like React.VFC<{ MyComponent: TypeOfMyComponent }>
  const ReactComponent: React.VFC;

  export { attributes, toc, markdown, html, ReactComponent };
}
