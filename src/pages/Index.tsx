import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyNGOs from '@/components/WhyNGOs';
import Templates from '@/components/Templates';
import About from '@/components/About';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <WhyNGOs />
      <section className="py-20 bg-white">
        <Templates />
      </section>
      <About />
      <Services />
      <section className="py-20 bg-gradient-to-br from-brand-cream to-white">
        <Process />
      </section>
      <section className="py-20 bg-white">
        <Contact />
      </section>
      <Footer />
    </div>
  );
}
