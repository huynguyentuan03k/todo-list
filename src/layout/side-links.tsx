import {
  IconLayoutDashboard,
  IconSettings,
  IconUser,
  IconUserCog,
  IconUserStar
} from '@tabler/icons-react'

import {
  BookmarkIcon,
  BriefcaseBusinessIcon,
  BriefcaseIcon,
  MicIcon,
  UsersIcon,
  NewspaperIcon,
  SettingsIcon,
  SquareActivityIcon,
  FilePenLineIcon,
  HeadphonesIcon,
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
    href: '/',
    level: 1,
    children: [
      {
        title: 'menu.general_title',
        label: '',
        href: '/',
        icon: <IconSettings size={18} />,
        children: [
          {
            title: 'page_dashboard.title',
            label: '',
            href: '/',
            icon: <IconLayoutDashboard size={18} />,
            permission: 'VIEW_DASHBOARD'
          },
          {
            title: 'page_my_profile.title',
            label: '',
            href: '/portal/aboutme',
            icon: <IconUser size={18} />,
            permission: 'ANY'
          },
          {
            title: 'page_setting.title',
            label: '',
            href: '/portal/settings/SeasonalThemes',
            icon: <SettingsIcon size={18} />,
            permission: 'VIEW_SETTING'
          }
        ]
      }
    ]
  },
  {
    title: 'menu.management_title',
    href: '/',
    level: 1,
    children: [
      {
        title: 'menu.management_title.podcast',
        label: '',
        href: '/portal/podcasts',
        icon: <MicIcon size={18} />,
        children: [
          {
            title: 'menu.management_title.nav-podcasts',
            label: '',
            href: '/portal/podcasts',
            icon: <HeadphonesIcon size={18} />,
            permission: 'ANY'
          },
          {
            title: 'menu.management_title.nav-episodes',
            label: '',
            href: '/portal/episodes',
            icon: <FilePenLineIcon size={18} />,
            permission: 'ANY'
          }
        ]
      },
      {
        title: 'menu.management_title.content',
        label: '',
        href: '/portal/publishers',
        icon: <NewspaperIcon size={18} />,
        children: [
          {
            title: 'menu.management_title.nav-publishers',
            label: '',
            href: '/portal/publishers',
            icon: <BriefcaseBusinessIcon size={18} />,
            permission: 'ANY'
          },
          {
            title: 'menu.management_title.nav-authors',
            label: '',
            href: '/portal/authors',
            icon: <UsersIcon size={18} />,
            permission: 'ANY'
          },
          {
            title: 'menu.management_title.nav-categories',
            label: '',
            href: '/portal/categories',
            icon: <BookmarkIcon size={18} />,
            permission: 'ANY'
          }
        ]
      },
      {
        title: 'menu.management_title.user',
        label: '',
        href: '/portal/activities',
        icon: <IconUserStar size={18} />,
        children: [
          {
            title: 'page_users_overview.title',
            label: '',
            href: '/portal/activities',
            icon: <SquareActivityIcon size={18} />,
            permission: 'ANY'
          }
        ]
      },
      {
        title: 'menu.management_title.settings',
        label: '',
        href: '/portal/settings',
        icon: <IconUserCog size={18} />,
        children: [
          {
            title: 'menu.management_title.nav-keyword-suggestions',
            label: '',
            href: '/portal/settings/keywordSuggestions',
            icon: <BriefcaseIcon size={18} />,
            permission: 'ANY'
          },
          {
            title: 'menu.management_title.nav-seasonal-themes',
            label: '',
            href: '/portal/settings/SeasonalThemes',
            icon: <SettingsIcon size={18} />,
            permission: 'ANY'
          }
        ]
      }
    ]
  }
]
