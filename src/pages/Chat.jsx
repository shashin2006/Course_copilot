import { useState, useRef, useEffect } from 'react';
import { askQuestion } from '../services/api';

const Chat = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!question.trim()) return;

    const userMessage = { type: 'user', content: question };
    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);

    try {
      const response = await askQuestion(question);
      const answer = response?.data?.answer || '';
      const citations = response?.data?.citations || [];

      const botMessage = {
        type: 'bot',
        content: answer || 'I could not find a relevant answer in the uploaded documents.',
        citations,
        notFound: !answer || answer.toLowerCase().includes('not found') || answer.toLowerCase().includes('could not')
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'bot',
        content: "An error occurred while searching. Try again later.",
        citations: []
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">RAG Chat</h2>

      <div ref={scrollRef} className="bg-white rounded-lg shadow-sm p-6 mb-6 h-96 overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center">Ask a question about your uploaded documents...</p>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-lg ${msg.type === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-900 rounded-bl-none'}`}>
              <div className="whitespace-pre-wrap">{msg.content}</div>
              {msg.notFound && <div className="mt-2 text-xs text-gray-500">No matches found in uploaded documents.</div>}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-3">
                  <div className="text-sm font-semibold text-gray-700 mb-1">Citations</div>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    {msg.citations.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="inline-block p-3 rounded-lg bg-gray-100 text-gray-700">Thinking...</div>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !question.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
