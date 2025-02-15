export interface FileObject {
  fileId: number;
  fileName: string;
  fileUrl: string;
}

export interface RECEIPT {
  id: number;
  amount: number;
  description: string;
  images: string[];
  date: string;
  source: string;
  fileUrls: FileObject[];
}

export interface AccountResponse {
  code: number;
  message: string;
  data: {
    accountId: number;
    time: string;
    description: string;
    totalAmount: number;
    currentAmount: number;
    cardinal: number;
    receipts: RECEIPT[];
  };
}

export interface adminReceiptsTypes {
  description: string;
  source: string;
  amount: number;
  date: string;
  cardinal: number;
  files: File[];
}
