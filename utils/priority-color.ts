export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "high":
      return "bg-red-500/20 text-red-300 border border-red-500/30"
    case "medium":
      return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
    case "low":
      return "bg-green-500/20 text-green-300 border border-green-500/30"
    default:
      return "bg-slate-500/20 text-slate-300 border border-slate-500/30"
  }
}
