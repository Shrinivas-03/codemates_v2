export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'paczhgde';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-06-01';

if (projectId === 'your-project-id' || !projectId) {
  console.warn(
    'Sanity Project ID is not configured. Please add NEXT_PUBLIC_SANITY_PROJECT_ID in your .env.local file.'
  );
}
