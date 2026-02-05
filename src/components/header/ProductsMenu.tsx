import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutGrid, 
  Server, 
  HardDrive, 
  Globe, 
  Shield, 
  Cloud, 
  Database, 
  Cpu,
  ChevronDown,
  Zap,
  Lock,
  Network,
  Boxes,
  MonitorSmartphone,
  Building2,
  Wallet,
  Users,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  items: {
    title: string;
    description: string;
    icon: React.ElementType;
    href: string;
    badge?: string;
  }[];
}

const productCategories: ProductCategory[] = [
  {
    id: 'hosting',
    label: 'Хостинг',
    icon: HardDrive,
    items: [
      {
        title: 'Виртуальный хостинг',
        description: 'Размещение сайтов с поддержкой любой CMS',
        icon: Server,
        href: '/hosting',
      },
      {
        title: 'WordPress хостинг',
        description: 'Оптимизированный хостинг для WordPress',
        icon: Boxes,
        href: '/hosting',
        badge: 'Популярно',
      },
      {
        title: 'DNS-хостинг',
        description: 'Размещение домена на надежных NS серверах',
        icon: Network,
        href: '/dns',
      },
    ],
  },
  {
    id: 'vps',
    label: 'VDS',
    icon: Cloud,
    items: [
      {
        title: 'VPS на SSD',
        description: 'Быстрые виртуальные серверы на SSD дисках',
        icon: Zap,
        href: '/vds',
        badge: 'от 99₽',
      },
      {
        title: 'VPS на NVMe',
        description: 'Максимальная скорость на NVMe накопителях',
        icon: Cpu,
        href: '/vds',
      },
      {
        title: 'High-CPU VPS',
        description: 'Серверы с повышенной производительностью CPU',
        icon: Cpu,
        href: '/vds',
      },
      {
        title: 'Managed VPS',
        description: 'VPS с полным администрированием от нас',
        icon: MonitorSmartphone,
        href: '/vds',
      },
    ],
  },
  {
    id: 'domains',
    label: 'Домены',
    icon: Globe,
    items: [
      {
        title: 'Регистрация доменов',
        description: 'Более 500 доменных зон по лучшим ценам',
        icon: Globe,
        href: '/domains',
      },
      {
        title: 'Трансфер доменов',
        description: 'Перенос домена к нам с продлением срока',
        icon: Network,
        href: '/domains',
      },
    ],
  },
  {
    id: 'ssl',
    label: 'SSL-сертификаты',
    icon: Shield,
    items: [
      {
        title: 'Бесплатный SSL',
        description: "Let's Encrypt сертификат бесплатно",
        icon: Lock,
        href: '/ssl',
        badge: 'Бесплатно',
      },
      {
        title: 'Коммерческий SSL',
        description: 'Премиум сертификаты от ведущих CA',
        icon: Shield,
        href: '/ssl',
      },
      {
        title: 'Wildcard SSL',
        description: 'Защита всех поддоменов одним сертификатом',
        icon: Shield,
        href: '/ssl',
      },
    ],
  },
  {
    id: 'datacenter',
    label: 'ЦОД и инфраструктура',
    icon: Building2,
    items: [
      {
        title: 'Выделенные серверы',
        description: 'Физические серверы в аренду',
        icon: Database,
        href: '/dedicated',
      },
      {
        title: 'Колокация',
        description: 'Размещение вашего оборудования в ЦОД',
        icon: Server,
        href: '/colocation',
      },
    ],
  },
  {
    id: 'cloud',
    label: 'Облако',
    icon: Cloud,
    items: [
      {
        title: 'Облачные сервисы',
        description: 'Гибкие облачные решения для бизнеса',
        icon: Cloud,
        href: '/cloud',
      },
      {
        title: 'GPU-серверы',
        description: 'Серверы с мощными видеокартами для AI/ML',
        icon: Cpu,
        href: '/gpu',
      },
    ],
  },
  {
    id: 'network',
    label: 'Сетевые услуги',
    icon: ShieldCheck,
    items: [
      {
        title: 'Защита от DDoS',
        description: 'Надежная защита от атак любой сложности',
        icon: Shield,
        href: '/dedicated',
      },
    ],
  },
  {
    id: 'services',
    label: 'Сервисы',
    icon: Boxes,
    items: [
      {
        title: 'Plooza Pay',
        description: 'Кэшбэк и бонусы за покупку услуг',
        icon: Wallet,
        href: '/pay',
        badge: 'Новинка',
      },
      {
       title: 'Plooza Jobs',
       description: 'Фриланс-платформа для IT-специалистов',
        icon: Users,
        href: '/freelance',
      },
    ],
  },
];

interface ProductsMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductsMenu = ({ isOpen, onOpenChange }: ProductsMenuProps) => {
  const [activeCategory, setActiveCategory] = useState(productCategories[0].id);

  const activeItems = productCategories.find(c => c.id === activeCategory)?.items || [];

  return (
    <div className="relative">
      <button
        onClick={() => onOpenChange(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all",
          isOpen 
            ? "bg-muted text-foreground" 
            : "bg-muted hover:bg-muted/80 text-foreground"
        )}
      >
        <LayoutGrid className="w-4 h-4" />
        <span>Продукты</span>
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => onOpenChange(false)}
          />
          
          {/* Menu */}
          <div className="absolute top-full left-0 mt-2 z-50 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden w-[calc(100vw-2rem)] md:w-auto md:min-w-[750px] lg:min-w-[900px] max-w-[900px] animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="flex">
              {/* Categories sidebar */}
              <div className="w-48 md:w-56 lg:w-72 bg-muted/50 p-2 md:p-3 border-r border-border flex-shrink-0">
                {productCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={cn(
                        "w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all text-left",
                        activeCategory === category.id
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {category.label}
                    </button>
                  );
                })}
              </div>

              {/* Items */}
              <div className="flex-1 p-4 lg:p-5 min-w-0">
                <h3 className="text-base lg:text-lg font-semibold text-foreground mb-3 lg:mb-4">
                  {productCategories.find(c => c.id === activeCategory)?.label}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-3">
                  {activeItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.title}
                        to={item.href}
                        className="group flex items-start gap-2 lg:gap-3 p-2 lg:p-3 rounded-lg lg:rounded-xl hover:bg-muted transition-colors"
                        onClick={() => onOpenChange(false)}
                      >
                        <div className="p-1.5 lg:p-2 rounded-md lg:rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0">
                          <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 lg:gap-2 flex-wrap">
                            <span className="font-medium text-xs lg:text-sm text-foreground group-hover:text-primary transition-colors">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className="text-[9px] lg:text-[10px] bg-primary/10 text-primary px-1.5 lg:px-2 py-0.5 rounded-full font-medium">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] lg:text-xs text-muted-foreground mt-0.5 line-clamp-2 hidden md:block">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Footer links */}
                <div className="flex items-center gap-4 lg:gap-6 mt-4 lg:mt-6 pt-3 lg:pt-4 border-t border-border">
                  <a href="#" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">
                    Бесплатный перенос сайта
                  </a>
                  <a href="#" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors">
                    Партнерская программа
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsMenu;
