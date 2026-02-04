import { Link } from 'react-router-dom';
import ploozaLogo from '@/assets/plooza-logo.svg';

const FreelanceFooter = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/freelance" className="flex items-center gap-2 mb-4">
              <img src={ploozaLogo} alt="Plooza" className="h-7 brightness-0 invert" />
              <span className="font-semibold text-background">Jobs</span>
            </Link>
            <p className="text-sm text-background/60">
              Платформа для поиска работы и специалистов в хостинг-индустрии
            </p>
          </div>

          {/* For Specialists */}
          <div>
            <h4 className="font-semibold text-background mb-4">Специалистам</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><Link to="/freelance/vacancies" className="hover:text-background transition-colors">Найти работу</Link></li>
              <li><Link to="/freelance/create-resume" className="hover:text-background transition-colors">Создать резюме</Link></li>
              <li><Link to="/freelance/companies" className="hover:text-background transition-colors">Компании</Link></li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-semibold text-background mb-4">Работодателям</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><Link to="/freelance/specialists" className="hover:text-background transition-colors">Найти специалиста</Link></li>
              <li><Link to="/freelance/post-vacancy" className="hover:text-background transition-colors">Разместить вакансию</Link></li>
              <li><a href="#" className="hover:text-background transition-colors">Тарифы</a></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-background mb-4">Информация</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><a href="#" className="hover:text-background transition-colors">О платформе</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Правила</a></li>
              <li><Link to="/" className="hover:text-background transition-colors">Plooza.ru</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/40">© 2024 Jobs by Plooza. Все права защищены.</p>
          <div className="flex items-center gap-4 text-sm text-background/40">
            <a href="#" className="hover:text-background transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-background transition-colors">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FreelanceFooter;
