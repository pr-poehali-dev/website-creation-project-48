import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface MobileMenuProps {
  currentPath?: string;
}

const MobileMenu = ({ currentPath = "/" }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Главная" },
    { href: "/forum", label: "Форум" },
    { href: "/wiki", label: "Вики" },
    { href: "/stats", label: "Топ игроков" },
    { href: "/jobs", label: "Работа" },
    { href: "/admin", label: "Администрация" },
  ];

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50"
      >
        <Icon name={isOpen ? "X" : "Menu"} size={24} />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bg-card/95 backdrop-blur-lg border-b border-border/50 z-40 animate-in slide-in-from-top">
            <div className="container mx-auto px-4 py-6 space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block py-3 px-4 rounded-lg transition-colors ${
                    currentPath === item.href
                      ? "bg-primary/20 text-primary font-semibold"
                      : "text-foreground/80 hover:bg-primary/10 hover:text-primary"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border/50">
                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  Играть
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileMenu;