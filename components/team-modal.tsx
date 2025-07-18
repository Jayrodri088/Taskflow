"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import { Users, Mail, UserPlus, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
}

interface TeamModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (member: Omit<TeamMember, "id">) => void
  teamMembers: TeamMember[]
}

export function TeamModal({ isOpen, onClose, onSubmit, teamMembers }: TeamModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Developer",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)
  const teamListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.8, rotationY: 15 },
        { opacity: 1, scale: 1, rotationY: 0, duration: 0.4, ease: "back.out(1.7)" },
      )

      // Animate team member cards
      if (teamListRef.current) {
        gsap.fromTo(
          teamListRef.current.children,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, delay: 0.2, ease: "power2.out" },
        )
      }
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsSubmitting(true)

    // Validation
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email"
    if (teamMembers.some((member) => member.email === formData.email)) {
      newErrors.email = "This email is already in the team"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    onSubmit(formData)
    setFormData({ name: "", email: "", role: "Developer" })
    setShowAddForm(false)
    setIsSubmitting(false)
  }

  const handleClose = () => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.8,
        rotationY: -15,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          onClose()
          setFormData({ name: "", email: "", role: "Developer" })
          setErrors({})
          setShowAddForm(false)
        },
      })
    }
  }

  const roles = [
    "Project Manager",
    "Developer",
    "Designer",
    "DevOps",
    "QA Tester",
    "Product Manager",
    "Marketing",
    "Sales",
  ]

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        ref={contentRef}
        className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-white"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Users className="h-5 w-5 mr-2 text-blue-400" />
            Team Management
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            Manage your team members and their roles. Add new members to collaborate on tasks.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Team Members */}
          <Card className="bg-slate-700/30 border-slate-600">
            <CardHeader>
              <CardTitle className="text-lg text-white">Current Team ({teamMembers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div ref={teamListRef} className="space-y-3 max-h-60 overflow-y-auto">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 border border-slate-600 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10 ring-2 ring-blue-500/30">
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                          <AvatarInitials name={member.name} />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white">{member.name}</div>
                        <div className="text-sm text-slate-300">{member.email}</div>
                        <div className="text-xs text-blue-400">{member.role}</div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-red-400 hover:bg-red-900/20"
                      onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2 })
                      }}
                      onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Add New Member */}
          {!showAddForm ? (
            <Button
              onClick={() => setShowAddForm(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { scale: 1.02, duration: 0.2 })
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })
              }}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Team Member
            </Button>
          ) : (
            <Card className="bg-slate-700/30 border-slate-600">
              <CardHeader>
                <CardTitle className="text-lg text-white">Add New Member</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-200">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter full name..."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 ${errors.name ? "border-red-500" : ""}`}
                    />
                    {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-200">
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address..."
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 ${errors.email ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-200">Role</Label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {roles.map((role) => (
                          <SelectItem key={role} value={role} className="text-slate-200 hover:bg-slate-700">
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false)
                        setFormData({ name: "", email: "", role: "Developer" })
                        setErrors({})
                      }}
                      disabled={isSubmitting}
                      className="border-slate-600 text-slate-200 hover:bg-slate-700/50"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Adding..." : "Add Member"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            className="border-slate-600 text-slate-200 hover:bg-slate-700/50 bg-transparent"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
