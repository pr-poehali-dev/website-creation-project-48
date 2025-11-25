import Icon from "@/components/ui/icon";

interface ProfileHeaderProps {
  showServerNotification: boolean;
  serverNotificationText: string;
}

const ProfileHeader = ({ showServerNotification, serverNotificationText }: ProfileHeaderProps) => {
  return (
    <>
      {showServerNotification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-primary/90 backdrop-blur text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
            <Icon name="CheckCircle2" size={20} className="animate-bounce" />
            <span className="font-semibold">{serverNotificationText}</span>
          </div>
        </div>
      )}
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Icon name="Sparkles" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Imunns RolePlay
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <a href="/forum" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Форум</a>
            <a href="/stats" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Топ игроков</a>
            <a href="/jobs" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Работа</a>
            <a href="/admin" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Администрация</a>
            <a href="/rules" className="px-4 py-2 rounded-full text-sm font-semibold text-foreground bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all">Правила</a>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-full text-sm font-semibold border-primary/50 hover:bg-primary/10 border border-primary/40 bg-primary/10 transition-all" onClick={() => window.location.href = '/profile'}>
              <Icon name="User" className="inline mr-2" size={18} />
              Профиль
            </button>
            <button 
              className="px-4 py-2 rounded-full text-sm font-semibold border-destructive/50 hover:bg-destructive/10 border transition-all" 
              onClick={() => {
                localStorage.removeItem('isLoggedIn');
                window.location.reload();
              }}
            >
              <Icon name="LogOut" className="inline mr-2" size={18} />
              Выход
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ProfileHeader;