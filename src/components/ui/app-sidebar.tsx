import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut, Settings, User } from 'lucide-react'
import { sidelinks, type SideLink } from '@/layout/side-links'

export function AppSidebar() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const { state } = useSidebar() // "expanded" | "collapsed"

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='flex items-center justify-center py-4'>
        {state === 'expanded' ? (
          <img
            src='/logo.webp'
            alt='Logo'
            className='h-8 w-auto object-contain'
          />
        ) : (
          <img
            src='/icon.jpg'
            alt='Logo'
            className='h-8 w-8 object-contain'
          />
        )}
      </SidebarHeader>

      <SidebarContent>
        {sidelinks.map((section) => (
          <SidebarGroup key={section.title}>
            {/* Section label: "System", "Management" */}
            <SidebarGroupLabel>{t(section.title)}</SidebarGroupLabel>

            <SidebarMenu>
              {section.children?.map((group) =>
                group.children?.length ? (
                  /* Group with children → collapsible */
                  <Collapsible
                    key={group.title}
                    asChild
                    defaultOpen={group.children.some((c) => c.href === pathname)}
                    className='group/collapsible'
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={t(group.title)}>
                          {group.icon}
                          <span>{t(group.title)}</span>
                          <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {group.children.map((item) => (
                            <SidebarMenuSubItem key={item.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === item.href}
                              >
                                <Link to={item.href}>
                                  {item.icon}
                                  <span>{t(item.title)}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  /* Leaf item (no children) */
                  <SidebarMenuItem key={group.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === group.href}
                      tooltip={t(group.title)}
                    >
                      <Link to={group.href}>
                        {group.icon}
                        <span>{t(group.title)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className='border-t p-2'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className='h-12 w-full'>
              <Avatar className='h-7 w-7 shrink-0'>
                <AvatarImage src='/avatar.png' />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              {state === 'expanded' && (
                <div className='flex flex-col items-start overflow-hidden'>
                  <span className='truncate text-sm font-medium'>John Doe</span>
                  <span className='truncate text-xs text-muted-foreground'>john@example.com</span>
                </div>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent side='top' align='start' className='w-52'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to='/portal/aboutme'>
                <User className='mr-2 h-4 w-4' />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to='/portal/settings/SeasonalThemes'>
                <Settings className='mr-2 h-4 w-4' />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-red-500 focus:text-red-500'>
              <LogOut className='mr-2 h-4 w-4' />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
