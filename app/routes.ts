import { type RouteConfig, index } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  { path: '/adoption', file: 'routes/adoption.tsx' },
  { path: '/adoption/:uuid', file: 'routes/adoption/[uuid].tsx' },
  { path: '/guides', file: 'routes/guides.tsx' },
  { path: '/about', file: 'routes/about.tsx' },
  { path: '/cadastro-pet', file: 'routes/pet-registration.tsx' },
  { path: '/dashboard', file: 'routes/dashboard.tsx' },
  { path: '/profile', file: 'routes/profile.tsx' },
] satisfies RouteConfig;
