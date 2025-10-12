"use client";

import { useState } from 'react';
import Link from 'next/link';

// Accept the new 'assignmentSubjects' prop
export default function HomeClient({ recordingDates, noteSubjects, assignmentSubjects }) {
  const [view, setView] = useState('choice');
  const handleBack = () => setView('choice');

  if (view === 'choice') {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white mb-10">Welcome to LazyBCA</h1>
        {/* Changed to a grid for better alignment with 3 items */}
        <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-8 max-w-4xl mx-auto">
          <button onClick={() => setView('experiments')} className="w-full bg-cyan-500 text-white font-bold py-6 px-4 rounded-lg shadow-lg hover:bg-cyan-600 transition-transform transform hover:scale-105">
            <span className="text-2xl">View Experiments</span>
          </button>
          <button onClick={() => setView('notes')} className="w-full bg-indigo-500 text-white font-bold py-6 px-4 rounded-lg shadow-lg hover:bg-indigo-600 transition-transform transform hover:scale-105">
            <span className="text-2xl">View Notes</span>
          </button>
          {/* NEW "View Assignments" button */}
          <button onClick={() => setView('assignments')} className="w-full bg-emerald-500 text-white font-bold py-6 px-4 rounded-lg shadow-lg hover:bg-emerald-600 transition-transform transform hover:scale-105">
            <span className="text-2xl">View Assignments</span>
          </button>
        </div>
      </div>
    );
  }

  const BackButton = () => (
    <button onClick={handleBack} className="text-cyan-400 hover:text-cyan-300 mb-6 inline-block">
      &larr; Back to Main Menu
    </button>
  );

  if (view === 'experiments') {
    return (
      <div>
        <BackButton />
        <h1 className="text-4xl font-extrabold text-amber-300 mb-8 border-b-2 border-amber-500 pb-2">Available Experiments</h1>
        {experimentSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experimentSubjects.map((subject) => (
              <Link key={subject} href={`/experiments/${subject}`} className="block bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-amber-500/50 hover:bg-gray-600 transition-all duration-300 transform hover:-translate-y-1">
                <h2 className="text-2xl font-bold text-white">{subject.replace(/-/g, ' ')}</h2>
                <p className="text-gray-400 mt-2">View experiments for this subject</p>
              </Link>
            ))}
          </div>
        ) : (<p className="text-gray-400">No experiments found.</p>)}
      </div>
    );
  }

  if (view === 'notes') {
    // This section is unchanged
    return (
      <div>
        <BackButton />
        <h1 className="text-4xl font-extrabold text-indigo-300 mb-8 border-b-2 border-indigo-500 pb-2">Available Notes</h1>
        {noteSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noteSubjects.map((subject) => (
              <Link key={subject} href={`/notes/${subject}`} className="block bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-indigo-500/50 hover:bg-gray-600 transition-all duration-300 transform hover:-translate-y-1">
                <h2 className="text-2xl font-bold text-white">{subject.replace(/-/g, ' ')}</h2>
                <p className="text-gray-400 mt-2">View notes for this subject</p>
              </Link>
            ))}
          </div>
        ) : (<p className="text-gray-400">No notes found.</p>)}
      </div>
    );
  }

  // NEW section for Assignments
  if (view === 'assignments') {
    return (
      <div>
        <BackButton />
        <h1 className="text-4xl font-extrabold text-emerald-300 mb-8 border-b-2 border-emerald-500 pb-2">Available Assignments</h1>
        {assignmentSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignmentSubjects.map((subject) => (
              <Link key={subject} href={`/assignments/${subject}`} className="block bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-emerald-500/50 hover:bg-gray-600 transition-all duration-300 transform hover:-translate-y-1">
                <h2 className="text-2xl font-bold text-white">{subject.replace(/-/g, ' ')}</h2>
                <p className="text-gray-400 mt-2">View solutions for this subject</p>
              </Link>
            ))}
          </div>
        ) : (<p className="text-gray-400">No assignments found.</p>)}
      </div>
    );
  }
}