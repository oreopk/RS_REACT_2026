export type Book = {
  key?: string;
  title?: string;
  cover_i?: number;
  description?: string;
  author_name?: string[];
  first_publish_year?: number;
  subtitle?: string;
};

export type SearchResponse = {
  numFound: number;
  docs: Book[];
};

export type DetailResponse = {
  title: string;
  description?: string | { value: string };
  covers?: number[];
};
