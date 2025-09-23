import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loadingQuestion, setLoadingQuestion] = useState(true);

  const [answers, setAnswers] = useState([]);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [loadingAnswers, setLoadingAnswers] = useState(false);
  const [answersError, setAnswersError] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null); // for posting errors

  const LIMIT = 3;

  const { register, handleSubmit, reset } = useForm();

  // Check login
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Load question
  useEffect(() => {
    const loadQuestion = async () => {
      setLoadingQuestion(true);
      try {
        const res = await axios.get(`/api/questions/${id}`);
        setQuestion(res.data.question || res.data);
      } catch (err) {
        console.error("Error loading question:", err);
        setQuestion(null);
      } finally {
        setLoadingQuestion(false);
      }
    };
    loadQuestion();
  }, [id]);

  // Load initial answers
  useEffect(() => {
    const loadInitialAnswers = async () => {
      try {
        setLoadingAnswers(true);
        setAnswersError(null);
        const res = await axios.get(`/api/answers/${id}?skip=0&limit=${LIMIT}`);
        const arr = res.data || [];
        setAnswers(arr);

        const countRes = await axios.get(`/api/answers/${id}?skip=0&limit=0`);
        setTotalAnswers(countRes.data.length || arr.length);
      } catch (err) {
        console.error("Error loading answers:", err);
        setAnswersError("Failed to load answers.");
      } finally {
        setLoadingAnswers(false);
      }
    };
    loadInitialAnswers();
  }, [id]);

  const loadMoreAnswers = async () => {
    try {
      setLoadingAnswers(true);
      setAnswersError(null);
      const res = await axios.get(
        `/api/answers/${id}?skip=${answers.length}&limit=${LIMIT}`
      );
      setAnswers((prev) => [...prev, ...res.data]);
    } catch (err) {
      console.error("Error loading more answers:", err);
      setAnswersError("Failed to load more answers.");
    } finally {
      setLoadingAnswers(false);
    }
  };

  const onSubmit = async (formData) => {
    if (!token || !user) {
      setErrorMsg(
        <>
          You must{" "}
          <Link to="/login" className="text-blue-600 underline">
            login
          </Link>{" "}
          to post an answer.
        </>
      );
      return;
    }

    try {
      setErrorMsg(null);
      const res = await axios.post(
        `/api/answers/${id}`,
        { content: formData.content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      reset();

      setTotalAnswers((prev) => prev + 1);
      const newTotal = totalAnswers + 1;

      if (newTotal <= LIMIT) {
        setAnswers((prev) => [res.data, ...prev]);
      } else {
        const resNew = await axios.get(
          `/api/answers/${id}?skip=0&limit=${LIMIT}`
        );
        setAnswers(resNew.data);
      }
    } catch (err) {
      console.error("Error posting answer:", err);
      setErrorMsg("Failed to post answer. Please try again.");
    }
  };

  if (loadingQuestion) return <p className="p-4">Loading question...</p>;
  if (!question) return <p className="p-4">Question not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Question */}
      <div className="bg-white shadow-md rounded-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">{question.title}</h2>
        <p className="mb-2">{question.description}</p>
        <p className="text-gray-500 text-sm">
          By <span className="italic">{question.author}</span>
        </p>
      </div>

      {/* Answers */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Answers</h3>
        {loadingAnswers && answers.length === 0 && <p>Loading answers...</p>}
        {answersError && <p className="text-red-500">{answersError}</p>}
        {answers.length === 0 && (
          <p className="text-gray-500">No answers yet.</p>
        )}

        <ul>
          {answers.map((a) => (
            <li key={a._id} className="mb-4 border-b pb-2">
              <p>{a.content}</p>
              <small className="text-gray-600">
                — {a.author?.name || "Unknown"}
              </small>
            </li>
          ))}
        </ul>

        {answers.length < totalAnswers && (
          <button
            onClick={loadMoreAnswers}
            disabled={loadingAnswers}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {loadingAnswers ? "Loading..." : "Show more answers"}
          </button>
        )}
        {answers.length >= totalAnswers && answers.length > 0 && (
          <div className="mt-2 text-gray-500 text-sm">No more answers.</div>
        )}
      </div>

      {/* Answer form */}
      <div className="bg-white shadow-md rounded-md p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="text-lg font-semibold mb-2">Write an Answer</h4>
          {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}
          <textarea
            placeholder="Your Answer"
            {...register("content", { required: true })}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Post Answer
          </button>
        </form>
      </div>
    </div>
  );
}
