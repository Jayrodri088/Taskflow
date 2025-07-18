"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, CheckCircle, Users, Calendar, BarChart3 } from "lucide-react"

const onboardingSteps = [
  {
    title: "Welcome to TaskFlow Pro",
    description: "Your all-in-one solution for task management and team collaboration.",
    icon: CheckCircle,
    content:
      "TaskFlow Pro helps you organize your work, collaborate with your team, and meet deadlines efficiently. Let's take a quick tour of what you can do.",
  },
  {
    title: "Manage Your Tasks",
    description: "Create, organize, and track tasks with our intuitive interface.",
    icon: CheckCircle,
    content:
      "Create tasks with detailed descriptions, set priorities, add due dates, and organize them into projects. Use our drag-and-drop interface to easily move tasks between different stages.",
  },
  {
    title: "Collaborate with Your Team",
    description: "Assign tasks, share updates, and work together seamlessly.",
    icon: Users,
    content:
      "Invite team members, assign tasks to specific people, leave comments, and get real-time updates on project progress. Everyone stays in sync.",
  },
  {
    title: "Schedule and Plan",
    description: "Use our calendar view to plan your work and meet deadlines.",
    icon: Calendar,
    content:
      "View all your tasks in a calendar format, set deadlines, get reminders, and use our AI-powered suggestions to optimize your schedule.",
  },
  {
    title: "Track Progress",
    description: "Monitor productivity and project progress with detailed analytics.",
    icon: BarChart3,
    content:
      "Get insights into your productivity patterns, track project completion rates, and identify bottlenecks with our comprehensive dashboard analytics.",
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initial animation
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
    )
  }, [])

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      gsap.to(contentRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentStep(currentStep + 1)
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" },
          )
        },
      })
    } else {
      gsap.to(cardRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => router.push("/auth/signup"),
      })
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      gsap.to(contentRef.current, {
        opacity: 0,
        x: 30,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentStep(currentStep - 1)
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" },
          )
        },
      })
    }
  }

  const skip = () => {
    gsap.to(cardRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => router.push("/auth/signup"),
    })
  }

  const currentStepData = onboardingSteps[currentStep]
  const IconComponent = currentStepData.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <Card ref={cardRef} className="w-full max-w-2xl">
        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {onboardingSteps.length}
            </div>
            <Button variant="ghost" onClick={skip} className="text-gray-500">
              Skip
            </Button>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
            />
          </div>

          <div ref={contentRef} className="text-center mb-8">
            <IconComponent className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentStepData.title}</h2>
            <p className="text-lg text-gray-600 mb-6">{currentStepData.description}</p>
            <p className="text-gray-700 leading-relaxed">{currentStepData.content}</p>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 flex items-center">
              {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
