'use client';

import { LogOut, Moon, Sun, User, UserCircle } from 'lucide-react';
import { useTheme } from 'next-themes';

import { signOutAction } from '~/app/engine/actions';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

import { MobileMenuButton } from './sidebar-mobile';

export default function Header() {
  const { setTheme, theme = 'dark' } = useTheme();

  const handleSignOut = async () => {
    await signOutAction();
  };

  return (
    <header className="absolute bg-card top-0 left-0 right-0 w-full z-10 py-2 px-4 border-b-ring/5 shadow-sm border-b">
      <div className="flex items-center gap-4">
        <MobileMenuButton />
        <div className="flex flex-1"></div>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <span className="sr-only">Toggle Theme</span>
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <UserCircle size={24} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="gap-2">
              <User size={16} />
              User
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2" onClick={handleSignOut}>
              <LogOut size={16} />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
