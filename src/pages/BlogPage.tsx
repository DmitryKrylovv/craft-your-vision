import { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogHeader from '@/components/blog/BlogHeader';
import Footer from '@/components/Footer';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogCategories from '@/components/blog/BlogCategories';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  videoUrl?: string;
  mediaType?: 'image' | 'video' | 'gallery';
  galleryImages?: string[];
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  publishedAt: string;
  views: number;
  commentsCount: number;
  category: string;
  readTime: number;
  isBookmarked?: boolean;
}

const categories = [
  'Все темы',
  'Хостинг',
  'VPS/VDS',
  'Облако',
  'Домены',
  'Безопасность',
  'DevOps',
  'Разработка',
  'Бизнес',
];

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'ТОП-10 провайдеров VPS в России: сравнение и рейтинг 2026',
    excerpt: 'Подробный обзор лучших VPS-провайдеров с анализом цен, производительности и качества поддержки.',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    mediaType: 'image',
    author: { name: 'Plooza', avatar: '🚀', username: 'plooza' },
    publishedAt: 'Сегодня в 14:30',
    views: 1247,
    commentsCount: 23,
    category: 'VPS/VDS',
    readTime: 8,
  },
  {
    id: '2',
    title: 'Как выбрать облачный сервер для высоконагруженного проекта',
    excerpt: 'Разбираемся в нюансах выбора облачной инфраструктуры для проектов с большим трафиком.',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    mediaType: 'image',
    author: { name: 'CloudExpert', avatar: '☁️', username: 'cloudexpert' },
    publishedAt: 'Вчера в 18:45',
    views: 892,
    commentsCount: 15,
    category: 'Облако',
    readTime: 12,
  },
  {
    id: '3',
    title: 'Защита сервера от DDoS-атак: полное руководство',
    excerpt: 'Практические советы по настройке защиты от DDoS-атак разной сложности.',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop',
    mediaType: 'image',
    author: { name: 'SecureHost', avatar: '🔒', username: 'securehost' },
    publishedAt: '28 янв в 10:00',
    views: 2341,
    commentsCount: 47,
    category: 'Безопасность',
    readTime: 15,
  },
  {
    id: '4',
    title: 'Docker и Kubernetes: когда что использовать',
    excerpt: 'Сравнение контейнеризации и оркестрации для разных масштабов проектов.',
    galleryImages: [
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop',
    ],
    mediaType: 'gallery',
    author: { name: 'DevOpsGuru', avatar: '🐳', username: 'devopsguru' },
    publishedAt: '25 янв в 16:20',
    views: 1856,
    commentsCount: 31,
    category: 'DevOps',
    readTime: 10,
  },
  {
    id: '5',
    title: 'Миграция сайта на новый хостинг без простоя',
    excerpt: 'Пошаговая инструкция по переносу сайта с минимальным downtime.',
    coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=400&fit=crop',
    mediaType: 'image',
    author: { name: 'HostMaster', avatar: '🔄', username: 'hostmaster' },
    publishedAt: '22 янв в 12:15',
    views: 1123,
    commentsCount: 19,
    category: 'Хостинг',
    readTime: 7,
  },
  {
    id: '6',
    title: 'Видео-гайд: настройка Nginx с нуля за 30 минут',
    excerpt: 'Полный видеокурс по настройке веб-сервера Nginx для продакшена.',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    videoUrl: 'https://example.com/nginx-tutorial.mp4',
    mediaType: 'video',
    author: { name: 'WebTutor', avatar: '🎬', username: 'webtutor' },
    publishedAt: '20 янв в 09:00',
    views: 4521,
    commentsCount: 67,
    category: 'DevOps',
    readTime: 30,
  },
  {
    id: '7',
    title: 'Сравнение SSD и NVMe дисков для VPS: тесты производительности',
    excerpt: 'Реальные бенчмарки и сравнение скорости работы разных типов дисков.',
    galleryImages: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&h=400&fit=crop',
    ],
    mediaType: 'gallery',
    author: { name: 'TechReviewer', avatar: '💿', username: 'techreviewer' },
    publishedAt: '18 янв в 14:45',
    views: 3892,
    commentsCount: 52,
    category: 'VPS/VDS',
    readTime: 12,
  },
  {
    id: '8',
    title: 'Как я сэкономил 50% на хостинге без потери качества',
    excerpt: 'История оптимизации инфраструктуры стартапа и сокращения расходов.',
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    mediaType: 'image',
    author: { name: 'StartupCTO', avatar: '💰', username: 'startupcto' },
    publishedAt: '15 янв в 11:30',
    views: 2156,
    commentsCount: 38,
    category: 'Бизнес',
    readTime: 9,
  },
  {
    id: '9',
    title: 'PostgreSQL vs MySQL: что выбрать в 2026 году',
    excerpt: 'Детальное сравнение двух популярных СУБД для разных сценариев использования.',
    coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop',
    mediaType: 'image',
    author: { name: 'DBExpert', avatar: '🗄️', username: 'dbexpert' },
    publishedAt: '12 янв в 16:00',
    views: 5234,
    commentsCount: 89,
    category: 'Разработка',
    readTime: 15,
  },
  {
    id: '10',
    title: 'Автоматизация бэкапов: лучшие практики',
    excerpt: 'Как настроить надёжное резервное копирование для любого проекта.',
    videoUrl: 'https://example.com/backup-tutorial.mp4',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    mediaType: 'video',
    author: { name: 'BackupPro', avatar: '💾', username: 'backuppro' },
    publishedAt: '10 янв в 10:00',
    views: 1789,
    commentsCount: 24,
    category: 'DevOps',
    readTime: 20,
  },
  {
    id: '11',
    title: 'Let\'s Encrypt: бесплатные SSL-сертификаты для всех',
    excerpt: 'Подробная инструкция по получению и настройке бесплатного SSL.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    mediaType: 'image',
    author: { name: 'SSLMaster', avatar: '🔐', username: 'sslmaster' },
    publishedAt: '08 янв в 13:20',
    views: 6782,
    commentsCount: 112,
    category: 'Безопасность',
    readTime: 8,
  },
  {
    id: '12',
    title: 'Мониторинг серверов: Prometheus + Grafana',
    excerpt: 'Настройка современного стека мониторинга с красивыми дашбордами.',
    galleryImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=400&fit=crop',
    ],
    mediaType: 'gallery',
    author: { name: 'MonitoringNinja', avatar: '📊', username: 'monitoringninja' },
    publishedAt: '05 янв в 15:45',
    views: 3421,
    commentsCount: 45,
    category: 'DevOps',
    readTime: 18,
  },
];

const popularPosts = [
  { id: '1', title: 'Промокоды для хостинга и VPS в 2026 году', date: '10 янв 2026', comments: 89 },
  { id: '2', title: 'Лучшие панели управления сервером: ISPmanager vs Plesk', date: '15 янв в 11:30', comments: 45 },
  { id: '3', title: 'Как настроить SSL-сертификат бесплатно', date: '08 янв в 14:20', comments: 32 },
  { id: '4', title: 'Сравнение NVMe и SSD дисков для VPS', date: '05 янв в 09:45', comments: 28 },
  { id: '5', title: 'Выбираем домен: гайд для начинающих', date: '02 янв в 16:00', comments: 21 },
];

const BlogPage = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [activeCategory, setActiveCategory] = useState('Все темы');

  const filteredPosts = activeCategory === 'Все темы' 
    ? mockPosts 
    : mockPosts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      
      <main className="pt-16 pb-16">
        {/* Categories Bar */}
        <div className="border-b border-border bg-background sticky top-16 z-30">
          <div className="container mx-auto px-4">
            <div className="py-3">
              <BlogCategories 
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="feed">Моя лента</TabsTrigger>
                  <TabsTrigger value="new">Новое</TabsTrigger>
                  <TabsTrigger value="popular">Популярное</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Posts */}
              <div className="space-y-8">
                {filteredPosts.map((post, index) => (
                  <Link key={post.id} to={`/blog/post/${post.id}`} className="block">
                    <BlogPostCard 
                      post={post} 
                      featured={index === 0}
                    />
                  </Link>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center pt-4">
                <Button variant="outline" size="lg">
                  Загрузить ещё
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar popularPosts={popularPosts} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
