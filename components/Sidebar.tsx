
import React, { useRef } from 'react';
import { Document } from '../types';

interface SidebarProps {
  documents: Document[];
  selectedDocId: string | null;
  onSelectDoc: (id: string) => void;
  onUpload: (file: File) => void;
  isProcessing: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  documents, 
  selectedDocId, 
  onSelectDoc, 
  onUpload,
  isProcessing 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onUpload(file);
    } else if (file) {
      alert("Please upload a PDF file.");
    }
  };

  return (
    <div className="w-80 h-full border-r border-slate-200 bg-white flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            D
          </div>
          <div>
            <h1 className="font-bold text-slate-800 tracking-tight">DocuMind AI</h1>
            <p className="text-xs text-slate-400 font-medium uppercase">RAG Engine v1.0</p>
          </div>
        </div>

        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-lg transition-all duration-200 font-medium shadow-md shadow-indigo-100"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Upload Document
            </>
          )}
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept=".pdf" 
          className="hidden" 
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-4">Your Library</h2>
        {documents.length === 0 ? (
          <div className="text-center py-10 px-4">
            <p className="text-sm text-slate-400 italic">No documents uploaded yet</p>
          </div>
        ) : (
          documents.map(doc => (
            <button
              key={doc.id}
              onClick={() => onSelectDoc(doc.id)}
              className={`w-full text-left p-3 rounded-xl transition-all duration-200 group ${
                selectedDocId === doc.id 
                  ? 'bg-indigo-50 border-indigo-100 border' 
                  : 'hover:bg-slate-50 border border-transparent'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${selectedDocId === doc.id ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${selectedDocId === doc.id ? 'text-indigo-900' : 'text-slate-700'}`}>
                    {doc.name}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {doc.pageCount} pages • {doc.size}
                  </p>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-slate-200"></div>
          <div>
            <p className="text-xs font-bold text-slate-700">Developer User</p>
            <p className="text-[10px] text-slate-400">Recruiter Demo Mode</p>
          </div>
        </div>
      </div>
    </div>
  );
};
