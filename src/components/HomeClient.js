"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function HomeClient({ recordingDates, noteSubjects }) {
  const [view, setView] = useState('choice');
  const handleBack = () => setView('choice');

  if (view === 'choice') {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white mb-10">Welcome to LazyBCA</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <button onClick={() => setView('recordings')} className="w-64 bg-cyan-500 text-white font-bold py-6 px-4 rounded-lg shadow-lg hover:bg-cyan-600 transition-transform transform hover:scale-105">
            <span className="text-2xl">View Recordings</span>
          </button>
          <button onClick={() => setView('notes')} className="w-64 bg-indigo-500 text-white font-bold py-6 px-4 rounded-lg shadow-lg hover:bg-indigo-600 transition-transform transform hover:scale-105">
            <span className="text-2xl">View Notes</span>
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

  if (view === 'recordings') {
    return (
      <div>
        <BackButton />
        <h1 className="text-4xl font-extrabold text-cyan-300 mb-8 border-b-2 border-cyan-500 pb-2">
          Available Recordings
        </h1>
        {recordingDates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recordingDates.map((date) => (
              <Link key={date} href={`/${date}`} className="block bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-cyan-500/50 hover:bg-gray-600 transition-all duration-300 transform hover:-translate-y-1">
                <h2 className="text-2xl font-bold text-white">{date}</h2>
                <p className="text-gray-400 mt-2">View lectures for this day</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No recordings found.</p>
        )}
      </div>
    );
  }

  // THIS IS THE CORRECTED SECTION
  if (view === 'notes') {
    return (
      <div>
        <BackButton />
        <h1 className="text-4xl font-extrabold text-indigo-300 mb-8 border-b-2 border-indigo-500 pb-2">
          Available Notes
        </h1>
        {noteSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* This map correctly uses 'noteSubjects' to create the links */}
            {noteSubjects.map((subject) => (
              <Link 
                key={subject} 
                href={`/notes/${subject}`} 
                className="block bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-indigo-500/50 hover:bg-gray-600 transition-all duration-300 transform hover:-translate-y-1">
                <h2 className="text-2xl font-bold text-white">{subject.replace(/-/g, ' ')}</h2>
                <p className="text-gray-400 mt-2">View notes for this subject</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No notes found.</p>
        )}
      </div>
    );
  }
}