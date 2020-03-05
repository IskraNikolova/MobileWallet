const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/init',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [
      { path: '/init', component: () => import('pages/Init.vue') }
    ]
  },
  {
    path: '/pin',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [
      { path: '/pin', component: () => import('pages/Pin.vue') }
    ]
  },
  {
    path: '/create-wallet',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [
      { path: '/create-wallet/:coin', component: () => import('pages/Create.vue') }
    ]
  },
  {
    path: '/restore-wallet',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [
      { path: '/restore-wallet/:coin', component: () => import('pages/Restore.vue') }
    ]
  },
  {
    path: '/wallets',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/wallets/:coin', component: () => import('pages/Wallets.vue') }
    ]
  },
  {
    path: '/wallet',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/wallet', component: () => import('pages/Wallet.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
