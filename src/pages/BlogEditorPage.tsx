import { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Image, Link2, Code, List, ListOrdered, Quote, Minus,
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter,
  Heading1, Heading2, Heading3, Eye, Save, Send, MoreHorizontal,
  Upload, X, ChevronDown, Hash, Clock, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const categories = [
  'Хостинг', 'VPS/VDS', 'Облако', 'Домены', 'Безопасность', 'DevOps', 'Разработка', 'Бизнес',
];

const ToolbarButton = ({
  icon: Icon, label, active, onClick
}: {
  icon: React.ElementType; label: string; active?: boolean; onClick?: () => void;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button
        onClick={onClick}
        className={cn(
          "p-2 rounded-md transition-colors",
          active
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
      >
        <Icon className="w-4 h-4" />
      </button>
    </TooltipTrigger>
    <TooltipContent side="bottom" className="text-xs">{label}</TooltipContent>
  </Tooltip>
);

const BlogEditorPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim() && tags.length < 5) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag));

  const handleCoverUpload = () => {
    // Simulated cover image
    setCoverImage('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=400&fit=crop');
  };

  const handleSave = useCallback(() => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));
    }, 800);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Link
                to="/blog"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Назад</span>
              </Link>
              <Separator orientation="vertical" className="h-5" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span className="hidden md:inline">Черновик</span>
                {lastSaved && (
                  <span className="text-xs">· сохранено в {lastSaved}</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground mr-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{readTime} мин чтения</span>
                <span className="mx-1">·</span>
                <span>{wordCount} слов</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5"
                onClick={() => setIsPreview(!isPreview)}
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">{isPreview ? 'Редактор' : 'Превью'}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">{isSaving ? 'Сохраняю...' : 'Сохранить'}</span>
              </Button>

              <Button
                size="sm"
                className="gap-1.5"
                onClick={() => setIsSettingsOpen(true)}
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Опубликовать</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Editor Area */}
      <main className="pt-14">
        {isPreview ? (
          /* Preview Mode */
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl mx-auto px-4 py-12"
          >
            {coverImage && (
              <div className="rounded-xl overflow-hidden mb-8 -mx-4 md:-mx-8">
                <img src={coverImage} alt="" className="w-full h-64 md:h-80 object-cover" />
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
              {title || 'Без заголовка'}
            </h1>
            <div className="flex items-center gap-3 mb-8 text-sm text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-sm font-medium">
                Г
              </div>
              <span>Гость</span>
              <span>·</span>
              <span>{readTime} мин чтения</span>
            </div>
            <div className="prose prose-lg max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
              {content || 'Начните писать свою статью...'}
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
                {tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-sm">
                    <Hash className="w-3 h-3 mr-1" />{tag}
                  </Badge>
                ))}
              </div>
            )}
          </motion.article>
        ) : (
          /* Editor Mode */
          <div className="max-w-3xl mx-auto px-4 py-8">
            {/* Cover Image */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mb-8"
            >
              {coverImage ? (
                <div className="relative group rounded-xl overflow-hidden">
                  <img src={coverImage} alt="" className="w-full h-56 md:h-72 object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Button variant="secondary" size="sm" onClick={handleCoverUpload}>
                      Заменить
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => setCoverImage(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleCoverUpload}
                  className="w-full h-40 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-muted/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-medium">Добавить обложку</div>
                  <div className="text-xs text-muted-foreground">Рекомендуемый размер: 1200×400</div>
                </button>
              )}
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Заголовок статьи"
                className="w-full text-3xl md:text-4xl font-bold bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/40 text-foreground leading-tight"
                rows={1}
                style={{ minHeight: '1em' }}
                onInput={(e) => {
                  const el = e.currentTarget;
                  el.style.height = 'auto';
                  el.style.height = el.scrollHeight + 'px';
                }}
              />
            </motion.div>

            {/* Tags inline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap items-center gap-2 mt-4 mb-6"
            >
              {tags.map(tag => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="gap-1 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                  onClick={() => removeTag(tag)}
                >
                  <Hash className="w-3 h-3" />{tag}
                  <X className="w-3 h-3 ml-0.5" />
                </Badge>
              ))}
              {tags.length < 5 && (
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder={tags.length === 0 ? "Добавьте теги (Enter)" : "Ещё тег..."}
                  className="w-36 h-7 text-xs border-transparent bg-transparent hover:bg-muted/50 focus:bg-muted/50 px-2"
                />
              )}
            </motion.div>

            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-14 z-30 bg-background/95 backdrop-blur-md border border-border rounded-lg p-1 mb-6 flex items-center gap-0.5 overflow-x-auto scrollbar-hide"
            >
              <ToolbarButton icon={Bold} label="Жирный (Ctrl+B)" />
              <ToolbarButton icon={Italic} label="Курсив (Ctrl+I)" />
              <ToolbarButton icon={Underline} label="Подчёркнутый" />
              <ToolbarButton icon={Strikethrough} label="Зачёркнутый" />

              <Separator orientation="vertical" className="h-5 mx-1" />

              <ToolbarButton icon={Heading1} label="Заголовок 1" />
              <ToolbarButton icon={Heading2} label="Заголовок 2" />
              <ToolbarButton icon={Heading3} label="Заголовок 3" />

              <Separator orientation="vertical" className="h-5 mx-1" />

              <ToolbarButton icon={List} label="Маркированный список" />
              <ToolbarButton icon={ListOrdered} label="Нумерованный список" />
              <ToolbarButton icon={Quote} label="Цитата" />
              <ToolbarButton icon={Code} label="Код" />

              <Separator orientation="vertical" className="h-5 mx-1" />

              <ToolbarButton icon={Image} label="Изображение" />
              <ToolbarButton icon={Link2} label="Ссылка" />
              <ToolbarButton icon={Minus} label="Разделитель" />

              <Separator orientation="vertical" className="h-5 mx-1" />

              <ToolbarButton icon={AlignLeft} label="По левому краю" />
              <ToolbarButton icon={AlignCenter} label="По центру" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <textarea
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Начните писать свою статью...&#10;&#10;Используйте панель инструментов для форматирования текста, добавления изображений и блоков кода."
                className="w-full min-h-[60vh] bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/40 text-foreground text-lg leading-relaxed"
              />
            </motion.div>
          </div>
        )}
      </main>

      {/* Publish Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Настройки публикации</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-2">
            {/* Preview card */}
            <div className="rounded-lg border border-border overflow-hidden">
              {coverImage ? (
                <img src={coverImage} alt="" className="w-full h-32 object-cover" />
              ) : (
                <div className="w-full h-32 bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  Нет обложки
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-2">
                  {title || 'Без заголовка'}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {content.slice(0, 120) || 'Нет описания'}
                </p>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Категория</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      cat === selectedCategory
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags summary */}
            {tags.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Теги</label>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      <Hash className="w-3 h-3 mr-1" />{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsSettingsOpen(false)}
              >
                Отмена
              </Button>
              <Button
                className="flex-1 gap-2"
                onClick={() => {
                  setIsSettingsOpen(false);
                  navigate('/blog');
                }}
              >
                <Send className="w-4 h-4" />
                Опубликовать
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogEditorPage;
