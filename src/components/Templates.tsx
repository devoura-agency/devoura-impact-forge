
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Users, Heart, GraduationCap, Leaf, Shield, Building } from 'lucide-react';

const Templates = () => {
  const templates = [
    {
      id: 'education',
      title: 'Education NGOs',
      description: 'Empowering communities through education and learning',
      icon: GraduationCap,
      color: 'bg-blue-500',
      examples: [
        { name: 'EduCare Foundation', url: 'https://educare-foundation-ngo.vercel.app/' },
        { name: 'Future Bright Girls', url: 'https://future-bright-girls-ngo.vercel.app/' },
        { name: 'Education NGO', url: 'https://edu-ngo.vercel.app/' }
      ]
    },
    {
      id: 'women-empowerment',
      title: 'Women Empowerment',
      description: 'Supporting and empowering women across communities',
      icon: Heart,
      color: 'bg-pink-500',
      examples: [
        { name: 'Empowering Women NGO', url: 'https://empowering-women-ngo.vercel.app/' }
      ]
    },
    {
      id: 'wildlife',
      title: 'Wildlife Conservation',
      description: 'Protecting wildlife and natural habitats',
      icon: Leaf,
      color: 'bg-green-500',
      examples: [
        { name: 'Wildlife Hope', url: 'https://wildlife-hope-ngo.vercel.app/' },
        { name: 'Wildlife Legacy', url: 'https://wildlife-legacy-ngo.vercel.app/' }
      ]
    },
    {
      id: 'social-welfare',
      title: 'Social Welfare',
      description: 'Building stronger communities through social initiatives',
      icon: Users,
      color: 'bg-purple-500',
      examples: [
        { name: 'Seva Bharat', url: 'https://seva-bharat-ngo.vercel.app/' },
        { name: 'Jeevan Safar Sangam', url: 'https://jeevan-safar-sangam-ngo.vercel.app/' }
      ]
    },
    {
      id: 'healthcare',
      title: 'Healthcare',
      description: 'Providing medical care and health awareness',
      icon: Shield,
      color: 'bg-red-500',
      examples: []
    },
    {
      id: 'disaster-relief',
      title: 'Disaster Relief',
      description: 'Emergency response and disaster management',
      icon: Building,
      color: 'bg-orange-500',
      examples: []
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="templates" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-green mb-6">
              Choose Your NGO Template
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore our professionally designed templates tailored for different NGO types. 
              Each template is optimized for donations, volunteer engagement, and impact storytelling.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {templates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-brand-green">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${template.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-brand-green">{template.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-6">{template.description}</p>
                    
                    {template.examples.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-brand-green mb-3">Live Examples:</h4>
                        <div className="space-y-2">
                          {template.examples.map((example, index) => (
                            <a
                              key={index}
                              href={example.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-2 bg-brand-cream rounded-lg hover:bg-brand-cream-dark transition-colors text-sm"
                            >
                              <span>{example.name}</span>
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button 
                      onClick={() => scrollToSection('contact')}
                      className="w-full bg-brand-green hover:bg-brand-green-light text-white"
                    >
                      Select This Template
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <div className="bg-brand-green p-8 rounded-xl text-white">
              <h3 className="text-2xl font-bold mb-4">Can't Find Your NGO Type?</h3>
              <p className="text-lg mb-6">
                We create custom templates for any cause. Let's discuss your specific needs.
              </p>
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-brand-green"
              >
                Request Custom Template
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Templates;
