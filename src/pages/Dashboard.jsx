import { useState } from 'react';
import { Link } from 'react-router-dom';
import PdfUploader from '../components/Upload/PdfUploader';

const Dashboard = () => {
  const [uploadStatus, setUploadStatus] = useState('');

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Interview Prep Copilot</h2>
        <p className="text-lg text-gray-600 mb-8">Your AI-powered companion for mastering technical interviews</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Link to="/chat" className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">RAG Chat</h3>
          <p className="text-gray-600">Ask questions about your uploaded documents</p>
        </Link>
        <Link to="/plan" className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Study Plan</h3>
          <p className="text-gray-600">Generate personalized study plans</p>
        </Link>
        <Link to="/quiz" className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Quiz</h3>
          <p className="text-gray-600">Take quizzes to test your knowledge</p>
        </Link>
        <Link to="/progress" className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Progress</h3>
          <p className="text-gray-600">Track your learning progress</p>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Upload PDF Document</h3>
        <PdfUploader onStatusChange={setUploadStatus} />
        {uploadStatus && (
          <p className="mt-4 text-sm text-gray-600">{uploadStatus}</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;