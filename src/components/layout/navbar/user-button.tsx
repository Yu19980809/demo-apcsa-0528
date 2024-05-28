import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { googleLogout } from '@react-oauth/google'
import { LogOut } from 'lucide-react'

import avatar from '@/assets/avatar.jpg'
import { userOptions } from '@/lib/constants'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const UserButton = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onLogout = () => {
    // if (!!localStorage.getItem('google_access_token')) {
    //   googleLogout()
    //   localStorage.removeItem('google_access_token')
    // }

    localStorage.removeItem('access_token')
    navigate(`/auth/login?callbackUrl=${location.pathname}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={avatar} alt="Avatar" />
          <AvatarFallback>AP</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-50">
        <div className="flex flex-col gap-y-2">
          {userOptions.map(item => (
            <Link key={item.href} to={item.href}>
              <DropdownMenuItem>
                <item.icon className="w-4 h-4 mr-2" />
                <span>{item.label}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
