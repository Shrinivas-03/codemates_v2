import { authorType } from './author';
import { categoryType } from './category';
import { postType } from './post';
import { seoType } from './seo';
import { tagType } from './tag';

export const schemaTypes = [postType, authorType, categoryType, tagType, seoType];
export { authorType, categoryType, postType, seoType, tagType };
