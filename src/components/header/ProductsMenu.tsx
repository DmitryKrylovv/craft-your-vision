import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutGrid, 
  Server, 
  Cloud, 
  Building2,
  Wrench,
  Briefcase,
  Users,
  Star,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ArrowRight
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
    id: 'servers',
    label: 'Серверы',
    icon: Server,
    items: [
      {
        title: 'VDS/VPS серверы',
        description: 'Виртуальные серверы от проверенных провайдеров',
        icon: Server,
        href: '/vds',
        badge: 'Популярно',
      },
      {
        title: 'Облачные серверы',
        description: 'Гибкие облачные решения с почасовой оплатой',
        icon: Cloud,
        href: '/cloud',
      },
      {
        title: 'Колокация',
        description: 'Размещение оборудования в дата-центрах',
        icon: Building2,
        href: '/colocation',
      },
    ],
  },
  {
    id: 'services',
    label: 'Сервисы',
    icon: Wrench,
    items: [
      {
        title: 'Smart Hands',
        description: 'Удалённые руки в дата-центрах по всему миру',
        icon: Wrench,
        href: '/smart-hands',
      },
      {
        title: 'Jobs',
        description: 'Вакансии и специалисты в IT-инфраструктуре',
        icon: Briefcase,
        href: '/freelance',
      },
    ],
  },
  {
    id: 'providers',
    label: 'Провайдеры',
    icon: Users,
    items: [
      {
        title: 'Рейтинг провайдеров',
        description: 'Сравнение и отзывы о хостинг-провайдерах',
        icon: Star,
        href: '/providers',
      },
      {
        title: 'Для провайдеров',
        description: 'Разместите свои услуги на маркетплейсе',
        icon: Users,
        href: '/for-providers',
      },
    ],
  },
  {
    id: 'info',
    label: 'Информация',
    icon: BookOpen,
    items: [
      {
        title: 'Блог',
        description: 'Статьи, новости и обзоры из мира хостинга',
        icon: BookOpen,
        href: '/blog',
      },
      {
        title: 'Помощь',
        description: 'Ответы на частые вопросы и поддержка',
        icon: HelpCircle,
        href: '/help',
      },
      {
        title: 'О нас',
        description: 'Узнайте больше о платформе Plooza',
        icon: Users,
        href: '/about',
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
          <div className="absolute top-full left-0 mt-2 z-50 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden w-[calc(100vw-2rem)] md:w-auto md:min-w-[600px] lg:min-w-[700px] max-w-[700px] animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="flex">
              {/* Categories sidebar */}
              <div className="w-44 md:w-48 bg-muted/50 p-2 md:p-3 border-r border-border flex-shrink-0">
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
                <div className="grid grid-cols-1 gap-2 lg:gap-3">
                  {activeItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.title}
                        to={item.href}
                        className="group flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                        onClick={() => onOpenChange(false)}
                      >
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                      </Link>
                    );
                  })}
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
