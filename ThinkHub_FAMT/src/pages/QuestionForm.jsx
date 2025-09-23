import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function QuestionForm() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/questions", data);
      reset();
      navigate("/");
    } catch (err) {
      console.error("Error posting question:", err);
      alert("Failed to post question.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <textarea
              placeholder="Description"
              {...register("description")}
              className="w-full p-3 border border-gray-300 rounded h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Your Name"
              {...register("author", { required: true })}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Post Question
          </button>
        </form>
      </div>
    </div>
  );
}
