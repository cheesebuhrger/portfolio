"use client";

export default function About() {
  return (
    <div className="min-h-screen bg-surface-background">
      <section className="p-4 pt-24 md:p-8 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <div>
            <h1 className="text-4xl mb-4">About</h1>
            <p className="text-base mb-6">
              I&apos;m a product designer focused on creating meaningful
              experiences through thoughtful design and code.
            </p>
            <p className="text-base mb-6">
              My approach combines hands-on crafting with technical expertise,
              allowing me to build and iterate on ideas quickly.
            </p>
            <p className="text-base">
              Currently based in San Francisco, I work on projects that bridge
              the gap between design and technology.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xs font-mono uppercase mb-2">Contact</h2>
              <p className="text-base">hello@buhr.design</p>
            </div>
            <div>
              <h2 className="text-xs font-mono uppercase mb-2">Social</h2>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com"
                  className="text-base hover:text-text-action"
                >
                  LinkedIn
                </a>
                <a
                  href="https://dribbble.com"
                  className="text-base hover:text-text-action"
                >
                  Dribbble
                </a>
                <a
                  href="https://are.na"
                  className="text-base hover:text-text-action"
                >
                  Are.na
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
