export function matchesRoute(pathname: string, routePattern: string): boolean {
  if (pathname === routePattern) {
    return true;
  }

  const routeSegments = routePattern.split("/").filter(Boolean);
  const pathSegments = pathname.split("/").filter(Boolean);

  if (routeSegments.length >= 2 && pathname.startsWith(`${routePattern}/`)) {
    return true;
  }

  // Match segment by segment
  if (routeSegments.length !== pathSegments.length) {
    return false;
  }

  return routeSegments.every((segment, i) => {
    return segment.startsWith(":") || segment === pathSegments[i];
  });
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

export const withPrefix = <T extends string, P extends string>(
  path: T,
  prefix: P
): `${P}${T}` => `${prefix}${path}` as `${P}${T}`;
