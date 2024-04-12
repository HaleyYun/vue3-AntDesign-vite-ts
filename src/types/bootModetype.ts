export interface stepFilesType {
  fileUrl: string;
  fileType: number;
  fileDesc: string;
}
export interface faceCorrectType {
  textDesc: string;
  stepFiles: stepFilesType[];
}
export interface faceCorrectType {
  textDesc: string;
  "faceCorrect": faceCorrectType
}
