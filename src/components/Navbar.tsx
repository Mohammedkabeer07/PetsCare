import { useAuth } from '@/src/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { PawPrint, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Navbar() {
  const { user, profile, signIn, logout } = useAuth();

  return (
    <nav className="border-b border-dark-border bg-dark-bg/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl font-light tracking-[0.2em] uppercase text-gold serif">Aurelian</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <a href="#adoption" className="text-[11px] font-medium text-muted-text hover:text-gold transition-colors uppercase tracking-[0.15em]">Sanctuary</a>
            <a href="#services" className="text-[11px] font-medium text-muted-text hover:text-gold transition-colors uppercase tracking-[0.15em]">Specialists</a>
            <a href="#about" className="text-[11px] font-medium text-muted-text hover:text-gold transition-colors uppercase tracking-[0.15em]">Care Plans</a>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-[11px] font-medium text-dark-text uppercase tracking-wider">{user.displayName}</p>
                  <p className="text-[10px] text-muted-text uppercase tracking-widest">{profile?.role}</p>
                </div>
                <Avatar className="h-8 w-8 border border-dark-border">
                  <AvatarImage src={user.photoURL || ''} />
                  <AvatarFallback className="bg-dark-surface text-gold"><UserIcon className="h-4 w-4" /></AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="icon" onClick={logout} className="hover:text-gold text-muted-text transition-colors">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button onClick={signIn} variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black transition-all rounded-none px-6 text-[11px] uppercase tracking-[0.2em]">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
