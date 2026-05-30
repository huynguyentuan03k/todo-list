import {
  IconFileSearch,
  IconLayoutDashboard,
  IconPrompt,
  IconRosetteDiscount,
  IconSettings,
  IconUser,
  IconUserCheck,
  IconUserCog,
  IconUserStar
} from '@tabler/icons-react'

import {
  BookmarkIcon,
  FileSlidersIcon,
  // StarIcon,
  BriefcaseBusinessIcon,
  BriefcaseIcon,
  LocateIcon,
  TextSelectionIcon,
  Building2Icon,
  EarthIcon,
  Eclipse,
  PanelTopIcon,
  Settings2Icon,
  PenBox,
  Logs,
  MailsIcon,
  BotIcon,
  DollarSign,
  Gift,
  CreditCard,
  SettingsIcon,
  EyeIcon,
  ListOrderedIcon,
  SquareActivityIcon,
  FilePenLineIcon
} from 'lucide-react'
import React from 'react'

interface NavLink {
  title: string
  label?: string
  href: string
  icon?: React.ReactElement
  permission?: string
  level?: number
  children?: NavLink[]
}

export interface SideLink extends NavLink {
  children?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'menu.system_title',
    label: '',
    href: '/portal',
    level: 1,
    children: [
      {
        title: 'menu.general_title',
        label: '',
        href: '/portal',
        icon: <IconSettings size={18} />,
        children: [
          {
            title: 'page_dashboard.title',
            label: '',
            href: '/portal',
            icon: <IconLayoutDashboard size={18} />,
            permission: 'VIEW_DASHBOARD'
          },
          {
            title: 'page_role_overview.roles_title',
            label: '',
            href: '/portal/roles',
            icon: <IconUserCog size={18} />,
            permission: 'VIEW_ROLE'
          },
          {
            title: 'page_admin_users_overview.title',
            label: '',
            href: '/portal/admin-users',
            icon: <IconUserStar size={18} />,
            permission: 'VIEW_USER'
          },
          {
            title: 'menu.logs_title',
            label: '',
            href: '/portal/logs',
            icon: <IconFileSearch size={18} />,
            permission: 'VIEW_AUDIT_LOG'
          },
          {
            title: 'menu.email-log_title',
            label: '',
            href: '/portal/email-logs',
            icon: <MailsIcon size={18} />,
            permission: 'VIEW_MAIL_LOG'
          },
          {
            title: 'menu.chatbot-log_title',
            label: '',
            href: '/portal/chatbot-logs',
            icon: <BotIcon size={18} />,
            permission: 'ANY'
          },
          {
            title: 'page_my_profile.title',
            label: '',
            href: '/portal/my-profile',
            icon: <IconSettings size={18} />,
            permission: 'ANY'
          },
          {
            title: 'page_setting.title',
            label: '',
            href: '/portal/settings',
            icon: <Settings2Icon size={18} />,
            permission: 'VIEW_SETTING'
          },
          {
            title: 'page_prompt.title',
            label: '',
            href: '/portal/chatbot',
            icon: <IconPrompt size={18} />,
            permission: 'ANY'
          }
        ]
      }
    ]
  },
  {
    title: 'menu.management_title',
    href: '/portal',
    level: 1,
    children: [
      {
        title: 'menu.management_title.job',
        label: '',
        href: '/portal/jobs',
        icon: <BriefcaseIcon size={18} />,
        children: [
          {
            title: 'menu.management_title.nav-job',
            label: '',
            href: '/portal/jobs',
            icon: <BriefcaseBusinessIcon size={18} />,
            permission: 'VIEW_JOB'
          },
          {
            title: 'menu.management_title.nav-categories',
            label: '',
            href: '/portal/categories',
            icon: <BookmarkIcon size={18} />,
            permission: 'VIEW_CATEGORY'
          },
          {
            title: 'menu.management_title.nav-authors',
            label: '',
            href: '/portal/contacts',
            icon: <LocateIcon size={18} />,
            permission: 'VIEW_CONTACT'
          },
          {
            title: 'menu.management_title.nav-companies',
            label: '',
            href: '/portal/companies',
            icon: <Building2Icon size={18} />,
            permission: 'VIEW_COMPANY'
          },
          {
            title: 'menu.management_title.nav-types',
            label: '',
            href: '/portal/job-types',
            icon: <TextSelectionIcon size={18} />,
            permission: 'VIEW_JOB_TYPE'
          },
          {
            title: 'menu.management_title.nav-tags',
            label: '',
            href: '/portal/tags',
            icon: <BookmarkIcon size={18} />,
            permission: 'VIEW_JOB'
          },
          {
            title: 'menu.management_title.nav-promotions',
            label: '',
            href: '/portal/promotions',
            icon: <FileSlidersIcon size={18} />,
            permission: 'VIEW_PROMOTION'
          },
          {
            title: 'menu.management_title.nav-views',
            label: '',
            href: '/portal/job-views',
            icon: <EyeIcon size={18} />,
            permission: 'VIEW_JOB'
          },
          {
            title: 'menu.management_title.nav-applies',
            label: '',
            href: '/portal/job-applies',
            icon: <ListOrderedIcon size={18} />,
            permission: 'VIEW_JOB'
          }
        ]
      },
      {
        title: 'menu.management_title.nav-crawler',
        label: '',
        href: '/portal/jobs',
        icon: <Eclipse size={18} />,
        children: [
          {
            title: 'menu.management_title.nav-crawler-page',
            label: '',
            href: '/portal/crawlers/crawler-pages',
            icon: <PenBox size={18} />,
            permission: 'VIEW_CRAWLER'
          },
          {
            title: 'menu.management_title.nav-crawler-job',
            label: '',
            href: '/portal/crawlers/crawled-jobs',
            icon: <Logs size={18} />,
            permission: 'VIEW_CRAWLER'
          },
          {
            title: 'page_crawl_configuration.title',
            label: '',
            href: '/portal/crawl-settings',
            icon: <SettingsIcon size={18} />,
            permission: 'ANY'
          },
          {
            title: 'page_crawl_queue_health.title',
            label: '',
            href: '/portal/queue-health',
            icon: <SquareActivityIcon size={18} />,
            permission: 'ANY'
          }
        ]
      },
      {
        title: 'menu.management_title.user',
        label: '',
        href: '/portal/employers',
        icon: <IconUserCheck size={18} />,
        children: [
          {
            title: 'page_users_overview.title',
            label: '',
            href: '/portal/employers',
            icon: <IconUser size={18} />,
            permission: 'VIEW_USER'
          },
          {
            title: 'menu.management_title.user-configuration',
            label: '',
            href: '/portal/user-settings',
            icon: <SettingsIcon size={18} />,
            permission: 'VIEW_USER'
          }
        ]
      },
      {
        title: 'menu.management_title.page',
        label: '',
        href: '/portal/pages',
        icon: <EarthIcon size={18} />,
        children: [
          {
            title: 'menu.management_title.nav-page',
            label: '',
            href: '/portal/pages',
            icon: <PanelTopIcon size={18} />,
            permission: 'VIEW_PAGE'
          },
          {
            title: 'menu.management_title.nav_blog',
            label: '',
            href: '/portal/posts',
            icon: <FilePenLineIcon size={18} />,
            permission: 'VIEW_PAGE'
          },
          {
            title: 'menu.management_title.nav_page_configuration',
            label: '',
            href: '/portal/pages-setting',
            icon: <SettingsIcon size={18} />,
            permission: 'VIEW_PAGE'
          }
        ]
      },
      {
        title: 'menu.management_title.payment',
        label: '',
        href: '/portal/transactions',
        icon: <CreditCard size={18} />,
        children: [
          {
            title: 'menu.management_title.transactions',
            label: '',
            href: '/portal/transactions',
            icon: <DollarSign size={18} />,
            permission: 'VIEW_TRANSACTION'
          },
          {
            title: 'menu.management_title.gift-cards',
            label: '',
            href: '/portal/gift-cards',
            icon: <Gift size={18} />,
            permission: 'VIEW_GIFT_CARD'
          },
          {
            title: 'menu.management_title.promo-code',
            label: '',
            href: '/portal/promo-codes',
            icon: <IconRosetteDiscount size={18} />,
            permission: 'VIEW_PROMO_CODE'
          }
        ]
      }
    ]
  }
]
