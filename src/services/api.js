import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Upload PDF
export const uploadPdf = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  // Allow caller to pass onUploadProgress through axios config by attaching to file._uploadConfig (optional)
  const config = file && file._uploadConfig ? file._uploadConfig : {};
  return api.post('/upload-pdf', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...config,
  });
};

// RAG Question Answering
export const askQuestion = async (question) => {
  return api.post('/ask', { question });
};

// Generate Study Plan
export const generatePlan = async (syllabus, constraints) => {
  return api.post('/generate-plan', { syllabus, constraints });
};

// Generate Quiz
export const generateQuiz = async (topic, subtopics, mastery, numQuestions) => {
  return api.post('/generate-quiz', {
    topic,
    subtopics,
    mastery,
    num_questions: numQuestions,
  });
};

// Submit Quiz
export const submitQuiz = async (topic, quiz, answers) => {
  return api.post('/submit-quiz', { topic, quiz, answers });
};

// Auto Replan
export const replan = async (originalPlan, constraints) => {
  return api.post('/replan', { original_plan: originalPlan, constraints });
};