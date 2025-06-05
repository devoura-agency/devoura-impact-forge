
import { CheckCircle, ArrowRight } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Discover",
      description: "We listen to your mission, goals, and audience to understand your unique needs."
    },
    {
      number: "02", 
      title: "Design",
      description: "Our Digital Experience Specialist crafts a user-friendly, accessible prototype."
    },
    {
      number: "03",
      title: "Develop", 
      description: "Our Lead Developer builds a responsive, functional site with AI features."
    },
    {
      number: "04",
      title: "Optimize",
      description: "Our Web Optimization Specialist ensures top performance with SEO and analytics."
    },
    {
      number: "05",
      title: "Launch & Support",
      description: "We launch your site and provide ongoing support to keep it thriving."
    }
  ];

  return (
    <section id="process" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-green mb-6">
              How We Bring Your Vision to Life
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our journey with that first NGO taught us the power of collaboration. Here's our proven process
            </p>
          </div>

          {/* Desktop Process Flow */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-8 left-8 right-8 h-0.5 bg-brand-green/30"></div>
              
              <div className="grid grid-cols-5 gap-4">
                {steps.map((step, index) => (
                  <div key={index} className="relative text-center">
                    {/* Step Circle */}
                    <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <span className="text-xl font-bold text-white">{step.number}</span>
                    </div>
                    
                    {/* Step Content */}
                    <div className="bg-brand-cream p-6 rounded-xl h-48 flex flex-col justify-center">
                      <h3 className="text-xl font-bold text-brand-green mb-3">{step.title}</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">{step.description}</p>
                    </div>
                    
                    {/* Checkmark */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                      <CheckCircle className="w-8 h-8 text-brand-green bg-white rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Process Flow */}
          <div className="md:hidden space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-white">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex-grow bg-brand-cream p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-brand-green mb-3">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                  <div className="flex-shrink-0 pt-6">
                    <CheckCircle className="w-8 h-8 text-brand-green" />
                  </div>
                </div>
                
                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <ArrowRight className="w-6 h-6 text-brand-green rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
