export default function SectionContainer({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto w-full max-w-[1920px] px-4 py-6 md:py-12 ${className}`}>
      {children}
    </section>
  );
}
