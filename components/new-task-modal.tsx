"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Calendar, AlertCircle } from "lucide-react"

interface Task {
  title: string
  description: string
  status: "todo" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  assigneeId: string
  assigneeName: string
  dueDate: string
}

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
}

interface NewTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (task: Task) => void
  teamMembers: TeamMember[]
}

export function NewTaskModal({ isOpen, onClose, onSubmit, teamMembers }: NewTaskModalProps) {
  const [formData, setFormData] = useState<Task>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    assigneeId: "",
    assigneeName: "",
    dueDate: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (isOpen && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.8, rotationY: 15 },
        { opacity: 1, scale: 1, rotationY: 0, duration: 0.4, ease: "back.out(1.7)" },
      )

      // Animate form fields
      if (formRef.current) {
        gsap.fromTo(
          formRef.current.querySelectorAll(".form-field"),
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
    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.assigneeId) newErrors.assigneeId = "Please assign this task to someone"
    if (!formData.dueDate) newErrors.dueDate = "Due date is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    onSubmit(formData)
    handleClose()
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
          // Reset form
          setFormData({
            title: "",
            description: "",
            status: "todo",
            priority: "medium",
            assigneeId: "",
            assigneeName: "",
            dueDate: "",
          })
          setErrors({})
        },
      })
    }
  }

  const handleAssigneeChange = (value: string) => {
    const member = teamMembers.find((m) => m.id === value)
    setFormData({
      ...formData,
      assigneeId: value,
      assigneeName: member?.name || "",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        ref={contentRef}
        className="sm:max-w-[500px] bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-white"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <AlertCircle className="h-5 w-5 mr-2 text-blue-400" />
            Create New Task
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            Create a new task and assign it to a team member. Fill in all the details below.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="form-field space-y-2">
            <Label htmlFor="title" className="text-slate-200">
              Task Title *
            </Label>
            <Input
              id="title"
              placeholder="Enter task title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 ${errors.title ? "border-red-500" : ""}`}
            />
            {errors.title && <p className="text-sm text-red-400">{errors.title}</p>}
          </div>

          <div className="form-field space-y-2">
            <Label htmlFor="description" className="text-slate-200">
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Describe the task in detail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 ${errors.description ? "border-red-500" : ""}`}
              rows={3}
            />
            {errors.description && <p className="text-sm text-red-400">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-field space-y-2">
              <Label className="text-slate-200">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: "low" | "medium" | "high") => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="low" className="text-slate-200 hover:bg-slate-700">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                      Low
                    </div>
                  </SelectItem>
                  <SelectItem value="medium" className="text-slate-200 hover:bg-slate-700">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2" />
                      Medium
                    </div>
                  </SelectItem>
                  <SelectItem value="high" className="text-slate-200 hover:bg-slate-700">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                      High
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="form-field space-y-2">
              <Label className="text-slate-200">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "todo" | "in-progress" | "completed") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="todo" className="text-slate-200 hover:bg-slate-700">
                    To Do
                  </SelectItem>
                  <SelectItem value="in-progress" className="text-slate-200 hover:bg-slate-700">
                    In Progress
                  </SelectItem>
                  <SelectItem value="completed" className="text-slate-200 hover:bg-slate-700">
                    Completed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="form-field space-y-2">
            <Label className="text-slate-200">Assign to *</Label>
            <Select value={formData.assigneeId} onValueChange={handleAssigneeChange}>
              <SelectTrigger
                className={`bg-slate-700/50 border-slate-600 text-white ${errors.assigneeId ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Select team member..." />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id} className="text-slate-200 hover:bg-slate-700">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-800 text-white text-xs">
                          <AvatarInitials name={member.name} />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-xs text-slate-400">{member.role}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.assigneeId && <p className="text-sm text-red-400">{errors.assigneeId}</p>}
          </div>

          <div className="form-field space-y-2">
            <Label htmlFor="dueDate" className="text-slate-200">
              Due Date *
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className={`pl-10 bg-slate-700/50 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20 ${errors.dueDate ? "border-red-500" : ""}`}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            {errors.dueDate && <p className="text-sm text-red-400">{errors.dueDate}</p>}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="border-slate-600 text-slate-200 hover:bg-slate-700/50 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
