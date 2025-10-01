import fs from 'fs';
import path from 'path';
import BackButton from '@/components/BackButton';
import ShareButton from '@/components/ShareButton';

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
      <BackButton />

      {/* REMOVED the single ShareButton from the header */}
      <h1 className="text-4xl font-extrabold text-indigo-300 mb-8 capitalize">
        Notes for: <span className="text-white">{subject.replace(/-/g, ' ')}</span>
      </h1>
      
      {notes.length > 0 ? (
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note} className="flex flex-col md:flex-row md:items-center justify-between bg-gray-700 p-4 rounded-lg gap-4">
              <span className="text-xl text-white break-all">{note}</span>

              {/* Add the ShareButton to the button group */}
              <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
                {/* Share Button for this specific note */}
                <ShareButton shareUrl={`/notes/${params.subject}/${note}`} />
                <a href={`/notes/${params.subject}/${note}`} target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors w-full md:w-auto text-center">
                  View
                </a>
                <a href={`/notes/${params.subject}/${note}`} download className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors w-full md:w-auto text-center">
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