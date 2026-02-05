 import { useState } from 'react';
 import { Link } from 'react-router-dom';
 import { Menu, User, MapPin, ChevronDown, Phone, Wallet, Gift, CreditCard } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
 import ploozaLogo from '@/assets/plooza-logo.svg';
 import AuthModal from '@/components/header/AuthModal';
 
 const PayHeader = () => {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
 
   const navLinks = [
     { href: '/pay', label: 'Кошелёк', icon: Wallet },
     { href: '/pay/cashback', label: 'Кэшбэк', icon: Gift },
     { href: '/pay/withdraw', label: 'Вывод средств', icon: CreditCard },
   ];
 
   return (
     <>
       <header className="sticky top-0 z-50 bg-background">
         {/* Top utility bar */}
         <div className="bg-foreground text-background">
           <div className="container">
             <div className="flex items-center justify-between h-9 text-xs">
               <div className="flex items-center gap-4">
                 <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                   <MapPin className="w-3 h-3" />
                   <span>Москва</span>
                   <ChevronDown className="w-3 h-3" />
                 </button>
               </div>
               <div className="hidden sm:flex items-center gap-6">
                 <Link to="/" className="hover:opacity-80 transition-opacity">Главная</Link>
                 <Link to="/providers" className="hover:opacity-80 transition-opacity">Провайдеры</Link>
                 <Link to="/blog" className="hover:opacity-80 transition-opacity">Блог</Link>
                 <Link to="/help" className="hover:opacity-80 transition-opacity">Помощь</Link>
                 <a href="tel:+78001234567" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity font-medium">
                   <Phone className="w-3 h-3" />
                   8 800 123-45-67
                 </a>
               </div>
             </div>
           </div>
         </div>
 
         {/* Main header */}
         <div className="border-b border-border bg-background">
           <div className="container">
             <div className="flex items-center h-16 gap-4">
               {/* Logo */}
               <Link to="/pay" className="flex items-center gap-0.5 flex-shrink-0">
                 <img src={ploozaLogo} alt="Plooza" className="h-6" />
                 <span className="font-bold text-primary text-lg">.Pay</span>
               </Link>
 
               {/* Desktop Navigation */}
               <nav className="hidden md:flex items-center gap-1 ml-8">
                 {navLinks.map((link) => (
                   <Link
                     key={link.href}
                     to={link.href}
                     className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors text-foreground/70 hover:text-foreground hover:bg-muted"
                   >
                     <link.icon className="w-4 h-4" />
                     {link.label}
                   </Link>
                 ))}
               </nav>
 
               {/* Desktop Actions */}
               <div className="hidden md:flex items-center gap-3 ml-auto">
                 <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl">
                   <Wallet className="w-4 h-4 text-primary" />
                   <span className="font-semibold text-primary">12 450 ₽</span>
                 </div>
                 <Button size="sm" className="gap-2" onClick={() => setIsAuthModalOpen(true)}>
                   <User className="w-4 h-4" />
                   Войти
                 </Button>
               </div>
 
               {/* Mobile Menu */}
               <div className="md:hidden ml-auto flex items-center gap-2">
                 <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-lg">
                   <Wallet className="w-3.5 h-3.5 text-primary" />
                   <span className="text-sm font-semibold text-primary">12 450 ₽</span>
                 </div>
                 <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                   <SheetTrigger asChild>
                     <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                       <Menu className="w-5 h-5" />
                     </button>
                   </SheetTrigger>
                   <SheetContent side="right" className="w-[280px] p-0">
                     <div className="flex flex-col h-full">
                       <div className="p-4 border-b border-border">
                         <Link to="/pay" className="flex items-center gap-0.5" onClick={() => setIsMobileMenuOpen(false)}>
                           <img src={ploozaLogo} alt="Plooza" className="h-5" />
                           <span className="font-bold text-primary">.Pay</span>
                         </Link>
                       </div>
                       
                       <nav className="flex-1 p-4 space-y-1">
                         {navLinks.map((link) => (
                           <Link
                             key={link.href}
                             to={link.href}
                             onClick={() => setIsMobileMenuOpen(false)}
                             className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors text-foreground hover:bg-muted"
                           >
                             <link.icon className="w-4 h-4" />
                             {link.label}
                           </Link>
                         ))}
                         
                         <div className="pt-4 border-t border-border mt-4">
                           <Link
                             to="/"
                             onClick={() => setIsMobileMenuOpen(false)}
                             className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg transition-colors"
                           >
                             ← На главную Plooza
                           </Link>
                         </div>
                       </nav>
 
                       <div className="p-4 border-t border-border">
                         <Button className="w-full" onClick={() => {
                           setIsMobileMenuOpen(false);
                           setIsAuthModalOpen(true);
                         }}>
                           <User className="w-4 h-4 mr-2" />
                           Войти
                         </Button>
                       </div>
                     </div>
                   </SheetContent>
                 </Sheet>
               </div>
             </div>
           </div>
         </div>
       </header>
 
       <AuthModal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
     </>
   );
 };
 
 export default PayHeader;