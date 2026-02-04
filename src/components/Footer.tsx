import ploozaLogo from '@/assets/plooza-logo.svg';

const Footer = () => {
  const links = {
    'Услуги': [
      { label: 'VPS/VDS хостинг', href: '#' },
      { label: 'Виртуальный хостинг', href: '#' },
      { label: 'Выделенные серверы', href: '#' },
      { label: 'Домены', href: '#' },
      { label: 'SSL-сертификаты', href: '#' },
    ],
    'Рейтинги': [
      { label: 'Лучшие провайдеры', href: '#' },
      { label: 'По цене', href: '#' },
      { label: 'По отзывам', href: '#' },
      { label: 'По надёжности', href: '#' },
    ],
    'Компания': [
      { label: 'О нас', href: '#' },
      { label: 'Контакты', href: '#' },
      { label: 'Блог', href: '#' },
      { label: 'Партнёрам', href: '#' },
    ],
    'Поддержка': [
      { label: 'FAQ', href: '#' },
      { label: 'Как выбрать хостинг', href: '#' },
      { label: 'Глоссарий', href: '#' },
      { label: 'Обратная связь', href: '#' },
    ],
  };

  return (
    <footer className="bg-foreground text-background py-10 sm:py-12 md:py-16">
      <div className="container px-4 sm:px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Logo & description */}
          <div className="col-span-2 sm:col-span-4 md:col-span-1 mb-2 sm:mb-0">
            <a href="/" className="inline-block mb-3 sm:mb-4">
              <img src={ploozaLogo} alt="Plooza" className="h-6 sm:h-7 brightness-0 invert" />
            </a>
            <p className="text-background/70 text-xs sm:text-sm leading-relaxed">
              Независимый маркетплейс хостинг-провайдеров России и СНГ
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{title}</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-xs sm:text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-6 sm:pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-background/60">
            © 2026 Plooza. Все права защищены.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-background/60">
            <a href="#" className="hover:text-background transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
