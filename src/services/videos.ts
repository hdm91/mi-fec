import { getNewVideoId } from './../utils/index';
import { getCategories } from './categories';
import { getAuthors, getAuthorById, updateAuthor } from './authors';
import { ProcessedVideo, Video, VideoToSave } from '../common/interfaces';
import { mapCategories, randomDate } from '../utils';

export const getVideos = (): Promise<ProcessedVideo[]> => {
  return Promise.all([getCategories(), getAuthors()]).then(([categories, authors]) => {
    const categoriesDict = mapCategories(categories);

    return authors.flatMap((author) =>
      author.videos.map(({ catIds, ...rest }) => ({
        ...rest,
        categories: catIds ? catIds.map((catId) => categoriesDict[catId]) : [],
        authorId: author.id,
        author: author.name,
      }))
    );
  });
};

export const getVideoById = async (videoId: number, authorId: number): Promise<ProcessedVideo> => {
  return Promise.all([getCategories(), getAuthorById(authorId)]).then(([categories, author]) => {
    const video = author.videos.find((video) => video.id === videoId);
    const categoriesDict = mapCategories(categories);

    if (!video) {
      throw new Error('could not find the video');
    }

    return {
      id: video.id,
      name: video.name,
      formats: video.formats,
      releaseDate: video.releaseDate,
      categories: video.catIds ? video.catIds.map((catId) => categoriesDict[catId]) : [],
      authorId: author.id,
      author: author.name,
    };
  });
};

export const createVideo = async (video: VideoToSave): Promise<void> => {
  const author = await getAuthorById(video.authorId);

  const newVideo: Video = {
    id: getNewVideoId(author),
    catIds: video.categories,
    name: video.name,
    formats: {
      one: { res: '1080p', size: 1000 },
    },
    releaseDate: randomDate(new Date(2018, 1, 1), new Date(2022, 1, 1)).toString(),
  };
  author.videos.push(newVideo);

  await updateAuthor(author);
};

export const updateVideo = async (updatedVideo: VideoToSave, oldAuthorId: number): Promise<void> => {
  const authorToUpdate = await getAuthorById(updatedVideo.authorId);

  const newVideo: Video = {
    id: updatedVideo.id,
    catIds: updatedVideo.categories,
    name: updatedVideo.name,
    formats: updatedVideo.formats,
    releaseDate: updatedVideo.releaseDate,
  };

  if (oldAuthorId !== updatedVideo.authorId) {
    const oldAuthor = await getAuthorById(oldAuthorId);

    oldAuthor.videos.splice(
      oldAuthor.videos.findIndex((video) => video.id === oldAuthorId),
      1
    );
    newVideo.id = getNewVideoId(authorToUpdate);
    authorToUpdate.videos.push(newVideo);

    await updateAuthor(oldAuthor);
    await updateAuthor(authorToUpdate);
  } else {
    const updateIndex = authorToUpdate.videos.findIndex((v) => v.id === updatedVideo.id);
    authorToUpdate.videos[updateIndex] = newVideo;

    await updateAuthor(authorToUpdate);
  }
};

export const removeVideo = async (videoId: number, authorId: number): Promise<void> => {
  const author = await getAuthorById(authorId);

  const deletedIndex = author.videos.findIndex((video) => video.id === videoId);
  author.videos.splice(deletedIndex, 1);

  await updateAuthor(author);
};
