import fs from 'fs';
import path from 'path';
import HomeClient from '@/components/HomeClient';

// This function gets video recording dates (sorted newest first)
function getRecordingDates() {
  const videosDirectory = path.join(process.cwd(), 'public', 'videos');
  try {
    const dateFolders = fs.readdirSync(videosDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    return dateFolders.sort((a, b) => new Date(b) - new Date(a));
  } catch (error) {
    console.error("Could not read videos directory:", error);
    return [];
  }
}

// This new function gets note subjects (sorted alphabetically)
function getNoteSubjects() {
  const notesDirectory = path.join(process.cwd(), 'public', 'notes');
  try {
    const subjectFolders = fs.readdirSync(notesDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    return subjectFolders.sort(); // Sorts subjects A-Z
  } catch (error) {
    console.error("Could not read notes directory:", error);
    return [];
  }
}

export default async function HomePage() {
  const recordingDates = getRecordingDates();
  const noteSubjects = getNoteSubjects(); // Call the new function

  // Pass the new 'noteSubjects' prop
  return (
    <HomeClient recordingDates={recordingDates} noteSubjects={noteSubjects} />
  );
}