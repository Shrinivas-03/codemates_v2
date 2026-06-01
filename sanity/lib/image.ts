import { createImageUrlBuilder } from '@sanity/image-url';
import { dataset, projectId } from '../env';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || 'your-project-id',
  dataset: dataset || 'production',
});

export const urlForImage = (source: any) => {
  if (!source) return null;
  return imageBuilder.image(source).auto('format');
};
