import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  FaHeadset, FaChartLine, FaClock, FaShieldAlt,
  FaUsers, FaRobot, FaGithub, FaLinkedin, FaEnvelope,
  FaCheckCircle, FaLightbulb, FaCog
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <FaHeadset className="w-12 h-12" />,
      title: 'Efficient Support',
      description: 'Streamline ticket management and reduce response times with our intuitive system.'
    },
    {
      icon: <FaChartLine className="w-12 h-12" />,
      title: 'Advanced Analytics',
      description: 'Gain insights into support metrics and performance with comprehensive dashboards.'
    },
    {
      icon: <FaClock className="w-12 h-12" />,
      title: 'Real-time Updates',
      description: 'Stay informed with instant notifications and status updates on ticket progress.'
    },
    {
      icon: <FaShieldAlt className="w-12 h-12" />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with encrypted data and robust authentication.'
    },
    {
      icon: <FaUsers className="w-12 h-12" />,
      title: 'Team Collaboration',
      description: 'Enable seamless communication between support teams and customers.'
    },
    {
      icon: <FaRobot className="w-12 h-12" />,
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">KRA HelpDesk</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
            Revolutionizing IT support management with innovative technology and customer-centric solutions.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div data-aos="fade-right" className="space-y-4">
              <div className="flex items-start gap-4">
                <FaLightbulb className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-3">Our Mission</h2>
                  <p className="text-slate-600 leading-relaxed">
                    To provide KRA with a world-class IT support ticketing system that simplifies
                    issue resolution, improves team collaboration, and enhances user satisfaction
                    through intelligent automation and data-driven insights.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div data-aos="fade-left" className="space-y-4">
              <div className="flex items-start gap-4">
                <FaCheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-3">Our Vision</h2>
                  <p className="text-slate-600 leading-relaxed">
                    To become the most reliable and user-friendly IT support platform,
                    empowering organizations to deliver exceptional service while reducing
                    operational complexity and costs.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Core Features</h2>
            <p className="text-xl text-slate-600">What makes our platform stand out</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Technology Stack</h2>
            <p className="text-xl text-slate-600">Built with modern, scalable technologies</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl border border-blue-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <FaCog className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-bold text-slate-900">{tech.category}</h3>
                </div>
                <div className="space-y-3">
                  {tech.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Our Team</h2>
            <p className="text-xl text-slate-600">Talented professionals dedicated to excellence</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 150}
                className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: '100%', label: 'Uptime' },
              { number: '24/7', label: 'Support' },
              { number: '<5min', label: 'Avg Response' },
              { number: '10K+', label: 'Tickets Handled' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl sm:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Join thousands of users who trust KRA HelpDesk for their IT support needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="inline-block bg-slate-200 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Get in Touch</h2>
            <p className="text-slate-600">We'd love to hear from you</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div data-aos="fade-up">
              <FaEnvelope className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
              <p className="text-slate-600">support@krahelpdesk.com</p>
            </motion.div>
            <motion.div data-aos="fade-up" data-aos-delay="100">
              <FaHeadset className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">Support</h3>
              <p className="text-slate-600">Available 24/7</p>
            </motion.div>
            <motion.div data-aos="fade-up" data-aos-delay="200">
              <FaGithub className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">Open Source</h3>
              <p className="text-slate-600">github.com/kra-helpdesk</p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
