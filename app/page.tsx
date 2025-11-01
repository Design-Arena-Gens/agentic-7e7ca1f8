"use client";

import { useState } from "react";
import ScheduleForm from "./components/ScheduleForm";
import ScheduleDisplay from "./components/ScheduleDisplay";

export interface DaySchedule {
  day: number;
  title: string;
  topics: string[];
  activities: string[];
  goals: string[];
}

export default function Home() {
  const [schedule, setSchedule] = useState<DaySchedule[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateSchedule = async (topic: string, days: number) => {
    setIsLoading(true);
    setSchedule(null);

    try {
      const response = await fetch("/api/generate-schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, days }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate schedule");
      }

      const data = await response.json();
      setSchedule(data.schedule);
    } catch (error) {
      console.error("Error generating schedule:", error);
      alert("Failed to generate schedule. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSchedule(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            📚 Learning Schedule Generator
          </h1>
          <p className="text-lg text-gray-600">
            Create a personalized learning plan for any topic
          </p>
        </div>

        {!schedule ? (
          <ScheduleForm
            onGenerate={handleGenerateSchedule}
            isLoading={isLoading}
          />
        ) : (
          <ScheduleDisplay schedule={schedule} onReset={handleReset} />
        )}
      </div>
    </main>
  );
}
