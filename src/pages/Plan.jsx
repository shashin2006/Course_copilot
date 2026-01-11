import { useState } from 'react';
import { generatePlan, replan } from '../services/api';

const Plan = () => {
  const [form, setForm] = useState({
    hours_per_week: '',
    duration_weeks: '',
    learning_pace: 'medium',
    goal: 'Prepare for technical interviews'
  });
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const syllabus = ["Arrays", "Stacks", "Queues", "Trees", "Graphs"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const constraints = {
        hours_per_week: parseInt(form.hours_per_week),
        duration_weeks: parseInt(form.duration_weeks),
        learning_pace: form.learning_pace,
        goal: form.goal
      };
      const response = await generatePlan(syllabus, constraints);
      setPlan(response?.data?.plan || String(response?.data || ''));
    } catch (error) {
      console.error(error);
      setPlan('Failed to generate plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReplan = async () => {
    if (!plan) return;
    setLoading(true);
    try {
      const constraints = {
        hours_per_week: parseInt(form.hours_per_week),
        duration_weeks: parseInt(form.duration_weeks),
        learning_pace: form.learning_pace,
        goal: form.goal
      };
      const response = await replan(plan, constraints);
      setPlan(response?.data?.plan || String(response?.data || plan));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(plan);
      alert('Plan copied to clipboard');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Study Plan Generator</h2>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hours per week</label>
            <input
              type="number"
              name="hours_per_week"
              value={form.hours_per_week}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (weeks)</label>
            <input
              type="number"
              name="duration_weeks"
              value={form.duration_weeks}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Learning pace</label>
            <select
              name="learning_pace"
              value={form.learning_pace}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="slow">Slow</option>
              <option value="medium">Medium</option>
              <option value="fast">Fast</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
            <input
              type="text"
              name="goal"
              value={form.goal}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate Plan'}
          </button>
          {plan && (
            <button
              onClick={handleReplan}
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Replanning...' : 'Re-plan'}
            </button>
          )}
        </div>
      </div>

      {plan && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Your Study Plan</h3>
            <div className="flex gap-2">
              <button onClick={handleCopy} className="px-3 py-1 bg-gray-100 rounded-md text-sm">Copy</button>
              <button onClick={() => window.print()} className="px-3 py-1 bg-gray-100 rounded-md text-sm">Print</button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto text-gray-700">
            <div className="prose prose-sm max-w-none whitespace-pre-wrap">{plan}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plan;