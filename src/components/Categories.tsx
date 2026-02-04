import { Server, HardDrive, Globe, Building2, Cloud, Database, LayoutGrid, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      icon: LayoutGrid,
      title: 'Весь каталог',
      badge: null,
      badgeColor: '',
      gradient: 'from-slate-500 to-slate-600',
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-600',
      href: '#',
    },
    {
      icon: Server,
      title: 'VPS',
      badge: 'от 99₽',
      badgeColor: 'bg-emerald-500',
      gradient: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      href: '/vds',
    },
    {
      icon: HardDrive,
      title: 'Хостинг',
      badge: 'от 50₽',
      badgeColor: 'bg-emerald-500',
      gradient: 'from-violet-500 to-violet-600',
      iconBg: 'bg-violet-50',
      iconColor: 'text-violet-600',
      href: '#',
    },
    {
      icon: Database,
      title: 'Выделенные',
      subtitle: 'серверы',
      badge: null,
      badgeColor: '',
      gradient: 'from-orange-500 to-orange-600',
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600',
      href: '#',
    },
    {
      icon: Globe,
      title: 'Домены',
      badge: 'от 99₽',
      badgeColor: 'bg-emerald-500',
      gradient: 'from-cyan-500 to-cyan-600',
      iconBg: 'bg-cyan-50',
      iconColor: 'text-cyan-600',
      href: '#',
    },
    {
      icon: Building2,
      title: 'Colocation',
      badge: null,
      badgeColor: '',
      gradient: 'from-green-500 to-green-600',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
      href: '/colocation',
    },
    {
      icon: Cloud,
      title: 'Облако',
      badge: 'Кэшбэк',
      badgeColor: 'bg-amber-500',
      gradient: 'from-sky-500 to-sky-600',
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
      href: '/cloud',
    },
    {
      icon: Cpu,
      title: 'GPU',
      subtitle: 'серверы',
      badge: 'Новинка',
      badgeColor: 'bg-rose-500',
      gradient: 'from-rose-500 to-rose-600',
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-600',
      href: '#',
    },
  ];

  return (
    <section className="py-6 sm:py-8 md:py-10">
      <div className="container px-3 sm:px-4">
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            const isInternal = category.href.startsWith('/');
            const Component = isInternal ? Link : 'a';
            const linkProps = isInternal 
              ? { to: category.href } 
              : { href: category.href };
            
            return (
              <Component
                key={category.title}
                {...linkProps as any}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative mb-3">
                  {/* Badge */}
                  {category.badge && (
                    <span className={`absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 ${category.badgeColor} text-white text-[9px] sm:text-[10px] font-semibold rounded-full whitespace-nowrap z-10 shadow-sm`}>
                      {category.badge}
                    </span>
                  )}
                  
                  {/* Icon container with hover effect */}
                  <div className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 ${category.iconBg} rounded-2xl sm:rounded-3xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20`}>
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    {/* Icon */}
                    <Icon className={`relative z-10 w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 ${category.iconColor} group-hover:text-white transition-colors duration-300`} />
                  </div>
                </div>
                
                {/* Title */}
                <span className="text-[11px] sm:text-xs md:text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
                  {category.title}
                </span>
                {category.subtitle && (
                  <span className="text-[10px] sm:text-xs md:text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
                    {category.subtitle}
                  </span>
                )}
              </Component>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
