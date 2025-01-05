export interface CustomFiles {
  fileName: string;
  fileUrl: string;
}

export interface PostRequestType {
  title: string;
  content: string;
  files: CustomFiles[];
}
