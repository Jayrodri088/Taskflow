export function getStatusColor(status: string): string {
  switch (status) {
    case "completed":
      return "bg-green-500/20 text-green-300 border border-green-500/30"
    case "in-progress":
      return "bg-blue-500/20 text-blue-300 border border-blue-500/30"
    case "todo":
      return "bg-amber-500/20 text-amber-300 border border-amber-500/30"
    default:
      return "bg-slate-500/20 text-slate-300 border border-slate-500/30"
  }
}
