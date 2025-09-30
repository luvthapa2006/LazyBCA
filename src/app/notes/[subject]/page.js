import fs from 'fs';
import path from 'path';
import Link from 'next/link';

// This function gets notes for a specific subject
async function getNotesForSubject(subject) {
  const subjectDirectory = path.join(process.cwd(), 'public', 'notes', subject);
  try {
    const noteFiles = fs.readdirSync(subjectDirectory);
    return noteFiles.filter(file => file.endsWith('.pdf')); 
  } catch (error) {
    console.error(`Could not read notes directory for subject ${subject}:`, error);
    return [];
  }
}

export default async function NotesPage({ params }) {
  const subject = decodeURIComponent(params.subject); 
  const notes = await getNotesForSubject(subject);

  return (
    <div>
      <Link href="/" className="text-cyan-400 hover:text-cyan-300 mb-6 inline-block">
        &larr; Back to Main Menu
      </Link>
      <h1 className="text-4xl font-extrabold text-indigo-300 mb-8 capitalize">
        Notes for: <span className="text-white">{subject.replace(/-/g, ' ')}</span>
      </h1>
      
      {notes.length > 0 ? (
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
              <span className="text-xl text-white">{note}</span>

              {/* Container for the buttons */}
              <div className="flex items-center gap-4">
                {/* NEW "View Note" button */}
                <a 
                  href={`/notes/${params.subject}/${note}`} 
                  target="_blank" // Opens the link in a new tab
                  rel="noopener noreferrer"
                  className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors"
                >
                  View Note
                </a>

                {/* Existing "Download" button */}
                <a 
                  href={`/notes/${params.subject}/${note}`} 
                  download
                  className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No notes found for this subject.</p>
      )}
    </div>
  );
}