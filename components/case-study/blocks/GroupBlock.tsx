/** Keeps related blocks close together (tighter gap than between blocks). */
export default function GroupBlock({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">{children}</div>;
}
