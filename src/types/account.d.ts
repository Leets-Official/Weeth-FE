export interface FILE {
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
  fileUrls: FILE[];
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
