graph LR
    A[User Upload] --> B[AWS S3]
    B --> C[AWS Lambda]
    subgraph "Processing Layer"
    C --> D[Chunking & Embedding]
    D --> E[Pinecone Vector DB]
    end
    F[User Chat] <--> G[FastAPI Backend]
    G <--> E
    G <--> H[LLM - OpenAI/Anthropic]
