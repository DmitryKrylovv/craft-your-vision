import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BlogHeader from '@/components/blog/BlogHeader';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  Users, 
  FileText, 
  Eye, 
  MessageCircle,
  Settings,
  Share2,
  Award,
  Bookmark,
  Clock
} from 'lucide-react';

interface UserPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  publishedAt: string;
  views: number;
  commentsCount: number;
  category: string;
  readTime: number;
}

const mockUser = {
  id: 'cloudexpert',
  username: 'CloudExpert',
  fullName: 'Александр Петров',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
  bio: 'DevOps-инженер с 10-летним стажем. Пишу про облака, контейнеры и автоматизацию инфраструктуры. Сертифицированный специалист AWS и GCP.',
  location: 'Москва, Россия',
  website: 'https://cloudexpert.dev',
  joinedAt: 'Январь 2024',
  followers: 1247,
  following: 89,
  totalPosts: 42,
  totalViews: 156000,
  badges: ['Топ автор', 'Эксперт DevOps', 'Верифицирован'],
};

const mockUserPosts: UserPost[] = [
  {
    id: '1',
    title: 'Как я мигрировал 100 серверов на Kubernetes за месяц',
    excerpt: 'История большой миграции с bare-metal на контейнеры без простоев.',
    coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop',
    publishedAt: '2 дня назад',
    views: 4521,
    commentsCount: 67,
    category: 'DevOps',
    readTime: 15,
  },
  {
    id: '2',
    title: 'Terraform vs Pulumi: что выбрать в 2026 году',
    excerpt: 'Детальное сравнение двух популярных IaC инструментов.',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    publishedAt: '1 неделю назад',
    views: 3892,
    commentsCount: 45,
    category: 'DevOps',
    readTime: 12,
  },
  {
    id: '3',
    title: 'Мониторинг на стероидах: Prometheus + Grafana + Loki',
    excerpt: 'Полный гайд по настройке стека мониторинга.',
    publishedAt: '2 недели назад',
    views: 2341,
    commentsCount: 31,
    category: 'DevOps',
    readTime: 20,
  },
  {
    id: '4',
    title: 'CI/CD с нуля: GitLab vs GitHub Actions',
    excerpt: 'Разбираемся какой инструмент лучше для вашего проекта.',
    publishedAt: '3 недели назад',
    views: 1856,
    commentsCount: 28,
    category: 'DevOps',
    readTime: 10,
  },
];

const mockBookmarks: UserPost[] = [
  {
    id: 'b1',
    title: 'Полный гайд по PostgreSQL для начинающих',
    excerpt: 'От установки до оптимизации запросов.',
    publishedAt: '5 дней назад',
    views: 7892,
    commentsCount: 123,
    category: 'Базы данных',
    readTime: 25,
  },
  {
    id: 'b2',
    title: 'Секреты оптимизации Docker образов',
    excerpt: 'Как уменьшить размер образа в 10 раз.',
    publishedAt: '1 неделю назад',
    views: 5432,
    commentsCount: 67,
    category: 'DevOps',
    readTime: 8,
  },
];

const BlogProfilePage = () => {
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState('posts');
  const isOwnProfile = true; // In real app, check if logged-in user

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      
      <main className="pt-16">
        {/* Profile Header */}
        <div className="border-b border-border bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar */}
              <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background shadow-xl">
                <AvatarImage src={mockUser.avatar} alt={mockUser.fullName} />
                <AvatarFallback className="text-3xl">{mockUser.username[0]}</AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    {mockUser.fullName}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    {mockUser.badges.map((badge) => (
                      <span 
                        key={badge}
                        className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        <Award className="w-3 h-3" />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">@{mockUser.username}</p>

                <p className="text-foreground mb-4 max-w-2xl">{mockUser.bio}</p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {mockUser.location}
                  </span>
                  <a 
                    href={mockUser.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <LinkIcon className="w-4 h-4" />
                    {mockUser.website.replace('https://', '')}
                  </a>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    На Plooza с {mockUser.joinedAt}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-foreground">{mockUser.followers.toLocaleString('ru-RU')}</span>
                    <span className="text-muted-foreground">подписчиков</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-foreground">{mockUser.following}</span>
                    <span className="text-muted-foreground">подписок</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-foreground">{mockUser.totalPosts}</span>
                    <span className="text-muted-foreground">статей</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-foreground">{(mockUser.totalViews / 1000).toFixed(0)}K</span>
                    <span className="text-muted-foreground">просмотров</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 w-full sm:w-auto">
                {isOwnProfile ? (
                  <Button variant="outline" className="gap-2 flex-1 sm:flex-initial">
                    <Settings className="w-4 h-4" />
                    Настройки
                  </Button>
                ) : (
                  <>
                    <Button className="flex-1 sm:flex-initial">Подписаться</Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="container mx-auto px-4 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-muted/50 mb-6">
              <TabsTrigger value="posts" className="gap-2">
                <FileText className="w-4 h-4" />
                Статьи
              </TabsTrigger>
              <TabsTrigger value="bookmarks" className="gap-2">
                <Bookmark className="w-4 h-4" />
                Закладки
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4">
              {mockUserPosts.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/post/${post.id}`}
                  className="block"
                >
                  <article className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all group">
                    <div className="flex flex-col sm:flex-row">
                      {post.coverImage && (
                        <div className="sm:w-48 h-32 sm:h-auto overflow-hidden">
                          <img 
                            src={post.coverImage} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex-1 p-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {post.category}
                          </span>
                          <span>{post.publishedAt}</span>
                        </div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {post.views.toLocaleString('ru-RU')}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3.5 h-3.5" />
                            {post.commentsCount}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime} мин
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </TabsContent>

            <TabsContent value="bookmarks" className="space-y-4">
              {mockBookmarks.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/post/${post.id}`}
                  className="block"
                >
                  <article className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all group">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span>{post.publishedAt}</span>
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {post.views.toLocaleString('ru-RU')}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" />
                        {post.commentsCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime} мин
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogProfilePage;
