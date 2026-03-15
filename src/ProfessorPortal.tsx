import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { BookOpen, Bell, LogOut, Upload, Users, FileText, MessageSquare, Sparkles } from 'lucide-react';
import ProfessorAITools from './components/ProfessorAITools';

export default function ProfessorPortal() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'courses' | 'students' | 'ai'>('courses');

  return (
    <div className="bg-slate-50 text-slate-900 font-sans antialiased min-h-screen">
      <header className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold leading-none tracking-tight">
                UCCM <span className="font-light text-slate-300">| Professeur</span>
              </h1>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
                Portail Enseignant
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-slate-700 transition-colors">
              <Bell className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium hidden sm:block">Prof. {user?.name}</span>
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
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${activeTab === 'courses' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Mes Cours & Documents
          </button>
          <button 
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${activeTab === 'students' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Mes Promotions
          </button>
          <button 
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors flex items-center gap-2 ${activeTab === 'ai' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Sparkles className="w-4 h-4" />
            Outils IA
          </button>
        </div>

        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-slate-800">Documents Pédagogiques</h2>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Partager un document
                  </button>
                </div>
                
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center bg-slate-50">
                  <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-800">Aucun document partagé</h3>
                  <p className="text-sm text-slate-500 mt-2">Partagez des supports de cours, des syllabus ou des exercices avec vos étudiants.</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Mes Cours Assignés</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                    <h4 className="font-bold text-emerald-800">Droit Constitutionnel</h4>
                    <p className="text-xs text-emerald-600 mt-1">G1 Droit • 120 étudiants</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                    <h4 className="font-bold text-slate-800">Droit Administratif</h4>
                    <p className="text-xs text-slate-500 mt-1">G2 Droit • 95 étudiants</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Promotions & Étudiants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-slate-200 rounded-xl p-6 hover:border-emerald-500 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">G1 Droit</h3>
                    <p className="text-sm text-slate-500">Année Académique 2023-2024</p>
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                    120 inscrits
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <Users className="h-4 w-4" />
                    Liste
                  </button>
                  <button className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Discussion
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'ai' && (
          <div className="mt-8">
            <ProfessorAITools />
          </div>
        )}
      </main>
    </div>
  );
}
