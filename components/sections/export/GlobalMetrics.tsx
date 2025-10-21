import Image from 'next/image'

const metrics = [
  {
    icon: '/icons/export/worldwide.svg',
    label: (
      <>
        <span className="font-bold">57+</span> Countries Served
      </>
    ),
  },
  {
    icon: '/icons/export/shipping.svg',
    label: (
      <>
        <span className="font-bold">20,000+</span> Parts Shipped Annually
      </>
    ),
  },
  {
    icon: '/icons/export/on-time.svg',
    label: (
      <>
        <span className="font-bold">98%</span> On-Time Delivery
      </>
    ),
  },
  {
    icon: '/icons/export/support-24-7.svg',
    label: (
      <>
        <span className="font-bold">24/7</span> Multilingual Support
      </>
    ),
  },
]

export function GlobalMetrics() {
  return (
    <section className="bg-white py-12 md:py-24">
      {/* Heading */}
      <div className="text-center mb-8 md:mb-16 px-4">
        <p className="text-sm md:text-base font-semibold text-muted-foreground mb-3">
          Reliability is the key
        </p>
        <h2 className="text-2xl md:text-4xl font-display font-semibold text-foreground tracking-tight">
          How We Build Reliability
        </h2>
      </div>

      {/* Metrics Container */}
      <div className="container max-w-[1280px] px-4 md:px-8">
        <div className="border-t border-b border-border py-8 md:py-16">
          {/* Desktop: 4 columns grid */}
          <div className="hidden md:flex md:flex-wrap md:gap-x-16 md:gap-y-4 md:justify-center">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 min-w-[240px] flex-1 basis-0"
              >
                <div className="w-[72px] h-[72px] relative flex-shrink-0">
                  <Image
                    src={metric.icon}
                    alt=""
                    width={72}
                    height={72}
                    className="object-contain"
                  />
                </div>
                <p className="text-lg font-semibold text-foreground text-center">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile: Vertical stack */}
          <div className="flex flex-col gap-6 md:hidden">
            {metrics.map((metric, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 relative flex-shrink-0">
                  <Image
                    src={metric.icon}
                    alt=""
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>
                <p className="text-base md:text-lg font-semibold text-foreground text-center">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
