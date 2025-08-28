import { useLocation, useNavigate } from "react-router-dom";

interface NewParams {
  [key: string]: string;
}

export function useCustomParams() {
  const location = useLocation();
  const navigate = useNavigate();

  function setParams(newParams: NewParams, path?: string) {
    const params = new URLSearchParams(location.search);

    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, value);
    });

    // Build new path
    const newPath = path || location.pathname;

    navigate(`${newPath}?${params.toString()}`);
  }

  function getParams(...keys: string[]) {
    const params = new URLSearchParams(location.search);
    return keys.reduce((acc, key) => {
      acc[key] = params.get(key);
      return acc;
    }, {} as Record<string, string | null>);
  }

  return { getParams, setParams };
}
