// src/pages/categories/constant.ts

import { BreadcrumbLink, BreadcrumbPage } from '@/components/ui/breadcrumb';

export const categoryBreadcrumb = {
  root: {
    label: 'Categories',
    href: '/categories',
  },
  overview: {
    label: 'Overview',
    href: '/categories/overview',
  },
  show: {
    label: 'Show',
    href: '/categories/show',
  },
  detail: (id: string) => ({
    label: `Category ${id}`,
    href: `/categories/${id}`,
  }),
  edit: (id: string) => ({
    label: 'Edit',
    href: `/categories/${id}/edit`,
  }),
};
