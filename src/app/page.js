import fs from 'fs';
import path from 'path';
import HomeClient from '@/components/HomeClient';

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

function getNoteSubjects() {
  const notesDirectory = path.join(process.cwd(), 'public', 'notes');
  try {
    const subjectFolders = fs.readdirSync(notesDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    return subjectFolders.sort();
  } catch (error) {
    console.error("Could not read notes directory:", error);
    return [];
  }
}

// NEW function to get assignment subjects
function getAssignmentSubjects() {
  const assignmentsDirectory = path.join(process.cwd(), 'public', 'assignments');
  try {
    const subjectFolders = fs.readdirSync(assignmentsDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    return subjectFolders.sort();
  } catch (error) {
    console.error("Could not read assignments directory:", error);
    return [];
  }
}


export default async function HomePage() {
  const recordingDates = getRecordingDates();
  const noteSubjects = getNoteSubjects();
  const assignmentSubjects = getAssignmentSubjects(); // Get the new data

  return (
    <HomeClient 
      recordingDates={recordingDates} 
      noteSubjects={noteSubjects}
      assignmentSubjects={assignmentSubjects} // Pass it as a prop
    />
  );
}