import { ROUTES } from './routes'

export interface NavItem {
  path: string
  label: string
}

export const NAV_ITEMS: NavItem[] = [
  {
    path: ROUTES.ADMIN_API_USERS,
    label: 'API Users'
  },
  {
    path: ROUTES.ADMIN_LOCAL_USERS,
    label: 'Local Users'
  },
  {
    path: ROUTES.INQUIRY,
    label: 'Inquiry'
  }
] as const