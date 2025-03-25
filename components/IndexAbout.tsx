import React from "react";
import SectionLabel from "./ProjectSection";

const AboutMe: React.FC = () => {
  return (
    <section
      id="about"
      className="border-t border-black p-16 pb-32 bg-surface-background"
    >
      <div className="grid grid-cols-12 gap-6">
        <SectionLabel
          number="02"
          title="I Make Things Happen"
          className="pt-1 pb-8 col-span-2"
        />
        <div className="col-span-10 pb-12">
          <p className="text-5xl font-sans-light">
            Through a decade of designing, I've learned that finding new ways to{" "}
            <span>bring ideas to life</span> is what drives me. I’ve honed my
            skills in interaction design, motion, design systems, and
            prototyping—now I’m learning to blend all of that with code.
          </p>
        </div>
        <div className="col-start-3 col-end-8">
          <p className="pb-6 text-base">
            My background in science keeps me focused on technical execution,
            customer lifecycle growth, and making a tangible impact on the
            business.
          </p>
        </div>
        <div className="col-start-3 col-end-8">
          <p className="pb-6 text-base">
            I don’t take things personally—I value feedback and am always down
            to improve collaboration. I’ve found that I can adapt to different
            team dynamics and take on the role that’s needed. I believe building
            strong relationships within the team helps us stay focused on
            solving real problems.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
