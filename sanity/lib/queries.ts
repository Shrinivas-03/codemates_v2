import { defineQuery } from 'next-sanity';

// Query all published posts for the blog index
export const allPostsQuery = defineQuery(`
  *[_type == "post"] | order(publishedDate desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    publishedDate,
    readingTime,
    featured,
    category->{
      title,
      "slug": slug.current,
      description,
      icon
    },
    tags[]->{
      name,
      "slug": slug.current
    },
    author->{
      name,
      photo,
      bio
    }
  }
`);

// Query a single post by its slug with complete details
export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    coverImage,
    publishedDate,
    readingTime,
    featured,
    seoTitle,
    seoDescription,
    seoKeywords,
    category->{
      title,
      "slug": slug.current,
      description,
      icon
    },
    tags[]->{
      name,
      "slug": slug.current
    },
    author->{
      name,
      photo,
      bio,
      linkedin,
      twitter,
      email
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage
    }
  }
`);

// Query related posts based on similar category or tags (excluding current post)
export const relatedPostsQuery = defineQuery(`
  *[_type == "post" && slug.current != $slug && (category._ref == $categoryId || count(tags[_ref in $tagIds]) > 0)] | order(publishedDate desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    publishedDate,
    readingTime,
    category->{
      title,
      "slug": slug.current
    },
    author->{
      name,
      photo
    }
  }
`);

// Query categories for filters
export const categoriesQuery = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon
  }
`);

// Query featured / trending articles
export const trendingPostsQuery = defineQuery(`
  *[_type == "post" && (featured == true || trending == true)] | order(publishedDate desc)[0...4] {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    publishedDate,
    readingTime,
    category->{
      title,
      "slug": slug.current
    }
  }
`);
