
import { CheckCircle } from 'lucide-react';

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
    <section id="process" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-green mb-6">
              How We Bring Your Vision to Life
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our journey with that first NGO taught us the power of collaboration. Here's our proven process
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-8 p-8 bg-brand-cream rounded-xl hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-brand-green mb-3">{step.title}</h3>
                  <p className="text-lg text-gray-700">{step.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <CheckCircle className="w-8 h-8 text-brand-green" />
                </div>
              </div>
            ))}
          </div>

          {/* <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-brand-green to-brand-green-light p-8 rounded-xl text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="text-lg mb-6">
                Every great website starts with understanding your mission. Let's begin the conversation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-brand-green px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  See Our Process in Action
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-brand-green transition-colors">
                  View Portfolio
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Process;
