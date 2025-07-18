"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Search,
  Filter,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreHorizontal,
  LogOut,
  Settings,
  Bell,
  UserPlus,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NewTaskModal } from "@/components/new-task-modal"
import { TeamModal } from "@/components/team-modal"
import type { User } from "@/types/user"
import { getStatusColor } from "@/utils/status-color"
import { getPriorityColor } from "@/utils/priority-color"

interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  assigneeId: string
  assigneeName: string
  dueDate: string
  createdAt: string
  createdBy: string
}

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const router = useRouter()

  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false)
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [activeTab, setActiveTab] = useState("all")

  const dashboardRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const welcomeRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const tasksRef = useRef<HTMLDivElement>(null)
  const taskCardsRef = useRef<HTMLDivElement>(null)

  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])

  useEffect(() => {
    const userRaw = localStorage.getItem("taskapp_user")
    if (!userRaw) {
      router.push("/auth/login")
      return
    }

    const currentUser: User = JSON.parse(userRaw)
    setUser(currentUser)

    if (tasks.length === 0) {
      const seededTasks: Task[] = [
        {
          id: "1",
          title: "Design new landing page",
          description: "Create a modern, responsive landing page for the product launch",
          status: "in-progress",
          priority: "high",
          assigneeId: "2",
          assigneeName: "John Doe",
          dueDate: "2024-01-15",
          createdAt: "2024-01-10",
          createdBy: currentUser.id,
        },
        {
          id: "2",
          title: "Implement user authentication",
          description: "Set up secure login and registration system",
          status: "todo",
          priority: "high",
          assigneeId: currentUser.id,
          assigneeName: currentUser.name,
          dueDate: "2024-01-20",
          createdAt: "2024-01-10",
          createdBy: "2",
        },
        {
          id: "3",
          title: "Write API documentation",
          description: "Document all API endpoints with examples",
          status: "completed",
          priority: "medium",
          assigneeId: "3",
          assigneeName: "Mike Johnson",
          dueDate: "2024-01-12",
          createdAt: "2024-01-08",
          createdBy: currentUser.id,
        },
        {
          id: "4",
          title: "Set up CI/CD pipeline",
          description: "Configure automated testing and deployment",
          status: "todo",
          priority: "medium",
          assigneeId: currentUser.id,
          assigneeName: currentUser.name,
          dueDate: "2024-01-25",
          createdAt: "2024-01-10",
          createdBy: "4",
        },
        {
          id: "5",
          title: "Conduct user testing",
          description: "Gather feedback from beta users",
          status: "in-progress",
          priority: "low",
          assigneeId: "5",
          assigneeName: "Tom Brown",
          dueDate: "2024-01-18",
          createdAt: "2024-01-09",
          createdBy: currentUser.id,
        },
      ]

      const seededTeam: TeamMember[] = [
        { id: currentUser.id, name: currentUser.name, email: currentUser.email, role: "Project Manager" },
        { id: "2", name: "John Doe", email: "john@example.com", role: "Designer" },
        { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "Developer" },
        { id: "4", name: "Sarah Wilson", email: "sarah@example.com", role: "DevOps" },
        { id: "5", name: "Tom Brown", email: "tom@example.com", role: "QA Tester" },
      ]

      setTasks(seededTasks)
      setTeamMembers(seededTeam)
    }

    // Enhanced GSAP animations
    requestAnimationFrame(() => {
      const tl = gsap.timeline()

      // Header animation with slide down effect
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -50, rotationX: -90 },
        { opacity: 1, y: 0, rotationX: 0, duration: 0.8, ease: "power3.out" },
      )

        // Welcome section with typewriter effect
        .fromTo(
          welcomeRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.4",
        )

        // Stats cards with staggered bounce effect
        .fromTo(
          statsRef.current?.children || [],
          { opacity: 0, y: 60, rotationY: 45 },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.3",
        )

        // Tasks section with slide up and scale
        .fromTo(
          tasksRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" },
          "-=0.2",
        )
    })
  }, [])

  // Animate task cards when they change
  useEffect(() => {
    const filtered = tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterStatus === "all" || task.status === filterStatus
      return matchesSearch && matchesFilter
    })

    switch (activeTab) {
      case "assigned-to-me":
        setFilteredTasks(filtered.filter((task) => task.assigneeId === user.id))
        break
      case "assigned-by-me":
        setFilteredTasks(filtered.filter((task) => task.createdBy === user.id))
        break
      case "all":
      default:
        setFilteredTasks(filtered)
        break
    }

    if (taskCardsRef.current?.children) {
      gsap.fromTo(
        taskCardsRef.current.children,
        { opacity: 0, x: -30, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
      )
    }
  }, [tasks, searchTerm, filterStatus, activeTab])

  const handleLogout = () => {
    gsap.to(dashboardRef.current, {
      opacity: 0,
      scale: 0.95,
      rotationY: 15,
      duration: 0.6,
      ease: "power2.in",
      onComplete: () => {
        localStorage.removeItem("taskapp_user")
        router.push("/")
      },
    })
  }

  const handleCreateTask = (taskData: Omit<Task, "id" | "createdAt" | "createdBy">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      createdBy: user.id,
    }
    setTasks([newTask, ...tasks])
    setIsNewTaskModalOpen(false)
  }

  const handleAddTeamMember = (memberData: Omit<TeamMember, "id">) => {
    const newMember: TeamMember = {
      ...memberData,
      id: Date.now().toString(),
    }
    setTeamMembers([...teamMembers, newMember])
    setIsTeamModalOpen(false)
  }

  const allTasks = tasks
  const myTasks = tasks.filter((t) => t.assigneeId === user.id)
  const createdByMe = tasks.filter((t) => t.createdBy === user.id)

  const stats = {
    total: allTasks.length,
    completed: allTasks.filter((t) => t.status === "completed").length,
    inProgress: allTasks.filter((t) => t.status === "in-progress").length,
    todo: allTasks.filter((t) => t.status === "todo").length,
    assignedToMe: myTasks.length,
    assignedByMe: createdByMe.length,
  }

  if (!user) return null

  const TaskList = ({ tasks }: { tasks: Task[] }) => (
    <div ref={taskCardsRef} className="space-y-4">
      {tasks.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-slate-600" />
          <p className="text-lg">No tasks found</p>
          <p className="text-sm mt-2">Create a new task to get started</p>
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="border border-slate-700/30 rounded-xl p-6 bg-gradient-to-r from-slate-800/50 to-slate-900/30 backdrop-blur-sm hover:from-slate-800/70 hover:to-slate-900/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02] cursor-pointer group"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                y: -2,
                duration: 0.2,
                ease: "power2.out",
              })
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                y: 0,
                duration: 0.2,
                ease: "power2.out",
              })
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="font-semibold text-white text-lg group-hover:text-blue-300 transition-colors">
                    {task.title}
                  </h3>
                  <Badge className={getStatusColor(task.status)}>{task.status.replace("-", " ")}</Badge>
                  <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                </div>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">{task.description}</p>
                <div className="flex items-center space-x-6 text-sm text-slate-400">
                  <div className="flex items-center">
                    <Avatar className="h-7 w-7 mr-3 ring-2 ring-blue-500/30">
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-800 text-white text-xs">
                        <AvatarInitials name={task.assigneeName} />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-slate-200">{task.assigneeName}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                    <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                  {task.createdBy !== task.assigneeId && (
                    <div className="text-xs text-slate-500">
                      Created by {teamMembers.find((m) => m.id === task.createdBy)?.name || "Unknown"}
                    </div>
                  )}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-700/50">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800 border-slate-700">
                  <DropdownMenuItem className="text-slate-200 hover:bg-slate-700">Edit</DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-200 hover:bg-slate-700">Reassign</DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-200 hover:bg-slate-700">Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem className="text-red-400 hover:bg-red-900/20">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))
      )}
    </div>
  )

  return (
    <div ref={dashboardRef} className="min-h-screen bg-gradient-to-br from-[#0A1128] via-[#121A30] to-[#0A1128]">
      {/* Header */}
      <header
        ref={headerRef}
        className="bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-md shadow-2xl border-b border-slate-700/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                TaskFlow Pro
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:text-white hover:bg-slate-700/50 relative"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2 })
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })
                }}
              >
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 ring-2 ring-blue-500/50">
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                        <AvatarInitials name={user.name} />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">{user.name}</p>
                      <p className="text-xs leading-none text-slate-400">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem className="text-slate-200 hover:bg-slate-700">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-slate-200 hover:bg-slate-700">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div ref={welcomeRef} className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {user.name}
            </span>
            !
          </h2>
          <p className="text-slate-300 text-lg">{"Here's what's happening with your tasks today."}</p>
        </div>

        {/* Stats Cards */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 border-slate-700/50 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Total Tasks</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/40 to-slate-900/60 border-green-700/30 backdrop-blur-sm hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">{stats.completed}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/40 to-slate-900/60 border-blue-700/30 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">{stats.inProgress}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/40 to-slate-900/60 border-amber-700/30 backdrop-blur-sm hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">To Do</CardTitle>
              <AlertCircle className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-400">{stats.todo}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks Section */}
        <Card
          ref={tasksRef}
          className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 border-slate-700/50 backdrop-blur-sm"
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-white text-xl">Tasks</CardTitle>
                <CardDescription className="text-slate-300">Manage and track your tasks</CardDescription>
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={() => setIsTeamModalOpen(true)}
                  variant="outline"
                  className="border-slate-600 text-slate-200 hover:bg-slate-700/50 hover:text-white transition-all duration-200"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 })
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })
                  }}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
                <Button
                  onClick={() => setIsNewTaskModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 })
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Task
                </Button>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex space-x-4 mt-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-200 hover:bg-slate-700/50 bg-transparent"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800 border-slate-700">
                  <DropdownMenuItem
                    onClick={() => setFilterStatus("all")}
                    className="text-slate-200 hover:bg-slate-700"
                  >
                    All Tasks
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFilterStatus("todo")}
                    className="text-slate-200 hover:bg-slate-700"
                  >
                    To Do
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFilterStatus("in-progress")}
                    className="text-slate-200 hover:bg-slate-700"
                  >
                    In Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFilterStatus("completed")}
                    className="text-slate-200 hover:bg-slate-700"
                  >
                    Completed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-700/50 border-slate-600">
                <TabsTrigger
                  value="all"
                  className="text-slate-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-200"
                >
                  All Tasks ({stats.total})
                </TabsTrigger>
                <TabsTrigger
                  value="assigned-to-me"
                  className="text-slate-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-200"
                >
                  Assigned to Me ({stats.assignedToMe})
                </TabsTrigger>
                <TabsTrigger
                  value="assigned-by-me"
                  className="text-slate-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-200"
                >
                  Assigned by Me ({stats.assignedByMe})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <TaskList tasks={filteredTasks} />
              </TabsContent>

              <TabsContent value="assigned-to-me" className="mt-6">
                <TaskList tasks={filteredTasks} />
              </TabsContent>

              <TabsContent value="assigned-by-me" className="mt-6">
                <TaskList tasks={filteredTasks} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        onSubmit={handleCreateTask}
        teamMembers={teamMembers}
      />

      <TeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        onSubmit={handleAddTeamMember}
        teamMembers={teamMembers}
      />
    </div>
  )
}
