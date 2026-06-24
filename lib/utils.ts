import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "active":
    case "on-target":
    case "healthy":
    case "pass":
    case "resolved":
      return "text-emerald-400";
    case "retiring":
    case "watch":
    case "warning":
    case "pending":
      return "text-amber-400";
    case "retired":
    case "critical":
    case "fail":
    case "overdue":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
}

export function getStatusBg(status: string): string {
  switch (status.toLowerCase()) {
    case "active":
    case "on-target":
    case "healthy":
      return "bg-emerald-400/10 border-emerald-400/20 text-emerald-400";
    case "retiring":
    case "watch":
    case "warning":
      return "bg-amber-400/10 border-amber-400/20 text-amber-400";
    case "retired":
    case "critical":
    case "fail":
      return "bg-red-400/10 border-red-400/20 text-red-400";
    default:
      return "bg-gray-400/10 border-gray-400/20 text-gray-400";
  }
}

export function calculateProgress(
  current: number,
  baseline: number,
  target: number
): number {
  if (target === baseline) return 100;
  const progress = ((current - baseline) / (target - baseline)) * 100;
  return Math.min(Math.max(progress, 0), 100);
}

export function getHostingIcon(model: string): string {
  switch (model.toLowerCase()) {
    case "saas":
      return "☁️";
    case "cloud":
      return "🌐";
    case "on-premise":
      return "🏢";
    default:
      return "📦";
  }
}

export function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}

export function isInvertedMetric(id: string): boolean {
  return ["freshness", "error-rate", "fte-hours"].includes(id);
}

export function calculateInvertedProgress(
  current: number,
  target: number,
  baseline: number
): number {
  if (baseline === target) return 100;
  // For inverted metrics, baseline > target (we want to go DOWN)
  // progress = how far we've come from baseline toward target
  const progress = ((baseline - current) / (baseline - target)) * 100;
  return Math.min(Math.max(progress, 0), 100);
}
