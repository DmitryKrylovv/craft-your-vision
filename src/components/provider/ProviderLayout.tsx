import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ProviderSidebar from './ProviderSidebar';
import ProviderHeader from './ProviderHeader';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ProviderRoleProvider } from '@/contexts/ProviderRoleContext';

const ProviderLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ProviderRoleProvider>
      <div className="min-h-screen bg-muted/30 flex flex-col">
        <ProviderHeader onMenuClick={() => setMobileMenuOpen(true)} />
        
        <div className="flex flex-1">
          {/* Desktop Sidebar */}
          <ProviderSidebar />

          {/* Mobile Sidebar */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetContent side="left" className="p-0 w-64">
              <ProviderSidebar />
            </SheetContent>
          </Sheet>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ProviderRoleProvider>
  );
};

export default ProviderLayout;
