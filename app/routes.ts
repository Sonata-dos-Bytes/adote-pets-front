import { type RouteConfig, index } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  { path: '/adoption', file: 'routes/adoption.tsx' },
  { path: '/adoption/:id', file: 'routes/adoption/[id].tsx' },
  { path: '/guides', file: 'routes/guides.tsx' },
  { path: '/about', file: 'routes/about.tsx' },
] satisfies RouteConfig;
