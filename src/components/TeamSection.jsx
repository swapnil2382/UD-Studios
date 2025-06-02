import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Twitter } from 'lucide-react';

// Define the team members with more professional attributes
const teamMembers = [
  {
    name: 'Alex Chen',
    role: 'Lead Game Designer',
    bio: 'Experienced designer with a passion for creating immersive gaming worlds that captivate players.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    socials: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
  {
    name: 'Maya Rodriguez',
    role: 'Senior 3D Artist',
    bio: 'Specializes in creating stunning visual assets and environments that bring game worlds to life.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    socials: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
  {
    name: 'Jamal Wilson',
    role: 'Lead Developer',
    bio: 'Expert in game engine technologies with a focus on optimization and innovative gameplay mechanics.',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
    socials: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
  {
    name: 'Sophia Kim',
    role: 'UI/UX Designer',
    bio: 'Creates intuitive and beautiful interfaces that enhance player experience and engagement.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
    socials: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
];

interface TeamMemberCardProps {
  member: typeof teamMembers[0];
  index: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full relative group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gray-800/80 backdrop-blur-sm shadow-xl border border-gray-700/50 hover:border-purple-500/50 transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
        
        <div className="relative aspect-[3/4] overflow-hidden">
          <img 
            src={member.image} 
            alt={member.name} 
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="opacity-100 group-hover:opacity-0 transform translate-y-0 group-hover:translate-y-20 transition-all duration-300">
            <h3 className="text-xl font-bold text-white">{member.name}</h3>
            <p className="text-purple-300">{member.role}</p>
          </div>
          
          <div className="opacity-0 group-hover:opacity-100 transform translate-y-20 group-hover:translate-y-0 transition-all duration-300">
            <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
            <p className="text-sm text-gray-300 mb-4">{member.bio}</p>
            
            <div className="flex space-x-3">
              <a href={member.socials.linkedin} className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-800/80 hover:bg-purple-600 transition-colors duration-300 text-white">
                <Linkedin size={18} />
              </a>
              <a href={member.socials.twitter} className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-800/80 hover:bg-purple-600 transition-colors duration-300 text-white">
                <Twitter size={18} />
              </a>
              <a href={member.socials.github} className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-800/80 hover:bg-purple-600 transition-colors duration-300 text-white">
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const TeamSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {teamMembers.map((member, index) => (
        <TeamMemberCard key={index} member={member} index={index} />
      ))}
    </div>
  );
};

export default TeamSection;