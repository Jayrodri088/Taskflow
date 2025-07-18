"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Users, Calendar } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if user is already authenticated
    const user = localStorage.getItem("taskapp_user")
    if (user) {
      router.push("/dashboard")
      return
    }

    // GSAP animations
    const tl = gsap.timeline()

    tl.fromTo(heroRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }).fromTo(
      featuresRef.current?.children || [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
      "-=0.5",
    )
  }, [router])

  const handleGetStarted = () => {
    gsap.to(heroRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => router.push("/onboarding"),
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div ref={heroRef} className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">TaskFlow Pro</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Streamline your workflow with intelligent task management, seamless team collaboration, and smart
            scheduling.
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg"
          >
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        <div ref={featuresRef} className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Task Management</h3>
            <p className="text-gray-600">Create, organize, and track tasks with intuitive drag-and-drop interface.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
            <p className="text-gray-600">Assign tasks, share updates, and collaborate seamlessly with your team.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Calendar className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Scheduling</h3>
            <p className="text-gray-600">AI-powered scheduling that adapts to your workflow and deadlines.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
