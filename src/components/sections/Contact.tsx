
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  AtSign, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  Facebook,
  Download, 
  Mail, 
  Phone, 
  ArrowRight, 
  CheckCircle,
  Loader2
} from 'lucide-react';
import ScrollAnimationWrapper from '@/components/animations/ScrollAnimationWrapper';
import AnimatedText from '@/components/ui/AnimatedText';
import AnimatedButton from '@/components/ui/AnimatedButton';
import AnimatedCard from '@/components/ui/AnimatedCard';
import DynamicBackground from '@/components/ui/DynamicBackground';
import { contactInfo } from '@/data/Contact';

// Animated envelope component
const AnimatedEnvelope = () => {
  return (
    <div className="relative w-24 h-24 mx-auto mb-6">
      <div className="absolute inset-0 bg-highlight/20 rounded-full animate-ping-slow opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Mail className="w-12 h-12 text-highlight animate-float" />
      </div>
    </div>
  );
};

// Form field component with animation
const FormField = ({ label, id, type = "text", placeholder, value, onChange, required = true, className = "", delay = 0 }) => {
  return (
    <ScrollAnimationWrapper animation="fade-up" delay={delay} className="grid gap-3">
      <Label htmlFor={id} className="text-slate-light font-medium">{label}</Label>
      {type === "textarea" ? (
        <Textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`min-h-[150px] bg-navy/60 border-muted focus:border-highlight resize-none transition-all duration-300 focus:shadow-glow-sm ${className}`}
        />
      ) : (
        <Input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`bg-navy/60 border-muted focus:border-highlight transition-all duration-300 focus:shadow-glow-sm ${className}`}
        />
      )}
    </ScrollAnimationWrapper>
  );
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'info'
  
  // Refs for animation
  const formRef = useRef(null);
  const infoRef = useRef(null);
  
  // For mobile view toggle
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
      setFormSubmitted(true);
      
      // Reset form submitted state after showing success message
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section-container relative overflow-hidden py-20">
      <DynamicBackground variant="gradient" intensity="medium" color="accent-purple" />
      
      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-80 h-80 bg-highlight/10 rounded-full filter blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-pink/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent-teal/10 rounded-full filter blur-3xl"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 bg-highlight/30 rounded-full animate-float-particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 15}s`
            }}
          ></div>
        ))}
      </div>
      
      <ScrollAnimationWrapper animation="fade-up">
        <AnimatedText effect="gradient" as="h2" className="section-title mb-4">
          <span className="text-highlight font-mono mr-2"></span>Get In Touch
        </AnimatedText>
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper animation="fade-up" delay={200}>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <AnimatedText effect="highlight" as="p" className="text-slate text-lg">
            I'm currently looking for new opportunities, and my inbox is always open. 
            Whether you have a question, a project idea, or just want to say hi, I'll do my best to get back to you!
          </AnimatedText>
        </div>
      </ScrollAnimationWrapper>
      
      {/* Mobile tabs - only visible on small screens */}
      <div className="lg:hidden flex justify-center mb-8">
        <div className="bg-navy-light/30 glass-effect p-1 rounded-full flex">
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'form' ? 'bg-highlight text-navy-dark' : 'text-slate hover:text-slate-light'}`}
            onClick={() => toggleTab('form')}
          >
            Send Message
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'info' ? 'bg-highlight text-navy-dark' : 'text-slate hover:text-slate-light'}`}
            onClick={() => toggleTab('info')}
          >
            Contact Info
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        {/* Form Column */}
        <div 
          ref={formRef} 
          className={`lg:col-span-7 ${activeTab === 'form' ? 'block' : 'hidden lg:block'}`}
        >
          <ScrollAnimationWrapper animation="fade-right" delay={300}>
            <AnimatedCard 
              className="bg-navy-light/40 glass-effect p-8 lg:p-10 rounded-xl relative overflow-hidden" 
              hoverEffect="glow"
            >
              {/* Success message overlay */}
              {formSubmitted && (
                <div className="absolute inset-0 bg-navy-dark/90 flex flex-col items-center justify-center z-20 animate-fadeIn p-6 text-center">
                  <CheckCircle className="text-highlight w-16 h-16 mb-4 animate-bounce-slow" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-light mb-6">Thanks for reaching out. I'll get back to you soon.</p>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2 bg-highlight text-navy-dark rounded-full font-medium hover:bg-highlight/80 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              )}
              
              {/* Decorative elements */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-highlight/5 rounded-full filter blur-xl opacity-70"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent-pink/5 rounded-full filter blur-xl opacity-70"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-8">
                  <AnimatedEnvelope />
                  <div>
                    <AnimatedText effect="gradient" as="h3" className="text-2xl font-bold mb-2">
                      Send me a message
                    </AnimatedText>
                    <p className="text-slate/80">I'll respond as soon as possible</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField 
                      label="Name" 
                      id="name" 
                      placeholder="John Smith" 
                      value={formData.name} 
                      onChange={handleChange}
                      delay={100}
                    />
                    
                    <FormField 
                      label="Email" 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      value={formData.email} 
                      onChange={handleChange}
                      delay={200}
                    />
                  </div>
                  
                  <FormField 
                    label="Subject" 
                    id="subject" 
                    placeholder="Project Inquiry" 
                    value={formData.subject} 
                    onChange={handleChange}
                    delay={300}
                  />
                  
                  <FormField 
                    label="Message" 
                    id="message" 
                    type="textarea" 
                    placeholder="What would you like to discuss?" 
                    value={formData.message} 
                    onChange={handleChange}
                    delay={400}
                  />
                  
                  <ScrollAnimationWrapper animation="fade-up" delay={500}>
                    <AnimatedButton 
                      type="submit" 
                      variant="primary"
                      size="lg"
                      icon={isSubmitting ? <Loader2 className="animate-spin" /> : <Send />}
                      iconPosition="right"
                      className="w-full justify-center font-medium mt-4"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    </AnimatedButton>
                  </ScrollAnimationWrapper>
                </form>
              </div>
            </AnimatedCard>
          </ScrollAnimationWrapper>
        </div>
        
        {/* Contact Info Column */}
        <div 
          ref={infoRef} 
          className={`lg:col-span-5 ${activeTab === 'info' ? 'block' : 'hidden lg:block'}`}
        >
          <ScrollAnimationWrapper animation="fade-left" delay={400}>
            <AnimatedCard 
              className="bg-navy-light/40 glass-effect p-8 lg:p-10 rounded-xl relative overflow-hidden h-full" 
              hoverEffect="glow"
            >
              {/* Decorative elements */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent-purple/5 rounded-full filter blur-xl opacity-70"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-highlight/5 rounded-full filter blur-xl opacity-70"></div>
              
              <div className="relative z-10">
                <AnimatedText effect="gradient" as="h3" className="text-2xl font-bold mb-8">
                  Contact Information
                </AnimatedText>
                
                <div className="space-y-8">
                  <ScrollAnimationWrapper animation="fade-up" delay={100}>
                    <div className="flex items-center bg-navy-dark/40 p-4 rounded-xl hover:bg-navy-dark/60 transition-all duration-300 transform hover:translate-x-1">
                      <div className="bg-highlight/10 p-3 rounded-lg mr-4 animate-pulse-slow">
                        <AtSign className="text-highlight h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-slate-light font-medium text-sm mb-1">Email</p>
                        <a 
                          href={`mailto:${contactInfo.email}`} 
                          className="text-white hover:text-highlight transition-colors"
                        >
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>
                  </ScrollAnimationWrapper>
                  
                  <ScrollAnimationWrapper animation="fade-up" delay={200}>
                    <div className="flex items-center bg-navy-dark/40 p-4 rounded-xl hover:bg-navy-dark/60 transition-all duration-300 transform hover:translate-x-1">
                      <div className="bg-highlight/10 p-3 rounded-lg mr-4 animate-pulse-slow">
                        <MapPin className="text-highlight h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-slate-light font-medium text-sm mb-1">Location</p>
                        <p className="text-white">
                          {contactInfo.location}
                        </p>
                      </div>
                    </div>
                  </ScrollAnimationWrapper>
                  
                  <ScrollAnimationWrapper animation="fade-up" delay={300}>
                    <div className="flex items-center bg-navy-dark/40 p-4 rounded-xl hover:bg-navy-dark/60 transition-all duration-300 transform hover:translate-x-1">
                      <div className="bg-highlight/10 p-3 rounded-lg mr-4 animate-pulse-slow">
                        <Phone className="text-highlight h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-slate-light font-medium text-sm mb-1">Phone</p>
                        <p className="text-white">
                          Available upon request
                        </p>
                      </div>
                    </div>
                  </ScrollAnimationWrapper>
                </div>
                
                <ScrollAnimationWrapper animation="fade-up" delay={400}>
                  <div className="mt-12">
                    <h4 className="text-slate-light font-medium mb-6 flex items-center">
                      <span className="bg-highlight/10 p-1 rounded mr-2">
                        <ArrowRight className="text-highlight h-4 w-4" />
                      </span>
                      Connect with me
                    </h4>
                    
                    <div className="grid grid-cols-5 gap-3">
                      {contactInfo.social.map((platform, index) => {
                        // Map string icon names to actual icon components
                        const iconMap = {
                          Github,
                          Linkedin,
                          Twitter,
                          Instagram,
                          Facebook
                        };
                        const IconComponent = iconMap[platform.icon as keyof typeof iconMap];
                        
                        return (
                          <a 
                            key={platform.id}
                            href={platform.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label={platform.name}
                            className="bg-navy-dark/50 glass-effect p-4 rounded-lg text-slate hover:text-highlight transition-all duration-300 hover:-translate-y-2 hover:shadow-glow-sm flex items-center justify-center group"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <IconComponent className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </ScrollAnimationWrapper>
                
                <ScrollAnimationWrapper animation="fade-up" delay={500}>
                  <div className="mt-12 flex justify-center">
                    <AnimatedButton 
                      href={contactInfo.resumeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      variant="outline"
                      size="lg"
                      icon={<Download className="h-4 w-4" />}
                      iconPosition="left"
                      className="font-mono"
                    >
                      Download Resume
                    </AnimatedButton>
                  </div>
                </ScrollAnimationWrapper>
              </div>
            </AnimatedCard>
          </ScrollAnimationWrapper>
        </div>
      </div>
      
      {/* Floating call-to-action */}
      <ScrollAnimationWrapper animation="fade-up" delay={600}>
        <div className="mt-20 text-center">
          <p className="text-slate-light mb-4">Prefer a quick call?</p>
          <AnimatedButton 
            href="#" 
            variant="ghost"
            size="sm"
            icon={<Phone className="h-4 w-4" />}
            iconPosition="left"
            className="font-mono"
          >
            Schedule a call
          </AnimatedButton>
        </div>
      </ScrollAnimationWrapper>
    </section>
  );
};

export default Contact;
