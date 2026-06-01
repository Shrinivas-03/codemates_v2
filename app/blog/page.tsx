import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { allPostsQuery, categoriesQuery } from '@/sanity/lib/queries';
import { blogPosts as mockPosts, mockCategories } from '@/lib/blogData';
import BlogIndexClient from './BlogIndexClient';
import SchemaMarkup from '@/components/SchemaMarkup';

// Enable Incremental Static Regeneration (ISR) - revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Insights, Engineering & Innovation | Codemates Blog',
  description:
    'Explore authoritative articles on custom software development, website design, CRM integrations, n8n workflow automation, and digital transformations written by engineers at Codemates.',
  keywords: [
    'software development company',
    'AI automation company',
    'business automation',
    'n8n workflows',
    'custom CRM development',
    'digital transformation consulting',
  ],
  alternates: {
    canonical: 'https://codemates.in/blog',
  },
  openGraph: {
    title: 'Insights, Engineering & Innovation | Codemates Blog',
    description:
      'Explore authoritative articles on custom software development, AI automation, n8n integrations, and digital transformations.',
    url: 'https://codemates.in/blog',
    type: 'website',
  },
};

export default async function BlogIndexPage() {
  let posts: any[] = [];
  let categories: any[] = [];
  let isSanityConfigured = false;

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  if (projectId && projectId !== 'your-project-id') {
    isSanityConfigured = true;
  }

  // Attempt to fetch from Sanity CMS if credentials exist
  if (isSanityConfigured) {
    try {
      const [fetchedPosts, fetchedCategories] = await Promise.all([
        client.fetch(allPostsQuery),
        client.fetch(categoriesQuery),
      ]);

      if (fetchedPosts && fetchedPosts.length > 0) {
        posts = fetchedPosts;
      }
      if (fetchedCategories && fetchedCategories.length > 0) {
        categories = fetchedCategories;
      }
    } catch (err) {
      console.warn('Sanity CMS data fetch failed. Falling back to local static mock database.', err);
    }
  }

  // Fallback to beautiful mock databases if no database elements exist yet
  if (posts.length === 0) {
    posts = []; // Remove mock dummy blogs completely
  }
  if (categories.length === 0) {
    categories = Object.values(mockCategories);
  }

  // Global structured data schema for the main blog list
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Codemates Insights',
    'url': 'https://codemates.in/blog',
    'description':
      'Insights, tutorials, and architectural engineering notes on software development, AI automation, and digital transformations.',
    'publisher': {
      '@type': 'Organization',
      'name': 'Codemates',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://codemates.in/logo.png',
      },
    },
    'blogPost': posts.map((post) => ({
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.excerpt,
      'datePublished': post.publishedDate,
      'url': `https://codemates.in/blog/${post.slug}`,
    })),
  };

  return (
    <>
      <SchemaMarkup schema={blogSchema} />
      <BlogIndexClient initialPosts={posts} categories={categories} />
    </>
  );
}
