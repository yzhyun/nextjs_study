export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col max-w-full items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block text-center max-w-full justify-center">
        {children}
      </div>
    </section>
  );
}
