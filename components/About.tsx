import React, { useEffect, useState } from 'react';

const About: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState([false, false, false]);
  const [whyVisible, setWhyVisible] = useState([false, false, false, false]);

  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setHeaderVisible(true), 80));

    // Stagger the three top cards
    timers.push(window.setTimeout(() => setCardsVisible([true, false, false]), 220));
    timers.push(window.setTimeout(() => setCardsVisible([true, true, false]), 360));
    timers.push(window.setTimeout(() => setCardsVisible([true, true, true]), 500));

    // Stagger the why-tiles
    timers.push(window.setTimeout(() => setWhyVisible([true, false, false, false]), 760));
    timers.push(window.setTimeout(() => setWhyVisible([true, true, false, false]), 900));
    timers.push(window.setTimeout(() => setWhyVisible([true, true, true, false]), 1040));
    timers.push(window.setTimeout(() => setWhyVisible([true, true, true, true]), 1180));

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const cardClass = (visible: boolean) =>
    `group rounded-lg p-6 border border-slate-700 bg-slate-800/40 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20 hover:border-indigo-400/30 hover:bg-slate-900/60 cursor-pointer`;

  const tileClass = (visible: boolean) =>
    `group rounded-lg p-5 border border-slate-700 bg-slate-800/30 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/18 hover:border-indigo-400/30 hover:bg-slate-900/60 cursor-pointer`;

  return (
    <div className="flex-1 flex items-start justify-center p-8">
      <div className="w-full max-w-5xl">
        <header className={`mb-8 transition-all duration-500 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white">About DSTECH</h2>
          <p className="text-slate-400 mt-3 max-w-3xl">DSTECH is a focused learning platform built to help engineers master data structures and algorithms through hands-on practice, expert solutions, and measurable progress tracking.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={cardClass(cardsVisible[0])}>
            <h4 className="text-lg font-semibold text-white mb-2">About The Company</h4>
            <p className="text-slate-400 text-sm">Founded by engineers with interview experience at top tech companies, DSTECH was created to bridge the gap between learning and interviewing — by combining curated problems, clear solutions, and analytics that show real progress.</p>
          </div>

          <div className={cardClass(cardsVisible[1])}>
            <h4 className="text-lg font-semibold text-white mb-2">What We Offer</h4>
            <ul className="text-slate-400 text-sm list-disc list-inside space-y-2">
              <li>500+ curated problems across algorithms and data structures</li>
              <li>Step-by-step expert solutions and video explanations</li>
              <li>Progress analytics & personalized study plans</li>
              <li>Community support and mock interview prep</li>
            </ul>
          </div>

          <div className={cardClass(cardsVisible[2])}>
            <h4 className="text-lg font-semibold text-white mb-2">Establishment</h4>
            <p className="text-slate-400 text-sm mb-2">Established: <span className="text-white font-medium">2024</span></p>
            <p className="text-slate-400 text-sm">Headquarters: Remote-first with contributors around the world. Founded by engineers passionate about mentor-driven learning and measurable outcomes.</p>
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-2xl font-bold text-white mb-4">Why DSTECH is Different</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={tileClass(whyVisible[0])}>
              <h4 className="text-lg font-semibold text-white">Practice with Purpose</h4>
              <p className="text-slate-400 text-sm">Problems are organized into a curriculum that focuses on concepts most likely to appear in real interviews, with progressive difficulty and targeted review.</p>
            </div>
            <div className={tileClass(whyVisible[1])}>
              <h4 className="text-lg font-semibold text-white">Expert-Led Solutions</h4>
              <p className="text-slate-400 text-sm">Every problem includes a clear, efficient solution written by experienced engineers, plus video walkthroughs for tricky concepts.</p>
            </div>
            <div className={tileClass(whyVisible[2])}>
              <h4 className="text-lg font-semibold text-white">Data-Driven Coaching</h4>
              <p className="text-slate-400 text-sm">Understand your strengths and focus areas with analytics — we surface weak spots so you can practice smarter, not harder.</p>
            </div>
            <div className={tileClass(whyVisible[3])}>
              <h4 className="text-lg font-semibold text-white">Community & Mock Interviews</h4>
              <p className="text-slate-400 text-sm">Join a supportive community for feedback, peer learning, and simulated interviews that mirror real recruiting experiences.</p>
            </div>
          </div>
        </section>

        <section className="mt-8 text-center">
          <p className="text-slate-400">Want to learn more or partner with us? <a href="#" className="text-indigo-400 hover:text-indigo-300">Contact our team</a>.</p>
        </section>
      </div>
    </div>
  );
};

export default About;
