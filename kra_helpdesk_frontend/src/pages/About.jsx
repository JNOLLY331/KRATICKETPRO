import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  FaHeadset, FaChartLine, FaClock, FaShieldAlt,
  FaUsers, FaRobot, FaGithub, FaLinkedin, FaEnvelope,
  FaCheckCircle, FaLightbulb, FaCog, FaArrowRight, FaStar
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
  }, []);

  const features = [
    {
      icon: <FaHeadset className="w-5 h-5" />,
      title: 'Efficient Support',
      description: 'Streamline ticket management and reduce response times with our intuitive system.'
    },
    {
      icon: <FaChartLine className="w-5 h-5" />,
      title: 'Advanced Analytics',
      description: 'Gain insights into support metrics and performance with comprehensive dashboards.'
    },
    {
      icon: <FaClock className="w-5 h-5" />,
      title: 'Real-time Updates',
      description: 'Stay informed with instant notifications and status updates on ticket progress.'
    },
    {
      icon: <FaShieldAlt className="w-5 h-5" />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with encrypted data and robust authentication.'
    },
    {
      icon: <FaUsers className="w-5 h-5" />,
      title: 'Team Collaboration',
      description: 'Enable seamless communication between support teams and customers.'
    },
    {
      icon: <FaRobot className="w-5 h-5" />,
      title: 'Knowledge Base',
      description: 'Empower users with self-service solutions through our comprehensive knowledge base.'
    }
  ];

  const teamMembers = [
    {
      name: 'Development Team',
      role: 'Full Stack Engineers',
      description: 'Building robust solutions with modern web technologies'
    },
    {
      name: 'UX/UI Team',
      role: 'Design Specialists',
      description: 'Creating intuitive and beautiful user experiences'
    },
    {
      name: 'QA Team',
      role: 'Quality Assurance',
      description: 'Ensuring reliability and performance across all features'
    }
  ];

  const technologies = [
    { category: 'Frontend', items: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'] },
    { category: 'Backend', items: ['Django', 'Python', 'REST API', 'PostgreSQL'] },
    { category: 'Tools', items: ['Git', 'Docker', 'GitHub', 'VS Code'] }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b-4 border-primary">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[9px] font-black tracking-[0.2em] text-primary uppercase bg-red-50 border border-primary/20 rounded-sm">
              <FaStar size={7} className="text-primary" />
              Institutional ICT Support Architecture
              <FaStar size={7} className="text-primary" />
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight font-oswald uppercase tracking-tight">
              About <span className="text-primary">KRA HelpDesk</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto uppercase tracking-widest font-medium">
              Professional helpdesk enterprise solutions. Optimized technical assistance flow for the KRA ICT department.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              data-aos="fade-right"
              className="flex flex-col"
            >
              <div className="flex items-start gap-4 h-full">
                <FaLightbulb className="w-6 h-6 text-primary flex-shrink-0 mt-2" />
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 font-oswald uppercase tracking-wide">Our Mission</h2>
                    <p className="text-[13px] text-slate-600 leading-relaxed font-medium uppercase tracking-widest">
                      To provide KRA with a world-class IT support ticketing system that simplifies
                      issue resolution, improves team collaboration, and enhances user satisfaction
                      through intelligent automation and data-driven insights.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              data-aos="fade-left"
              className="flex flex-col"
            >
              <div className="flex items-start gap-4 h-full">
                <FaCheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-2" />
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 font-oswald uppercase tracking-wide">Our Vision</h2>
                    <p className="text-[13px] text-slate-600 leading-relaxed font-medium uppercase tracking-widest">
                      To become the most reliable and user-friendly IT support platform,
                      empowering organizations to deliver exceptional service while reducing
                      operational complexity and costs.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
            data-aos="fade-up"
          >
            <span className="inline-block mb-3 text-[10px] font-black tracking-[0.3em] text-primary uppercase">
              — Core Capabilities —
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 font-oswald uppercase tracking-tight">
              Technical Infrastructure
            </h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-4" />
            <p className="text-slate-500 max-w-md mx-auto text-[11px] font-medium leading-relaxed mt-4 uppercase tracking-widest">
              Enterprise-grade tools for mission-critical ICT support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.10)' }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white p-8 border border-slate-100 group text-left relative overflow-hidden cursor-default"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="w-11 h-11 bg-red-50 flex items-center justify-center text-lg mb-5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-sm font-black text-slate-900 mb-2 font-oswald uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
            data-aos="fade-up"
          >
            <span className="inline-block mb-3 text-[10px] font-black tracking-[0.3em] text-primary uppercase">
              — Technical Stack —
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 font-oswald uppercase tracking-tight">
              Built With Modern Technologies
            </h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-4" />
            <p className="text-slate-500 max-w-md mx-auto text-[11px] font-medium leading-relaxed mt-4 uppercase tracking-widest">
              Enterprise-grade, scalable, and production-ready stack.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.10)' }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white p-8 border border-slate-100 group text-left relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="flex items-center gap-3 mb-6">
                  <FaCog className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-black text-slate-900 font-oswald uppercase tracking-wide">{tech.category}</h3>
                </div>
                <div className="space-y-3">
                  {tech.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-700 text-[12px] font-medium">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="uppercase tracking-wide">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
            data-aos="fade-up"
          >
            <span className="inline-block mb-3 text-[10px] font-black tracking-[0.3em] text-primary uppercase">
              — Dedicated Team —
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 font-oswald uppercase tracking-tight">
              Our Team
            </h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-4" />
            <p className="text-slate-500 max-w-md mx-auto text-[11px] font-medium leading-relaxed mt-4 uppercase tracking-widest">
              Talented professionals dedicated to excellence and innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.10)' }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white p-8 border border-slate-100 group text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="w-16 h-16 bg-primary text-white rounded-sm mx-auto mb-6 flex items-center justify-center text-2xl font-black shadow-lg group-hover:shadow-xl transition-shadow">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-sm font-black text-slate-900 mb-2 font-oswald uppercase tracking-wide">{member.name}</h3>
                <p className="text-primary font-black text-[10px] mb-3 uppercase tracking-widest">{member.role}</p>
                <p className="text-[12px] text-slate-600 font-medium leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <div className="py-16 relative z-20" style={{ backgroundColor: '#ff0b0bff' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: '100%', label: 'Uptime' },
              { number: '24/7', label: 'Support' },
              { number: '<5min', label: 'Avg Response' },
              { number: '10K+', label: 'Tickets Handled' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="px-4 text-center"
              >
                <p className="text-3xl md:text-4xl font-black text-white font-oswald tracking-tight">{stat.number}</p>
                <p className="text-[9px] font-bold text-red-100/60 uppercase tracking-widest mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-slate-300" />
            <span className="text-[9px] font-black tracking-[0.3em] text-primary uppercase">Get Started Today</span>
            <div className="h-px w-12 bg-slate-300" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 font-oswald uppercase tracking-tight">
            Deploy Support <span className="text-primary">Excellence</span>
          </h2>
          <p className="text-[13px] text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto uppercase tracking-widest font-medium">
            Join the KRA ICT department in improving transparency, accountability, and operational performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-primary hover:bg-red-700 text-white py-3.5 px-9 text-[11px] font-black uppercase tracking-[0.15em] font-oswald transition-all shadow-xl active:scale-95 border-b-4 border-red-800"
              >
                Get Started <FaArrowRight size={10} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-9 py-3.5 text-[11px] font-black uppercase tracking-[0.15em] text-slate-900 font-oswald border-2 border-slate-200 hover:border-primary hover:text-primary transition-all"
              >
                Staff Portal
              </Link>
            </motion.div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><FaShieldAlt size={10} /> Secure Access</span>
            <div className="h-3 w-px bg-slate-300 hidden sm:block" />
            <span className="flex items-center gap-2"><FaCheckCircle size={10} /> Role-Based Control</span>
            <div className="h-3 w-px bg-slate-300 hidden sm:block" />
            <span className="flex items-center gap-2"><FaClock size={10} /> 24/7 Availability</span>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t-4 border-primary">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
            data-aos="fade-up"
          >
            <span className="inline-block mb-3 text-[10px] font-black tracking-[0.3em] text-primary uppercase">
              — Contact Us —
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 font-oswald uppercase tracking-wide">Get in Touch</h2>
            <p className="text-[12px] text-slate-600 uppercase tracking-widest font-medium">We'd love to hear from you</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: FaEnvelope, title: 'Email', content: 'support@krahelpdesk.com' },
              { icon: FaHeadset, title: 'Support', content: 'Available 24/7' },
              { icon: FaGithub, title: 'Open Source', content: 'github.com/kra-helpdesk' }
            ].map((item, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white p-8 border border-slate-100 group text-center relative overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <item.icon className="w-6 h-6 text-primary mx-auto mb-4" />
                <h3 className="text-sm font-black text-slate-900 mb-2 font-oswald uppercase tracking-wide">{item.title}</h3>
                <p className="text-[12px] text-slate-600 font-medium">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
