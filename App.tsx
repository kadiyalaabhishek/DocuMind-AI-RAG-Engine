
import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Document, ChatMessage } from './types';
import { processPDF } from './services/pdfService';
import { queryGemini } from './services/geminiService';

const App: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    try {
      const { text, pageCount } = await processPDF(file);
      const newDoc: Document = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        content: text,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        uploadedAt: new Date(),
        pageCount,
      };
      setDocuments(prev => [...prev, newDoc]);
      setSelectedDocId(newDoc.id);
    } catch (error) {
      console.error("Failed to process PDF:", error);
      alert("Error processing PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedDocId) return;
    
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsAnswering(true);

    try {
      const activeDoc = documents.find(d => d.id === selectedDocId);
      if (!activeDoc) throw new Error("Document not found");

      const response = await queryGemini(content, activeDoc.content);
      
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error while analyzing your document.",
        timestamp: new Date(),
      }]);
    } finally {
      setIsAnswering(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      <Sidebar 
        documents={documents} 
        selectedDocId={selectedDocId} 
        onSelectDoc={setSelectedDocId}
        onUpload={handleFileUpload}
        isProcessing={isProcessing}
      />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {selectedDocId ? (
          <ChatInterface 
            messages={messages} 
            onSendMessage={handleSendMessage}
            isAnswering={isAnswering}
            activeDocName={documents.find(d => d.id === selectedDocId)?.name}
          />
        ) : (
          <WelcomeScreen onUpload={handleFileUpload} isProcessing={isProcessing} />
        )}
      </main>
    </div>
  );
};

export default App;
