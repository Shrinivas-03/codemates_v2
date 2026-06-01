import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { postBySlugQuery, relatedPostsQuery, allPostsQuery } from '@/sanity/lib/queries';
import { blogPosts as mockPosts } from '@/lib/blogData';
import BlogPostClient from './BlogPostClient';
import SchemaMarkup from '@/components/SchemaMarkup';
import { urlForImage } from '@/sanity/lib/image';

// Enable ISR revalidation every hour
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. Generate Dynamic Metadata for Search Engine Optimization
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  let post: any = null;

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const isSanityConfigured = projectId && projectId !== 'your-project-id';

  if (isSanityConfigured) {
    try {
      post = await client.fetch(postBySlugQuery, { slug });
    } catch (err) {
      console.warn('Metadata fetch from Sanity failed, checking local database.', err);
    }
  }

  if (!post) {
    post = mockPosts.find((p) => p.slug === slug);
  }

  if (!post) return {};

  const title = post.seo?.metaTitle || post.seoTitle || `${post.title} | Codemates Blog`;
  const description = post.seo?.metaDescription || post.seoDescription || post.excerpt;
  const keywords = post.seo?.keywords || post.seoKeywords || [];
  
  // Get OpenGraph cover image URL
  let ogImageUrl = 'https://codemates.in/og-image.jpg';
  if (post.seo?.ogImage) {
    const sanityOg = urlForImage(post.seo.ogImage)?.width(1200).height(630).url();
    if (sanityOg) ogImageUrl = sanityOg;
  } else if (post.coverImage) {
    if (post.coverImage.url) {
      ogImageUrl = post.coverImage.url;
    } else {
      const sanityCover = urlForImage(post.coverImage)?.width(1200).height(630).url();
      if (sanityCover) ogImageUrl = sanityCover;
    }
  }

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://codemates.in/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://codemates.in/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedDate,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

// 2. generateStaticParams to statically compile all articles at build time
export async function generateStaticParams() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const isSanityConfigured = projectId && projectId !== 'your-project-id';

  if (isSanityConfigured) {
    try {
      const posts = await client.fetch(allPostsQuery);
      if (posts && posts.length > 0) {
        return posts.map((post: any) => ({
          slug: post.slug,
        }));
      }
    } catch (err) {
      console.warn('generateStaticParams fetch failed. Falling back to local static paths.', err);
    }
  }

  return mockPosts.map((post) => ({
    slug: post.slug,
  }));
}

// 3. Main Server Component
export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  let post: any = null;
  let relatedPosts: any[] = [];

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const isSanityConfigured = projectId && projectId !== 'your-project-id';

  // Fetch the article details
  if (isSanityConfigured) {
    try {
      post = await client.fetch(postBySlugQuery, { slug });

      // Fetch related articles based on tags/categories from CMS
      if (post) {
        relatedPosts = await client.fetch(relatedPostsQuery, {
          slug,
          categoryId: post.category?._id || '',
          tagIds: post.tags?.map((t: any) => t._id) || [],
        });
      }
    } catch (err) {
      console.warn('BlogPost fetch from Sanity failed. Reverting to static fallback.', err);
    }
  }

  // Fallback to static mock articles
  if (!post) {
    post = mockPosts.find((p) => p.slug === slug);
    if (post) {
      relatedPosts = mockPosts
        .filter(
          (p) =>
            p.slug !== slug &&
            (p.category.slug === post.category.slug ||
              p.tags.some((t) => post.tags?.some((pt: any) => pt.slug === t.slug)))
        )
        .slice(0, 3);
    }
  }

  if (!post) {
    notFound();
  }

  // Resolve cover image details for Schema
  let coverImageUrl = 'https://codemates.in/og-image.jpg';
  if (post.coverImage) {
    if (post.coverImage.url) {
      coverImageUrl = post.coverImage.url;
    } else {
      const sanityCover = urlForImage(post.coverImage)?.width(1200).url();
      if (sanityCover) coverImageUrl = sanityCover;
    }
  }

  // In-line structured data schemas
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt,
    'image': coverImageUrl,
    'datePublished': post.publishedDate,
    'author': {
      '@type': 'Person',
      'name': post.author?.name || 'Codemates Contributor',
      'jobTitle': 'Software Engineer',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Codemates',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://codemates.in/logo.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://codemates.in/blog/${slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://codemates.in',
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Blog',
        'item': 'https://codemates.in/blog',
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': post.title,
        'item': `https://codemates.in/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <SchemaMarkup schema={articleSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
