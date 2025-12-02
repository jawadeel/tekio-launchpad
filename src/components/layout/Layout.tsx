import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      {/* Bouton WhatsApp flottant - visible sur toutes les pages */}
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
