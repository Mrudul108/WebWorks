import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("/api/questions");
        setQuestions(res.data || []);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-8 md:p-12 rounded-2xl shadow-2xl mb-10 text-center w">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full"></div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">
          ThinkHub <span className="text-yellow-300">FAMT</span>
        </h1>
        <p className="text-lg md:text-xl opacity-95 mb-6 relative z-10">
          Our vibrant community for knowledge sharing, problem-solving, and learning together. 🌱
        </p>
        <Link
          to="/ask"
          className="relative z-10 inline-flex items-center mt-2 px-6 py-3 bg-white text-purple-700 font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <span className="mr-2">🚀</span> Ask a Question
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all text-white text-center">
          <h2 className="text-3xl font-bold">{questions.length}</h2>
          <p className="opacity-90">Questions Asked</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all text-white text-center">
          <h2 className="text-3xl font-bold">∞</h2>
          <p className="opacity-90">Possibilities</p>
        </div>
      </div>

      {/* Questions List Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recent Questions</h2>
        {/* <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white">
          {questions.length}
        </div> */}
      </div>

      {/* Questions List */}
      {loading && (
        <div className="flex justify-center my-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-6">
        {!loading && !error && questions.length === 0 && (
          <div className="text-center py-10 bg-gray-50 rounded-2xl shadow-sm">
            <div className="text-5xl mb-4">🤔</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No questions yet</h3>
            <p className="text-gray-500">Be the first to ask a question!</p>
          </div>
        )}

        {!loading &&
          !error &&
          questions.map((q) => (
            <Link
              key={q._id}
              to={`/questions/${q._id}`}
              className="block bg-white p-4 rounded-2xl shadow-md hover:shadow-xl 
                   hover:-translate-y-1 transition-all duration-300 border-l-4 border-purple-500
                   cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors mb-3">
                  {q.title}
                </h2>
              </div>

              <p className="text-gray-600 line-clamp-1 mb-3">{q.description}</p>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xs mr-2">
                    {q.author?.charAt(0) || 'U'}
                  </span>
                  by {q.author || 'Unknown'}
                </div>

                {q.tags && q.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {q.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-semibold rounded-full 
                            bg-gradient-to-r from-blue-50 to-purple-50 text-purple-700 border border-purple-100"
                      >
                        #{tag}
                      </span>
                    ))}
                    {q.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                        +{q.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
}
