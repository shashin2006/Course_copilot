import { useState } from 'react';
import { generateQuiz, submitQuiz } from '../services/api';

const Quiz = () => {
  const [topic, setTopic] = useState('');
  const [subtopics, setSubtopics] = useState('');
  const [mastery, setMastery] = useState('medium');
  const [numQuestions, setNumQuestions] = useState(5);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const topics = ["Arrays", "Stacks", "Queues", "Trees", "Graphs"];

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const subtopicsArray = subtopics ? subtopics.split(',').map(s => s.trim()) : [topic];
      const response = await generateQuiz(topic, subtopicsArray, mastery, numQuestions);
      setQuiz(response?.data?.quiz || []);
      setAnswers({});
      setResult(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const handleSubmit = async () => {
    if (!quiz || Object.keys(answers).length !== quiz.length) return;
    setLoading(true);
    try {
      const response = await submitQuiz(topic, quiz, answers);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Quiz</h2>

      {!quiz && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select topic</option>
                {topics.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtopics (comma separated)</label>
              <input
                type="text"
                value={subtopics}
                onChange={(e) => setSubtopics(e.target.value)}
                placeholder="e.g., Basic operations, Implementation"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mastery level</label>
              <select
                value={mastery}
                onChange={(e) => setMastery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="weak">Weak</option>
                <option value="medium">Medium</option>
                <option value="strong">Strong</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of questions</label>
              <input
                type="number"
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                min="1"
                max="20"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !topic}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate Quiz'}
          </button>
        </div>
      )}

      {quiz && !result && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quiz: {topic}</h3>
          {quiz.map((q, index) => (
            <div key={index} className="mb-6">
              <p className="font-medium mb-3">{index + 1}. {q.question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((option, i) => {
                  const value = String.fromCharCode(65 + i);
                  const selected = answers[index] === value;
                  return (
                    <label
                      key={i}
                      className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:shadow-sm ${selected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={value}
                        checked={selected}
                        onChange={() => handleAnswerChange(index, value)}
                        className="form-radio text-blue-600"
                      />
                      <div>
                        <div className="text-sm font-semibold">{value}. {option}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            disabled={loading || Object.keys(answers).length !== quiz.length}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Quiz'}
          </button>
        </div>
      )}

      {result && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quiz Results</h3>
          <p className="text-lg mb-2">Mastery: <span className="font-bold">{result.mastery}</span></p>
          <div className="text-sm text-gray-600 mb-4">
            <pre className="bg-gray-50 p-3 rounded-md text-sm overflow-x-auto">{JSON.stringify(result.progress, null, 2)}</pre>
          </div>
          <button
            onClick={() => { setQuiz(null); setResult(null); }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Take Another Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;