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
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Icon name="Sparkles" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Imunns RolePlay
            </span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a href="/profile" className="text-primary font-bold transition-colors">Профиль</a>
            <a href="/forum" className="font-bold text-purple-300 hover:text-primary transition-colors">Форум</a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ProfileHeader;