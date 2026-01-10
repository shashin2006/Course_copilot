import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Plan from './pages/Plan';
import Quiz from './pages/Quiz';
import Progress from './pages/Progress';

function NotFound() {
  return (
    <div className="max-w-3xl mx-auto text-center py-20">
      <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-600">The page you're looking for doesn't exist. Use the navigation to continue.</p>
    </div>
  );
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;