import { useState } from "react";
import { generateQuiz, submitQuiz } from "../services/api";

const Quiz = () => {
  const [topic, setTopic] = useState("");
  const [subtopics, setSubtopics] = useState("");
  const [mastery, setMastery] = useState("medium");
  const [numQuestions, setNumQuestions] = useState(5);

  // IMPORTANT: quiz starts as null, not []
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const topics = ["Arrays", "Stacks", "Queues", "Trees", "Graphs"];

  const handleGenerate = async () => {
    if (!topic) return;

    setLoading(true);
    try {
      const subtopicsArray = subtopics
        ? subtopics.split(",").map((s) => s.trim())
        : [topic];

      const response = await generateQuiz(
        topic,
        subtopicsArray,
        mastery,
        numQuestions
      );

      // ✅ BACKEND RETURNS { topic, quiz }
      setQuiz(response?.data?.quiz || []);
      setAnswers({});
      setResult(null);
    } catch (error) {
      console.error("Error generating quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = async () => {
    if (!quiz || Object.keys(answers).length !== quiz.length) return;

    setLoading(true);
    try {
      const response = await submitQuiz(topic, quiz, answers);
      setResult(response.data);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Quiz</h2>

      {/* ================= GENERATE QUIZ FORM ================= */}
      {quiz === null && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Topic
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select topic</option>
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtopics (comma separated)
              </label>
              <input
                type="text"
                value={subtopics}
                onChange={(e) => setSubtopics(e.target.value)}
                placeholder="e.g., Basic operations, Implementation"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mastery level
              </label>
              <select
                value={mastery}
                onChange={(e) => setMastery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="weak">Weak</option>
                <option value="medium">Medium</option>
                <option value="strong">Strong</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of questions
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !topic}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Quiz"}
          </button>
        </div>
      )}

      {/* ================= QUIZ QUESTIONS ================= */}
      {quiz && !result && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Quiz: {topic}
          </h3>

          {quiz.length === 0 && (
            <p className="text-gray-500">No questions generated.</p>
          )}

          {quiz.map((q, index) => (
            <div key={index} className="mb-6">
              <p className="font-medium mb-3">
                {index + 1}. {q.question}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* ✅ FIXED: options is an OBJECT, not array */}
                {Object.entries(q.options).map(([key, option]) => {
                  const selected = answers[index] === key;

                  return (
                    <label
                      key={key}
                      className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer ${
                        selected
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={key}
                        checked={selected}
                        onChange={() =>
                          handleAnswerChange(index, key)
                        }
                        className="form-radio text-blue-600"
                      />
                      <span className="text-sm font-semibold">
                        {key}. {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={
              loading || Object.keys(answers).length !== quiz.length
            }
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Quiz"}
          </button>
        </div>
      )}

      {/* ================= QUIZ RESULT ================= */}
      {result && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Quiz Results
          </h3>

          <p className="text-lg mb-4">
            Mastery Level:{" "}
            <span className="font-bold">{result.mastery}</span>
          </p>

          <pre className="bg-gray-50 p-3 rounded-md text-sm overflow-x-auto">
            {JSON.stringify(result.progress, null, 2)}
          </pre>

          <button
            onClick={() => {
              setQuiz(null);
              setResult(null);
              setAnswers({});
            }}
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
