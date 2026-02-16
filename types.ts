
export interface Document {
  id: string;
  name: string;
  content: string;
  size: string;
  uploadedAt: Date;
  pageCount: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  references?: Array<{
    text: string;
    score: number;
  }>;
}

export interface VectorChunk {
  text: string;
  embedding: number[];
  docId: string;
}
