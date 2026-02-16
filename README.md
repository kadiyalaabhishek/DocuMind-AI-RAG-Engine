graph LR
    A[User Upload] --> B[Amazon S3]
    B --> C[AWS Lambda: Chunking/Embedding]
    C --> D[Pinecone Vector DB]
    D --> E[FastAPI Backend]
    E --> F[User Chat Interface]
