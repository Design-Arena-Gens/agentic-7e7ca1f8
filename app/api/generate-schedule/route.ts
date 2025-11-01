import { NextRequest, NextResponse } from "next/server";
import { DaySchedule } from "../../page";

function generateSchedule(topic: string, days: number): DaySchedule[] {
  const schedule: DaySchedule[] = [];

  // Determine phase distribution based on total days
  const phases = {
    foundation: Math.ceil(days * 0.3),
    intermediate: Math.ceil(days * 0.4),
    advanced: Math.floor(days * 0.3)
  };

  // Knowledge base for different learning topics
  const topicPatterns = {
    programming: {
      foundation: ["syntax basics", "variables & data types", "control flow", "functions", "debugging"],
      intermediate: ["OOP concepts", "data structures", "algorithms", "APIs", "databases"],
      advanced: ["design patterns", "testing", "optimization", "deployment", "best practices"]
    },
    language: {
      foundation: ["alphabet/pronunciation", "basic greetings", "common phrases", "numbers", "introductions"],
      intermediate: ["grammar rules", "sentence structure", "vocabulary building", "conversations", "listening practice"],
      advanced: ["advanced grammar", "idioms", "cultural context", "reading literature", "fluency practice"]
    },
    creative: {
      foundation: ["basic theory", "tools introduction", "fundamentals", "simple exercises", "terminology"],
      intermediate: ["technique development", "style exploration", "composition", "practice routines", "projects"],
      advanced: ["mastery techniques", "personal style", "complex projects", "portfolio building", "refinement"]
    },
    business: {
      foundation: ["core concepts", "terminology", "basic principles", "industry overview", "fundamentals"],
      intermediate: ["strategies", "case studies", "practical application", "tools & software", "analysis"],
      advanced: ["advanced strategies", "leadership", "innovation", "real-world projects", "expert techniques"]
    },
    default: {
      foundation: ["introduction", "basic concepts", "fundamentals", "core principles", "terminology"],
      intermediate: ["deeper understanding", "practical application", "techniques", "problem solving", "projects"],
      advanced: ["mastery level", "advanced concepts", "real-world application", "optimization", "expertise"]
    }
  };

  // Determine topic category
  let category: keyof typeof topicPatterns = "default";
  const topicLower = topic.toLowerCase();

  if (topicLower.includes("programming") || topicLower.includes("coding") ||
      topicLower.includes("python") || topicLower.includes("javascript") ||
      topicLower.includes("java") || topicLower.includes("web dev")) {
    category = "programming";
  } else if (topicLower.includes("language") || topicLower.includes("spanish") ||
             topicLower.includes("french") || topicLower.includes("english")) {
    category = "language";
  } else if (topicLower.includes("art") || topicLower.includes("music") ||
             topicLower.includes("guitar") || topicLower.includes("piano") ||
             topicLower.includes("drawing") || topicLower.includes("painting")) {
    category = "creative";
  } else if (topicLower.includes("business") || topicLower.includes("marketing") ||
             topicLower.includes("management") || topicLower.includes("finance")) {
    category = "business";
  }

  const patterns = topicPatterns[category];

  for (let day = 1; day <= days; day++) {
    let phase: "foundation" | "intermediate" | "advanced";
    let phaseTopics: string[];

    if (day <= phases.foundation) {
      phase = "foundation";
      phaseTopics = patterns.foundation;
    } else if (day <= phases.foundation + phases.intermediate) {
      phase = "intermediate";
      phaseTopics = patterns.intermediate;
    } else {
      phase = "advanced";
      phaseTopics = patterns.advanced;
    }

    const phaseIndex = phase === "foundation"
      ? day - 1
      : phase === "intermediate"
        ? day - phases.foundation - 1
        : day - phases.foundation - phases.intermediate - 1;

    const topicIndex = phaseIndex % phaseTopics.length;
    const currentTopic = phaseTopics[topicIndex];

    const titles = {
      foundation: `Foundation: ${currentTopic}`,
      intermediate: `Building Skills: ${currentTopic}`,
      advanced: `Advanced: ${currentTopic}`
    };

    const activities = generateActivities(phase, currentTopic, topic);
    const goals = generateGoals(phase, day, days);

    schedule.push({
      day,
      title: titles[phase],
      topics: [currentTopic, `Review previous concepts`, `${topic}-specific practice`],
      activities,
      goals
    });
  }

  return schedule;
}

function generateActivities(phase: string, currentTopic: string, mainTopic: string): string[] {
  const baseActivities = {
    foundation: [
      `Study ${currentTopic} (30-45 min)`,
      "Take notes and create summaries",
      "Complete practice exercises",
      "Watch tutorial videos"
    ],
    intermediate: [
      `Deep dive into ${currentTopic}`,
      "Work on hands-on projects",
      "Practice with real examples",
      "Review and reinforce learning"
    ],
    advanced: [
      `Master ${currentTopic}`,
      "Build complex projects",
      "Solve challenging problems",
      "Create portfolio pieces"
    ]
  };

  return baseActivities[phase as keyof typeof baseActivities] || baseActivities.foundation;
}

function generateGoals(phase: string, day: number, totalDays: number): string[] {
  const progress = (day / totalDays) * 100;

  const baseGoals = {
    foundation: [
      "Understand core concepts",
      "Build strong fundamentals",
      "Complete daily exercises"
    ],
    intermediate: [
      "Apply knowledge practically",
      "Build confidence",
      "Create working examples"
    ],
    advanced: [
      "Achieve mastery level",
      "Complete advanced projects",
      "Demonstrate expertise"
    ]
  };

  const goals = baseGoals[phase as keyof typeof baseGoals] || baseGoals.foundation;

  if (progress >= 90) {
    goals.push("Final review and assessment");
  }

  return goals;
}

export async function POST(request: NextRequest) {
  try {
    const { topic, days } = await request.json();

    if (!topic || typeof topic !== "string") {
      return NextResponse.json(
        { error: "Invalid topic provided" },
        { status: 400 }
      );
    }

    if (!days || typeof days !== "number" || days < 1 || days > 365) {
      return NextResponse.json(
        { error: "Days must be a number between 1 and 365" },
        { status: 400 }
      );
    }

    const schedule = generateSchedule(topic, days);

    return NextResponse.json({ schedule });
  } catch (error) {
    console.error("Error generating schedule:", error);
    return NextResponse.json(
      { error: "Failed to generate schedule" },
      { status: 500 }
    );
  }
}
