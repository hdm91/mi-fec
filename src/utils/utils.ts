import { Author, Category, ProcessedVideo, VideoFormats } from '../common/interfaces';

const resOrder: Record<string, number> = Object.freeze({
  '480p': 0,
  '720p': 1,
  '1080p': 2,
});

export const getHighestQualityFormat = (formats: VideoFormats): string => {
  if (!formats) {
    return '';
  }

  const objectKeys = Object.keys(formats);
  if (objectKeys.length === 0) {
    return '';
  }

  const highestFormatKey = objectKeys.reduce((prevKey: string, currentKey: string) => {
    const currentformat = formats[currentKey];
    const prevFormat = formats[prevKey];

    if (currentformat.size > prevFormat.size) {
      return currentKey;
    } else if (currentformat.size === prevFormat.size && resOrder[currentformat.res] > resOrder[prevFormat.res]) {
      return currentKey;
    }

    return prevKey;
  });

  return `${highestFormatKey} ${formats[highestFormatKey].res}`;
};

export const getCategoriesFormatted = (video: ProcessedVideo) => video.categories.map((c) => c.name).join(', ');

export const mapCategories = (categories: Category[]) =>
  categories.reduce((acc: any, curr: Category) => {
    acc[curr.id] = curr;
    return acc;
  }, {});

export const randomDate = (start: Date, end: Date): string => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
};

export const getNewVideoId = (author: Author) => (author.videos.length > 0 ? Math.max(...author.videos.map((video) => video.id)) + 1 : 1);
