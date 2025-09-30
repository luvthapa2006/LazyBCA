import fs from 'fs';
import path from 'path';
import Link from 'next/link';

async function getVideosForDate(date) {
  const dateDirectory = path.join(process.cwd(), 'public', 'videos', date);
  try {
    const videoFiles = fs.readdirSync(dateDirectory)
      .filter(file => file.endsWith('.mp4') || file.endsWith('.mov'));
    return videoFiles;
  } catch (error) {
    console.error(`Could not read directory for date ${date}:`, error);
    return [];
  }
}

export default async function DatePage({ params }) {
  const { date } = params;
  const videos = await getVideosForDate(date);

  return (
    <div>
      <Link href="/" className="text-cyan-400 hover:text-cyan-300 mb-6 inline-block">
        &larr; Back to Main Menu
      </Link>
      <h1 className="text-4xl font-extrabold text-cyan-300 mb-8">
        Lectures for: <span className="text-white">{date}</span>
      </h1>
      
      {videos.length > 0 ? (
        <div className="space-y-12"> {/* Increased space for the button */}
          {videos.map((video) => (
            <div key={video} className="bg-gray-900 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 capitalize">
                {video.replace(/-/g, ' ').replace('.mp4', '')}
              </h2>
              <video width="100%" controls preload="metadata" className="rounded">
                <source src={`/videos/${date}/${video}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* This is the new Download Button */}
              <div className="mt-4 text-right">
                <a 
                  href={`/videos/${date}/${video}`} 
                  download 
                  className="bg-cyan-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-cyan-600 transition-colors inline-block"
                >
                  Download Lecture
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No videos found for this date.</p>
      )}
    </div>
  );
}