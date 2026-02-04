import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Briefcase, DollarSign, FileText, Plus, X, Upload, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import FreelanceHeader from '@/components/freelance/FreelanceHeader';
import FreelanceFooter from '@/components/freelance/FreelanceFooter';

const FreelanceCreateResumePage = () => {
  const [skills, setSkills] = useState<string[]>(['Linux', 'Docker']);
  const [newSkill, setNewSkill] = useState('');
  const [step, setStep] = useState(1);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const categories = [
    'DevOps инженер',
    'Техподдержка L1-L3',
    'DBA специалист',
    'Cloud архитектор',
    'Системный администратор',
    'Специалист по мониторингу',
    'Сетевой инженер',
  ];

  const popularSkills = [
    'Kubernetes', 'Docker', 'AWS', 'GCP', 'Azure', 'Terraform',
    'Ansible', 'Linux', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis',
    'Nginx', 'Apache', 'CI/CD', 'GitLab', 'Jenkins', 'Prometheus',
    'Grafana', 'Zabbix', 'ELK Stack', 'Python', 'Bash', 'Go',
  ];

  return (
    <div className="min-h-screen bg-background">
      <FreelanceHeader />

      <div className="container py-8 max-w-3xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/freelance" className="hover:text-foreground">IT-фриланс</Link>
          <span>/</span>
          <span className="text-foreground">Создание резюме</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Создать резюме</h1>
          <p className="text-muted-foreground">
            Заполните информацию о себе, чтобы работодатели могли вас найти
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= s 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-1 rounded ${step > s ? 'bg-blue-500' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                Личная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Имя *</label>
                  <Input placeholder="Александр" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Фамилия *</label>
                  <Input placeholder="Козлов" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Фото профиля</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Загрузить фото
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Email *</label>
                <Input type="email" placeholder="alex@example.com" />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Телефон</label>
                <Input type="tel" placeholder="+7 (999) 123-45-67" />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Город *</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moscow">Москва</SelectItem>
                    <SelectItem value="spb">Санкт-Петербург</SelectItem>
                    <SelectItem value="nsk">Новосибирск</SelectItem>
                    <SelectItem value="ekb">Екатеринбург</SelectItem>
                    <SelectItem value="kazan">Казань</SelectItem>
                    <SelectItem value="samara">Самара</SelectItem>
                    <SelectItem value="other">Другой город</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => setStep(2)}>
                  Далее
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-500" />
                Профессиональная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Специализация *</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите специализацию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Заголовок профиля *</label>
                <Input placeholder="Senior DevOps Engineer" />
                <p className="text-xs text-muted-foreground mt-1">Кратко опишите свою роль</p>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">О себе *</label>
                <Textarea 
                  placeholder="Расскажите о своем опыте, проектах и экспертизе..."
                  className="min-h-[120px]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Опыт работы</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите опыт" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1-2 года</SelectItem>
                    <SelectItem value="3">3-5 лет</SelectItem>
                    <SelectItem value="5">5-7 лет</SelectItem>
                    <SelectItem value="7">7-10 лет</SelectItem>
                    <SelectItem value="10">Более 10 лет</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Навыки *</label>
                <div className="flex gap-2 mb-3">
                  <Input 
                    placeholder="Добавить навык..." 
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <Button variant="outline" onClick={addSkill}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1 pr-1">
                        {skill}
                        <button 
                          onClick={() => removeSkill(skill)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                <p className="text-xs text-muted-foreground mb-2">Популярные навыки:</p>
                <div className="flex flex-wrap gap-1.5">
                  {popularSkills.filter(s => !skills.includes(s)).slice(0, 12).map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-blue-500/10 hover:border-blue-500/50"
                      onClick={() => setSkills([...skills, skill])}
                    >
                      + {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Назад
                </Button>
                <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => setStep(3)}>
                  Далее
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-500" />
                Условия работы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Ставка (₽/час) *</label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">от</span>
                  <Input type="number" placeholder="2000" className="w-32" />
                  <span className="text-muted-foreground">₽/час</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Формат работы</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox defaultChecked />
                    <span className="text-sm text-foreground">Удаленно</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox />
                    <span className="text-sm text-foreground">В офисе / на выезде</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox />
                    <span className="text-sm text-foreground">Гибрид</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Доступность</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите доступность" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Полная занятость</SelectItem>
                    <SelectItem value="part">Частичная занятость</SelectItem>
                    <SelectItem value="project">Проектная работа</SelectItem>
                    <SelectItem value="hourly">Почасовая работа</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Резюме (PDF)</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-blue-500/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Перетащите файл или <span className="text-blue-500">выберите</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, до 10 МБ</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox className="mt-0.5" />
                  <span className="text-sm text-foreground">
                    Я соглашаюсь с <a href="#" className="text-blue-500 hover:underline">условиями использования</a> и 
                    даю согласие на обработку персональных данных
                  </span>
                </label>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Назад
                </Button>
                <Button className="bg-blue-500 hover:bg-blue-600 gap-2">
                  <FileText className="w-4 h-4" />
                  Опубликовать резюме
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <Card className="mt-8 bg-blue-500/5 border-blue-500/20">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-3">💡 Советы для успешного резюме</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Добавьте реальное фото — профили с фото получают в 3 раза больше откликов</li>
              <li>• Укажите конкретные технологии и инструменты, с которыми работаете</li>
              <li>• Опишите реальные проекты и достижения</li>
              <li>• Укажите адекватную рыночную ставку для вашего уровня</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <FreelanceFooter />
    </div>
  );
};

export default FreelanceCreateResumePage;
