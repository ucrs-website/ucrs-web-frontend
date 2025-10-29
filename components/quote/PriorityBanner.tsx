/**
 * Priority Banner Component
 * Banner highlighting urgent request handling
 */

export function PriorityBanner() {
  return (
    <section className="py-6 md:py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-[#3d4f5c] rounded-2xl md:rounded-3xl px-8 md:px-12 py-6 md:py-8">
          <p className="text-white text-base md:text-lg lg:text-xl text-center leading-relaxed">
            We prioritize urgent requests to ensure a swift turnaround on our offer.
          </p>
        </div>
      </div>
    </section>
  );
}
