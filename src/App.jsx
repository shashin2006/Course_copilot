import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Plan from './pages/Plan';
import Quiz from './pages/Quiz';
import Progress from './pages/Progress';
import Login from './pages/Login';
import ProtectedRoute from './components/routes/ProtectedRoute';

function NotFound() {
  return (
    <div className="max-w-3xl mx-auto text-center py-20">
      <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-600">The page you're looking for doesn't exist. Use the navigation to continue.</p>
    </div>
  );
}

function TailwindTest() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-4xl font-bold text-blue-400">Tailwind Is Working</h1>
      <p className="mt-4 text-gray-300">If this is styled, Tailwind is correctly configured.</p>
      <div className="mt-6">
        <a href="/" className="inline-block px-4 py-2 bg-blue-600 rounded-md">Go Home</a>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/plan" element={<ProtectedRoute><Plan /></ProtectedRoute>} />
            <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
            <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
          <Route path="/tailwind-test" element={<TailwindTest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;