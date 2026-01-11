import { useState } from 'react';

const Progress = () => {
  // In a real app, this would come from backend or context
  const [progressData] = useState({
    Arrays: { mastery: 'Medium', percentage: 65 },
    Stacks: { mastery: 'Strong', percentage: 85 },
    Queues: { mastery: 'Weak', percentage: 30 },
    Trees: { mastery: 'Medium', percentage: 50 },
    Graphs: { mastery: 'Weak', percentage: 20 },
  });

  const getColor = (mastery) => {
    const m = (mastery || '').toLowerCase();
    if (m === 'weak') return 'bg-red-500';
    if (m === 'medium') return 'bg-yellow-500';
    if (m === 'strong') return 'bg-green-500';
    return 'bg-gray-500';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Progress Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(progressData).map(([topic, data]) => (
          <div key={topic} className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic}</h3>
              <p className="text-sm text-gray-600 mb-4">Mastery: <span className="font-semibold">{data.mastery}</span></p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className={`h-4 rounded-full ${getColor(data.mastery)}`}
                style={{ width: `${data.percentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">{data.percentage}% complete</p>
          </div>
        ))}
      </div>

        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Overall Progress</h3>
          <p className="text-gray-600">Continue taking quizzes to improve your mastery levels!</p>
          <div className="mt-4 flex gap-4 items-center">
            <div className="flex items-center gap-2"><span className="w-4 h-4 bg-red-500 rounded-sm" /> <span className="text-sm text-gray-600">Weak</span></div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 bg-yellow-500 rounded-sm" /> <span className="text-sm text-gray-600">Medium</span></div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 bg-green-500 rounded-sm" /> <span className="text-sm text-gray-600">Strong</span></div>
          </div>
        </div>
    </div>
  );
};

export default Progress;