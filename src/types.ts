type MetaData = any;

export interface ContentfulImage {
  _sys: MetaData;
  title: string;
  description: string;
  file: {
    contentType: string;
    details: any;
    fileName: string;
    url: string;
  };
}
