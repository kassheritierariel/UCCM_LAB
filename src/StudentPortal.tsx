import React, { useState, useRef } from 'react';
import { useAuth } from './AuthContext';
import { BookOpen, Bell, LogOut, Upload, FileText, CheckCircle, Clock, AlertCircle, MessageCircle } from 'lucide-react';
import StudentChat from './components/StudentChat';

export default function StudentPortal() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'resources' | 'deposit' | 'ai'>('resources');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileError(null);

    if (file) {
      if (file.type !== 'application/pdf') {
        setFileError('Seuls les fichiers PDF sont acceptés.');
        setSelectedFile(null);
        return;
      }

      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        setFileError('Le fichier ne doit pas dépasser 10 Mo.');
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setFileError(null);
    
    const file = event.dataTransfer.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setFileError('Seuls les fichiers PDF sont acceptés.');
        setSelectedFile(null);
        return;
      }

      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        setFileError('Le fichier ne doit pas dépasser 10 Mo.');
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (selectedFile) {
      // Handle file upload logic here
      console.log('Submitting file:', selectedFile.name);
      // Reset after submission
      // setSelectedFile(null);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans antialiased min-h-screen">
      <header className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold leading-none tracking-tight">
                UCCM <span className="font-light text-slate-300">| Étudiant</span>
              </h1>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
                Portail Académique
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-slate-700 transition-colors">
              <Bell className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium hidden sm:block">{user?.name}</span>
              <button 
                onClick={signOut}
                className="p-2 text-slate-400 hover:text-white transition-colors"
                title="Déconnexion"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div className="flex gap-4 border-b border-slate-200 pb-2">
          <button 
            onClick={() => setActiveTab('resources')}
            className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${activeTab === 'resources' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Ressources & Cours
          </button>
          <button 
            onClick={() => setActiveTab('deposit')}
            className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${activeTab === 'deposit' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Dépôt TFC/Mémoire
          </button>
          <button 
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors flex items-center gap-2 ${activeTab === 'ai' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <MessageCircle className="w-4 h-4" />
            Chat & IA
          </button>
        </div>

        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center h-64">
              <FileText className="h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-800">Aucun document récent</h3>
              <p className="text-sm text-slate-500 mt-2">Les documents partagés par vos professeurs apparaîtront ici.</p>
            </div>
          </div>
        )}

        {activeTab === 'deposit' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Dépôt de Travail Fin de Cycle</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">1</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800">Paiement des frais de dépôt</h3>
                    <p className="text-sm text-slate-500 mt-1 mb-4">Vous devez vous acquitter des frais de dépôt avant de pouvoir soumettre votre document.</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Payer maintenant (50.00 $)
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">2</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800">Soumission du document</h3>
                    <p className="text-sm text-slate-500 mt-1 mb-4">Téléversez votre TFC ou Mémoire au format PDF (Max 10 Mo).</p>
                    
                    <div 
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                        fileError ? 'border-red-300 bg-red-50' : 
                        selectedFile ? 'border-emerald-300 bg-emerald-50' : 
                        'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                      }`}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={!selectedFile ? triggerFileInput : undefined}
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="application/pdf" 
                        className="hidden" 
                      />
                      
                      {selectedFile ? (
                        <div className="flex flex-col items-center">
                          <CheckCircle className="h-10 w-10 text-emerald-500 mb-3" />
                          <p className="text-sm font-medium text-emerald-800">{selectedFile.name}</p>
                          <p className="text-xs text-emerald-600 mt-1">{(selectedFile.size / (1024 * 1024)).toFixed(2)} Mo</p>
                          <div className="mt-4 flex gap-3">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                              className="text-sm text-slate-500 hover:text-slate-700 font-medium px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                            >
                              Changer de fichier
                            </button>
                            <button 
                              onClick={handleSubmit}
                              className="text-sm text-white bg-emerald-600 hover:bg-emerald-700 font-medium px-4 py-1.5 rounded-lg shadow-sm"
                            >
                              Soumettre
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className={`h-8 w-8 mx-auto mb-3 ${fileError ? 'text-red-400' : 'text-slate-400'}`} />
                          <p className={`text-sm ${fileError ? 'text-red-600 font-medium' : 'text-slate-500'}`}>
                            {fileError || 'Glissez-déposez votre fichier ici, ou cliquez pour parcourir.'}
                          </p>
                          {!fileError && (
                            <button 
                              className="mt-4 bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                            >
                              Sélectionner un fichier PDF
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold shrink-0">3</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800">Validation</h3>
                    <p className="text-sm text-slate-500 mt-1">Votre document sera examiné par l'administration et votre faculté avant publication.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'ai' && (
          <div className="mt-8">
            <StudentChat />
          </div>
        )}
      </main>
    </div>
  );
}
