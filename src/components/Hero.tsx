import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { Heart, ShieldCheck, Stethoscope } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-dark-bg min-h-[calc(100vh-80px)] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="sm:text-center lg:col-span-6 lg:text-left"
          >
            <span className="text-[11px] font-medium text-gold uppercase tracking-[0.4em] mb-6 block">Premium Veterinary Care</span>
            <h1 className="text-5xl font-serif font-light leading-[1.1] text-white sm:text-7xl mb-8">
              Elegance in<br /><span className="italic">Every Paws.</span>
            </h1>
            <p className="text-base text-muted-text leading-relaxed max-w-md sm:mx-auto lg:mx-0 mb-10">
              Beyond standard clinical care, we provide a sophisticated wellness environment tailored for the modern companion animal.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 sm:justify-center lg:justify-start">
              <Button size="lg" className="bg-transparent border border-gold text-gold hover:bg-gold hover:text-black transition-all rounded-none px-10 h-14 text-[11px] uppercase tracking-[0.25em]">
                Request Consultation
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-16 lg:mt-0 lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] lg:aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-dark-border rounded-sm overflow-hidden flex items-center justify-center group">
              {/* Abstract Shapes */}
              <div className="absolute w-72 h-72 border border-gold/10 rounded-full scale-125 group-hover:scale-150 transition-transform duration-1000" />
              <div className="absolute w-72 h-72 border border-gold/10 rounded-full rotate-45 scale-90 group-hover:rotate-90 transition-transform duration-1000" />
              
              <span className="text-[140px] font-serif text-gold/20 select-none">A</span>
              
              <div className="absolute top-10 right-[-30px] bg-gold text-black px-6 py-2 text-[10px] font-bold tracking-[0.2em] uppercase rotate-90">
                EST. 2012
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Ornament */}
      <div className="absolute bottom-10 right-12 w-32 h-[1px] bg-gold hidden lg:block" />
    </div>
  );
}
