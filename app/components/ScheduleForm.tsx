"use client";

import { useState, FormEvent } from "react";

interface ScheduleFormProps {
  onGenerate: (topic: string, days: number) => void;
  isLoading: boolean;
}

export default function ScheduleForm({ onGenerate, isLoading }: ScheduleFormProps) {
  const [topic, setTopic] = useState("");
  const [days, setDays] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    const daysNum = parseInt(days);
    if (!daysNum || daysNum < 1 || daysNum > 365) {
      alert("Please enter a valid number of days (1-365)");
      return;
    }

    onGenerate(topic.trim(), daysNum);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="topic"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            What do you want to learn?
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Python Programming, Digital Marketing, Guitar"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-800"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="days"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            How many days do you have?
          </label>
          <input
            type="number"
            id="days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="e.g., 30"
            min="1"
            max="365"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-800"
            disabled={isLoading}
          />
          <p className="mt-2 text-sm text-gray-500">Enter a number between 1 and 365</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating Your Schedule...
            </span>
          ) : (
            "Generate Learning Schedule"
          )}
        </button>
      </form>
    </div>
  );
}
