"use client";

import { DaySchedule } from "../page";

interface ScheduleDisplayProps {
  schedule: DaySchedule[];
  onReset: () => void;
}

export default function ScheduleDisplay({ schedule, onReset }: ScheduleDisplayProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Learning Schedule</h2>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium shadow"
            >
              🖨️ Print
            </button>
            <button
              onClick={onReset}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium shadow"
            >
              ✨ Create New
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {schedule.map((day) => (
            <div
              key={day.day}
              className="border-2 border-gray-200 rounded-xl p-5 hover:border-indigo-300 transition-all"
            >
              <div className="flex items-center mb-3">
                <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                  {day.day}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{day.title}</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-4 ml-13">
                <div>
                  <h4 className="font-semibold text-indigo-700 mb-2 text-sm">📖 Topics</h4>
                  <ul className="space-y-1">
                    {day.topics.map((topic, idx) => (
                      <li key={idx} className="text-sm text-gray-700">
                        • {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-green-700 mb-2 text-sm">✏️ Activities</h4>
                  <ul className="space-y-1">
                    {day.activities.map((activity, idx) => (
                      <li key={idx} className="text-sm text-gray-700">
                        • {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-700 mb-2 text-sm">🎯 Goals</h4>
                  <ul className="space-y-1">
                    {day.goals.map((goal, idx) => (
                      <li key={idx} className="text-sm text-gray-700">
                        • {goal}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Tips for Success</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Stay consistent and follow the schedule daily</li>
          <li>• Take breaks when needed to avoid burnout</li>
          <li>• Track your progress and celebrate small wins</li>
          <li>• Adjust the pace if needed - learning is a personal journey</li>
        </ul>
      </div>
    </div>
  );
}
