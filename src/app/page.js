import fs from 'fs';
import path from 'path';
import HomeClient from '@/components/HomeClient';

// REMOVED the getRecordingDates function

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

// NEW function to get experiment subjects
function getExperimentSubjects() {
  const experimentsDirectory = path.join(process.cwd(), 'public', 'experiments');
  try {
    const subjectFolders = fs.readdirSync(experimentsDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    return subjectFolders.sort();
  } catch (error) {
    console.error("Could not read experiments directory:", error);
    return [];
  }
}

export default async function HomePage() {
  // REMOVED recordingDates
  const noteSubjects = getNoteSubjects();
  const assignmentSubjects = getAssignmentSubjects();
  const experimentSubjects = getExperimentSubjects(); // Get the new data

  return (
    <HomeClient 
      noteSubjects={noteSubjects}
      assignmentSubjects={assignmentSubjects}
      experimentSubjects={experimentSubjects} // Pass it as a prop
    />
  );
}