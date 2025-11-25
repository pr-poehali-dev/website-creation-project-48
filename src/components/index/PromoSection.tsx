import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import AnimatedCard from "@/components/AnimatedCard";

const PromoSection = () => {
  return (
    <section className="py-12 relative z-10">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex gap-4">
          <AnimatedCard delay={0}>
            <Card 
              className="p-4 bg-gradient-to-br from-card/80 to-primary/5 backdrop-blur border-primary/30 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all cursor-pointer flex-1"
              onClick={() => window.open('https://t.me/HOMARND', '_blank')}
            >
              <div className="flex items-center gap-3">
                <img 
                  src="https://cdn.poehali.dev/files/779479cb-ccce-408d-887a-17cced37dcfb.jpg" 
                  alt="Homa-Boba logo" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Homa-Boba bubble tea Rostov
                </h2>
              </div>
            </Card>
          </AnimatedCard>
          
          <AnimatedCard delay={100}>
            <Card className="p-3 bg-gradient-to-br from-card/80 to-primary/5 backdrop-blur border-primary/30 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all">
              <div className="flex flex-col gap-2">
                <p className="text-xs text-foreground/70 font-semibold text-center">Наши соцсети</p>
                <div className="flex gap-2">
                  <a 
                    href="https://t.me/imunns" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  >
                    <Icon name="Send" size={18} className="text-primary" />
                  </a>
                  <a 
                    href="https://vk.com/imunnsroleplay" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  >
                    <Icon name="Share2" size={18} className="text-primary" />
                  </a>
                </div>
              </div>
            </Card>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
