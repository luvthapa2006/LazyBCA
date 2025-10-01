import fs from 'fs';
import path from 'path';
import BackButton from '@/components/BackButton';
import ShareButton from '@/components/ShareButton';

// Renamed and updated path to 'assignments'
async function getAssignmentsForSubject(subject) {
  const subjectDirectory = path.join(process.cwd(), 'public', 'assignments', subject);
  try {
    const solutionFiles = fs.readdirSync(subjectDirectory);
    return solutionFiles.filter(file => file.endsWith('.pdf')); 
  } catch (error) {
    console.error(`Could not read assignments directory for subject ${subject}:`, error);
    return [];
  }
}

export default async function AssignmentsPage({ params }) {
  const subject = decodeURIComponent(params.subject); 
  const solutions = await getAssignmentsForSubject(subject);

  return (
    <div>
      <BackButton />

      {/* Updated title and color */}
      <h1 className="text-4xl font-extrabold text-emerald-300 mb-8 capitalize">
        Assignments for: <span className="text-white">{subject.replace(/-/g, ' ')}</span>
      </h1>
      
      {solutions.length > 0 ? (
        <div className="space-y-4">
          {solutions.map((solutionFile) => (
            <div key={solutionFile} className="flex flex-col md:flex-row md:items-center justify-between bg-gray-700 p-4 rounded-lg gap-4">
              <span className="text-xl text-white break-all">{solutionFile}</span>

              <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
                {/* Updated shareUrl path */}
                <ShareButton shareUrl={`/assignments/${params.subject}/${solutionFile}`} />
                {/* Updated href path */}
                <a href={`/assignments/${params.subject}/${solutionFile}`} target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors w-full md:w-auto text-center">
                  View
                </a>
                {/* Updated href path and button color */}
                <a href={`/assignments/${params.subject}/${solutionFile}`} download className="bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors w-full md:w-auto text-center">
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No assignment solutions found for this subject.</p>
      )}
    </div>
  );
}