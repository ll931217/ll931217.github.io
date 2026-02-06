/**
 * Generate JSON-LD structured data for SEO
 *
 * Adds schema.org markup for search engines to better understand content.
 * https://schema.org/
 */

export interface WebSiteSchema {
  name: string;
  url: string;
  description: string;
}

export interface ArticleSchema {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
  image?: string;
}

export interface OrganizationSchema {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}

/**
 * Generate JSON-LD for a WebSite
 */
export function generateWebsiteSchema({
  name,
  url,
  description,
}: WebSiteSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
  };
}

/**
 * Generate JSON-LD for an Article (BlogPost)
 */
export function generateArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  author,
  url,
  image,
}: ArticleSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    url,
    image: image || undefined,
    publisher: {
      "@type": "Organization",
      name: author,
      url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

/**
 * Generate JSON-LD for an Organization
 */
export function generateOrganizationSchema({
  name,
  url,
  logo,
  description,
  sameAs,
}: OrganizationSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    sameAs,
  };
}

/**
 * Generate JSON-LD for a CollectionPage (Projects listing)
 */
export function generateCollectionPageSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
  };
}

/**
 * Inject JSON-LD script tag into the document head
 */
export function injectJsonLd(data: Record<string, unknown>) {
  // Remove existing JSON-LD scripts with the same @type
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach((script) => {
    try {
      const content = JSON.parse(script.textContent || "{}");
      if (content["@type"] === data["@type"]) {
        script.remove();
      }
    } catch {
      // Ignore invalid JSON
    }
  });

  // Create and inject new script
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);

  // Return cleanup function
  return () => script.remove();
}
