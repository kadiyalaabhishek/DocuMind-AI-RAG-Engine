
import React, { useRef } from 'react';

interface WelcomeScreenProps {
  onUpload: (file: File) => void;
  isProcessing: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onUpload, isProcessing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      onUpload(file);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-12 overflow-y-auto">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-indigo-50 rounded-3xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Analyze Complex Documents with <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Generative Intelligence</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-lg mx-auto leading-relaxed">
            Upload your PDF and start asking questions. Our RAG engine extracts insights, summarizes content, and finds specific data in seconds.
          </p>
        </div>

        <div 
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-3xl p-12 transition-all duration-300 cursor-pointer ${
            isProcessing 
              ? 'border-indigo-200 bg-indigo-50' 
              : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50'
          }`}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              </div>
              <p className="font-bold text-indigo-900">Ingesting PDF into Vector Store...</p>
              <p className="text-xs text-indigo-500 uppercase tracking-widest font-medium">Extracting semantic features</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 bg-white shadow-lg rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <p className="text-base font-bold text-slate-700">Drop your document here</p>
                <p className="text-sm text-slate-400 mt-1">or click to browse from computer</p>
              </div>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} 
            accept=".pdf" 
            className="hidden" 
          />
        </div>

        <div className="grid grid-cols-3 gap-6 pt-8">
          {[
            { label: 'Serverless RAG', icon: '⚡' },
            { label: 'Semantic Search', icon: '🔍' },
            { label: 'Vector Store', icon: '💾' }
          ].map(item => (
            <div key={item.label} className="flex flex-col items-center space-y-2 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
