
const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-green text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/lovable-uploads/1c757405-61a4-40fb-b732-c1c154f7a2c4.png" 
                  alt="Devoura Logo" 
                  className="w-8 h-8"
                />
                <span className="text-2xl font-bold">Devoura</span>
              </div>
              <p className="text-brand-cream mb-4">
                Empowering NGOs with websites that drive donations, engage volunteers, and amplify impact.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-brand-cream">
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Website Design</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">AI Engagement</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">SEO & Analytics</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Maintenance</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-brand-cream">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-white transition-colors">Portfolio</button></li>
                <li><button onClick={() => scrollToSection('process')} className="hover:text-white transition-colors">Process</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-brand-cream">
                <li>
                  <a href="mailto:hello@devoura.com" className="hover:text-white transition-colors">
                    hello@devoura.com
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/DevouraAgency" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    @DevouraAgency
                  </a>
                </li>
                <li>
                  <a href="https://salvesuryaraj.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    salvesuryaraj.vercel.app
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-brand-green-light pt-8 text-center">
            <p className="text-brand-cream">
              © 2024 Devoura. Built with passion for NGOs worldwide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
