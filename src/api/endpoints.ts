export const API_ENDPOINTS = {
  POKEMON: {
    LIST: '/pokemon',
    DETAILS: (nameOrId: string | number) => `/pokemon/${nameOrId}`,
  },
} as const;

export const buildQueryParams = (params: Record<string, string | number>) => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    queryParams.append(key, String(value));
  });
  return queryParams.toString();
};
