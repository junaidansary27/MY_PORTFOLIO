import { Code, Brain, Zap, Monitor, Server, Database, Wrench } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: <Code size={20} className="text-blue-400" />,
      skills: [
        { name: 'Python', percentage: 90 },
        { name: 'JavaScript', percentage: 85 },
        { name: 'TypeScript', percentage: 75 },
        { name: 'HTML & CSS', percentage: 85 }
      ]
    },
    {
      title: 'Artificial Intelligence',
      icon: <Brain size={20} className="text-violet-400" />,
      skills: [
        { name: 'OpenAI & Claude APIs', percentage: 85 },
        { name: 'Prompt Engineering', percentage: 90 },
        { name: 'LangChain / RAG', percentage: 75 },
        { name: 'Vector DBs (Pinecone/Chroma)', percentage: 70 }
      ]
    },
    {
      title: 'Workflow Automation',
      icon: <Zap size={20} className="text-cyan-400" />,
      skills: [
        { name: 'n8n & Make.com', percentage: 85 },
        { name: 'REST API Integrations', percentage: 90 },
        { name: 'Cron-based Automation', percentage: 80 },
        { name: 'Custom Python Scripts', percentage: 85 }
      ]
    },
    {
      title: 'Frontend Development',
      icon: <Monitor size={20} className="text-emerald-400" />,
      skills: [
        { name: 'React.js', percentage: 80 },
        { name: 'Tailwind CSS v3 / v4', percentage: 85 },
        { name: 'Responsive Layouts', percentage: 85 },
        { name: 'State Management', percentage: 75 }
      ]
    },
    {
      title: 'Backend Engineering',
      icon: <Server size={20} className="text-indigo-400" />,
      skills: [
        { name: 'Node.js & Express.js', percentage: 80 },
        { name: 'FastAPI (Python)', percentage: 70 },
        { name: 'RESTful API Design', percentage: 85 },
        { name: 'Middleware & Auth', percentage: 75 }
      ]
    },
    {
      title: 'Databases & Vector Storage',
      icon: <Database size={20} className="text-orange-400" />,
      skills: [
        { name: 'MongoDB', percentage: 75 },
        { name: 'PostgreSQL', percentage: 70 },
        { name: 'Pinecone / ChromaDB', percentage: 70 }
      ]
    },
    {
      title: 'Development Tools',
      icon: <Wrench size={20} className="text-pink-400" />,
      skills: [
        { name: 'Git & GitHub', percentage: 85 },
        { name: 'Postman (API Testing)', percentage: 80 },
        { name: 'Docker (Basic)', percentage: 60 },
        { name: 'VS Code & CLI Tools', percentage: 90 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 border-t border-slate-900 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">
            Skills
          </h2>
          <h3 className="font-display text-3xl font-bold text-slate-100 mb-4">
            Technical Matrix
          </h3>
          <p className="text-slate-400 font-light text-sm sm:text-base">
            Categorized overview of my technical capabilities and hands-on proficiency based on real applications built.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <div key={index} className="glass-card p-6 rounded-2xl flex flex-col space-y-5 text-left border border-slate-800/60">
              
              {/* Category Header */}
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  {category.icon}
                </div>
                <h4 className="font-display font-semibold text-sm sm:text-base text-slate-200">
                  {category.title}
                </h4>
              </div>

              {/* Skills List */}
              <div className="space-y-4 flex-grow">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-medium">
                      <span className="text-slate-300">{skill.name}</span>
                      <span className="text-slate-400">{skill.percentage}%</span>
                    </div>
                    {/* Progress Track */}
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/50">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
