export interface Category {
  id: number;
  name: string;
}

export interface VideoFormat {
  res: string;
  size: number;
}

export type VideoFormats = Record<string, VideoFormat>;

export interface Video {
  id: number;
  catIds: number[];
  name: string;
  formats: Record<string, VideoFormat>;
  releaseDate: string;
}

export interface Author {
  id: number;
  name: string;
  videos: Video[];
}

export interface ProcessedVideo {
  id: number;
  name: string;
  author: string;
  authorId: number;
  categories: Category[];
  formats: VideoFormats;
  releaseDate: string;
}

export interface VideoToSave {
  id: number;
  name: string;
  authorId: number;
  categories: number[];
  formats: VideoFormats;
  releaseDate: string;
}

export interface VideoTableCommandEventArgs {
  videoId: number;
  authorId: number;
}

export interface VideoTableSearchEventArgs {
  searchKey?: string;
}
