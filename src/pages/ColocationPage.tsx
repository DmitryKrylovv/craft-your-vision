import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ColocationWizard from '@/components/colocation/ColocationWizard';
import { 
  ArrowRight, Building2, Check, Shield, Clock, 
  Zap, Server, Thermometer, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Datacenter logos/partners
const datacenterLogos = [
  { name: 'DataLine', abbr: 'DL', color: 'bg-blue-600' },
  { name: 'Selectel', abbr: 'SE', color: 'bg-emerald-600' },
  { name: 'Ростелеком', abbr: 'RT', color: 'bg-violet-600' },
  { name: 'Stack Group', abbr: 'SG', color: 'bg-orange-600' },
  { name: 'IXcellerate', abbr: 'IX', color: 'bg-cyan-600' },
  { name: 'Миран', abbr: 'MR', color: 'bg-rose-600' },
  { name: 'Hetzner', abbr: 'HZ', color: 'bg-red-600' },
  { name: 'Equinix', abbr: 'EQ', color: 'bg-indigo-600' },
  { name: 'Tech.ru', abbr: 'TR', color: 'bg-sky-600' },
];

const ColocationPage = () => {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Split Layout */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="container py-10 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left - Text */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-medium mb-5">
                  <Building2 className="w-4 h-4" />
                  Colocation
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                  Найдите идеальный
                  <br />
                  <span className="text-primary">дата-центр</span>
                </h1>
                
                <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-md">
                  Разместите своё оборудование в надёжных ЦОД по всей России и Европе. Подберём оптимальное решение под ваши задачи.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  <Button 
                    size="lg" 
                    className="rounded-xl"
                    onClick={() => setShowWizard(true)}
                  >
                    Подобрать ЦОД
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-xl">
                    Консультация
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-primary" />
                    Tier III/IV ЦОД
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    SLA 99.99%
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-primary" />
                    24/7 охрана
                  </div>
                </div>
              </div>

              {/* Right - Blocks */}
              <div className="grid grid-cols-2 gap-3">
                {/* Stats Block */}
                <div className="col-span-2 bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-foreground">50+</div>
                      <div className="text-sm text-muted-foreground">дата-центров</div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <div className="text-3xl font-bold text-foreground">12</div>
                      <div className="text-sm text-muted-foreground">городов</div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <div className="text-3xl font-bold text-primary">от 3000₽</div>
                      <div className="text-sm text-muted-foreground">за 1U/мес</div>
                    </div>
                  </div>
                </div>

                {/* Feature Block 1 */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-4 hover:border-primary/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-3">
                    <Server className="w-5 h-5 text-primary" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">Любые стойки</div>
                  <div className="text-xs text-muted-foreground">От 1U до full-rack</div>
                </div>

                {/* Feature Block 2 */}
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-2xl p-4 hover:border-blue-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">Гибкое питание</div>
                  <div className="text-xs text-muted-foreground">До 20 кВт на стойку</div>
                </div>

                {/* Feature Block 3 */}
                <div className="bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/20 rounded-2xl p-4 hover:border-violet-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center mb-3">
                    <Thermometer className="w-5 h-5 text-violet-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">Климат-контроль</div>
                  <div className="text-xs text-muted-foreground">Точное охлаждение</div>
                </div>

                {/* Feature Block 4 */}
                <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-2xl p-4 hover:border-amber-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3">
                    <Lock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">Физическая охрана</div>
                  <div className="text-xs text-muted-foreground">Биометрия + СКУД</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Datacenter Logos */}
        <section className="border-y border-border bg-muted/30">
          <div className="container py-6">
          <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-sm text-muted-foreground">Подключённые дата-центры:</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {datacenterLogos.map((dc) => (
                <div 
                  key={dc.name}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <div className={`w-8 h-8 ${dc.color} rounded-lg flex items-center justify-center text-white font-bold text-xs`}>
                    {dc.abbr}
                  </div>
                  <span className="text-sm font-medium text-foreground hidden sm:inline">{dc.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wizard Section */}
        <section className="container py-8 md:py-12">
          <ColocationWizard 
            isOpen={showWizard} 
            onClose={() => setShowWizard(false)} 
          />
          
          {!showWizard && (
            <div className="text-center py-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Подберите дата-центр за 2 минуты
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Ответьте на несколько вопросов, и мы покажем подходящих провайдеров с ценами
              </p>
              <Button 
                size="lg" 
                className="rounded-xl"
                onClick={() => setShowWizard(true)}
              >
                Начать подбор
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ColocationPage;
