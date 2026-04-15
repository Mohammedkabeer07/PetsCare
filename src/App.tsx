import React from 'react';
import { AuthProvider } from './lib/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AnimalCard } from './components/AnimalCard';
import { BookingForm } from './components/BookingForm';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where, limit } from 'firebase/firestore';
import { db } from './lib/firebase';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { PawPrint, Heart, Info, Mail, Phone, MapPin } from 'lucide-react';

function AnimalGallery() {
  const [value, loading, error] = useCollection(
    query(collection(db, 'animals'), where('status', '==', 'available'), limit(6))
  );

  if (loading) return <div className="text-center py-20 text-muted-text">Loading sanctuary residents...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error loading sanctuary.</div>;

  const animals = value?.docs.map(doc => ({ id: doc.id, ...doc.data() } as any)) || [];

  return (
    <section id="adoption" className="py-32 bg-dark-bg border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <span className="text-gold text-[10px] uppercase tracking-[0.4em] mb-4 block">The Sanctuary</span>
          <h2 className="text-4xl font-serif font-light text-white mb-6">Animals Seeking Companionship</h2>
          <p className="text-muted-text max-w-xl mx-auto text-sm leading-relaxed font-light">
            Each resident has been carefully rehabilitated in our low-stress environment and is now ready for a sophisticated home.
          </p>
        </div>

        {animals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {animals.map((animal, index) => (
              <motion.div
                key={animal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AnimalCard animal={animal} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-dark-surface border border-dark-border">
            <p className="text-muted-text uppercase tracking-widest text-[10px]">The sanctuary is currently at capacity.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-dark-surface text-dark-text py-24 border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-2xl font-light tracking-[0.3em] uppercase text-gold serif">Aurelian</span>
            </div>
            <p className="text-muted-text max-w-sm leading-relaxed text-sm font-light">
              A boutique wellness environment dedicated to the physical longevity and psychological calm of the modern companion animal.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold mb-8">Concierge</h4>
            <ul className="space-y-4 text-muted-text text-sm font-light">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold/60" />
                <span>concierge@aurelian.care</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold/60" />
                <span>+1 (888) AURELIAN</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gold/60" />
                <span>The Sanctuary, Highland Estates</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold mb-8">Navigation</h4>
            <ul className="space-y-4 text-muted-text text-sm font-light uppercase tracking-widest text-[10px]">
              <li><a href="#" className="hover:text-gold transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Specialists</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Sanctuary</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-dark-border mt-24 pt-12 text-center text-muted-text text-[10px] uppercase tracking-[0.4em]">
          © {new Date().getFullYear()} AURELIAN BOUTIQUE WELLNESS.
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-dark-bg selection:bg-gold/20 selection:text-gold">
        <Navbar />
        <main>
          <Hero />
          
          <AnimalGallery />

          <section id="services" className="py-32 bg-dark-surface border-y border-dark-border">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
                <div>
                  <span className="text-gold text-[10px] uppercase tracking-[0.4em] mb-6 block">Specialist Services</span>
                  <h2 className="text-4xl font-serif font-light text-white mb-8 leading-tight">
                    Integrative treatments focusing on physical longevity.
                  </h2>
                  <p className="text-base text-muted-text mb-12 leading-relaxed font-light">
                    Our leading feline and canine specialists design custom-crafted protocols in a climate-controlled, low-stress luxury environment.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12">
                    <div className="space-y-4">
                      <div className="w-10 h-[1px] bg-gold" />
                      <h4 className="text-xs uppercase tracking-[0.2em] text-white">Holistic Therapy</h4>
                      <p className="text-muted-text text-xs font-light leading-relaxed">Focusing on psychological calm and physical vitality through advanced wellness protocols.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-10 h-[1px] bg-gold" />
                      <h4 className="text-xs uppercase tracking-[0.2em] text-white">Nutrition Suites</h4>
                      <p className="text-muted-text text-xs font-light leading-relaxed">Custom-crafted dietary protocols designed by our leading specialists.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-16 lg:mt-0">
                  <BookingForm />
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="py-32 bg-dark-bg">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="relative bg-gradient-to-br from-[#111] to-dark-bg border border-dark-border p-12 md:p-24 overflow-hidden group">
                <div className="relative z-10 max-w-2xl">
                  <h2 className="text-4xl md:text-6xl font-serif font-light text-white mb-8 leading-tight">
                    Elegance in<br />Every <span className="italic text-gold">Detail.</span>
                  </h2>
                  <p className="text-muted-text text-lg mb-12 leading-relaxed font-light">
                    Join our mission to redefine companion animal care. We are dedicated to rescuing, rehabilitating, and rehoming animals in environments that honor their dignity.
                  </p>
                  <div className="flex flex-wrap gap-8">
                    <Button size="lg" className="bg-gold text-black hover:bg-white transition-all rounded-none px-10 h-14 text-[11px] uppercase tracking-[0.2em]">
                      Join the Mission
                    </Button>
                    <Button size="lg" variant="outline" className="border-dark-border text-muted-text hover:border-gold hover:text-gold transition-all rounded-none px-10 h-14 text-[11px] uppercase tracking-[0.2em]">
                      Support Sanctuary
                    </Button>
                  </div>
                </div>
                
                <div className="absolute -right-20 -bottom-20 opacity-5 transform rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                  <PawPrint className="w-96 h-96 text-gold" />
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <Toaster position="top-center" />
      </div>
    </AuthProvider>
  );
}
