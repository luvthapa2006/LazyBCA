import fs from 'fs';
import path from 'path';
import BackButton from '@/components/BackButton';
import ShareButton from '@/components/ShareButton';

// Renamed and updated path to 'experiments'
async function getExperimentsForSubject(subject) {
  const subjectDirectory = path.join(process.cwd(), 'public', 'experiments', subject);
  try {
    const experimentFiles = fs.readdirSync(subjectDirectory);
    return experimentFiles.filter(file => file.endsWith('.pdf')); 
  } catch (error) {
    console.error(`Could not read experiments directory for subject ${subject}:`, error);
    return [];
  }
}

export default async function ExperimentsPage({ params }) {
  const subject = decodeURIComponent(params.subject); 
  const experiments = await getExperimentsForSubject(subject);

  return (
    <div>
      <BackButton />

      {/* Updated title and color */}
      <h1 className="text-4xl font-extrabold text-amber-300 mb-8 capitalize">
        Experiments for: <span className="text-white">{subject.replace(/-/g, ' ')}</span>
      </h1>
      
      {experiments.length > 0 ? (
        <div className="space-y-4">
          {experiments.map((experimentFile) => (
            <div key={experimentFile} className="flex flex-col md:flex-row md:items-center justify-between bg-gray-700 p-4 rounded-lg gap-4">
              <span className="text-xl text-white break-all">{experimentFile}</span>

              <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
                {/* Updated shareUrl path */}
                <ShareButton shareUrl={`/experiments/${params.subject}/${experimentFile}`} />
                {/* Updated href path */}
                <a href={`/experiments/${params.subject}/${experimentFile}`} target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors w-full md:w-auto text-center">
                  View
                </a>
                {/* Updated href path and button color */}
                <a href={`/experiments/${params.subject}/${experimentFile}`} download className="bg-amber-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors w-full md:w-auto text-center">
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No experiments found for this subject.</p>
      )}
    </div>
  );
}