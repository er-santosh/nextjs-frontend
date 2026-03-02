import type { RouteMatchStrategy, SidebarItem } from "@/types";

export interface RouteMatchOptions {
  strategy?: RouteMatchStrategy;
  pattern?: RegExp;
  customMatcher?: (currentPath: string, itemUrl: string) => boolean;
}

export function matchesRoute(
  currentPath: string,
  itemUrl: string,
  options: RouteMatchOptions = {}
): boolean {
  const { strategy = "prefix", pattern, customMatcher } = options;

  const normalizedCurrent = normalizePath(currentPath);
  const normalizedItem = normalizePath(itemUrl);

  switch (strategy) {
    case "exact":
      return normalizedCurrent === normalizedItem;

    case "prefix":
      return (
        normalizedCurrent === normalizedItem ||
        normalizedCurrent.startsWith(`${normalizedItem}/`)
      );

    case "pattern":
      if (!pattern) {
        return false;
      }
      return pattern.test(normalizedCurrent);

    case "custom":
      if (!customMatcher) {
        return false;
      }
      return customMatcher(currentPath, itemUrl);

    default:
      return false;
  }
}

function normalizePath(path: string): string {
  if (!path) return "/";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized.endsWith("/") && normalized.length > 1
    ? normalized.slice(0, -1)
    : normalized;
}

export function hasActiveChild(
  currentPath: string,
  items: SidebarItem[] = []
): boolean {
  return items.some(item =>
    matchesRoute(currentPath, item.url, {
      strategy: item.matchStrategy,
      pattern: item.matchPattern,
      customMatcher: item.customMatcher,
    })
  );
}

export const extractRoutes = (obj: unknown): string[] => {
  const routes: string[] = [];

  for (const value of Object.values(obj as Record<string, unknown>)) {
    if (typeof value === "string") {
      routes.push(value);
    } else if (typeof value === "object" && value !== null) {
      routes.push(...extractRoutes(value));
    }
  }

  return routes;
};
