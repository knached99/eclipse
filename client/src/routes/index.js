import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/user/dashboard'))
const Forms = lazy(() => import('../pages/dont_edit/Forms'))
const Cards = lazy(() => import('../pages/dont_edit/Cards'))
const Charts = lazy(() => import('../pages/dont_edit/Charts'))
const Buttons = lazy(() => import('../pages/dont_edit/Buttons'))
const Modals = lazy(() => import('../pages/dont_edit/Modals'))
const Tables = lazy(() => import('../pages/dont_edit/Tables'))
const Page404 = lazy(() => import('../pages/dont_edit/404'))
const Blank = lazy(() => import('../pages/dont_edit/Blank'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/forms',
    component: Forms,
  },
  {
    path: '/cards',
    component: Cards,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/buttons',
    component: Buttons,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/tables',
    component: Tables,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
