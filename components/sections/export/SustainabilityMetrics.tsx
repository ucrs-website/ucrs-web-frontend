import Image from 'next/image'

const metrics = [
  {
    icon: '/icons/export/carbon-neutral.svg',
    label: (
      <>
        <span className="text-green-600">Carbon-Neutral</span> Shipping
      </>
    ),
  },
  {
    icon: '/icons/export/recycle.svg',
    label: (
      <>
        <span className="text-green-600">Recyclable</span> Packaging
      </>
    ),
  },
  {
    icon: '/icons/export/local-partnership.svg',
    label: (
      <>
        <span className="text-green-600">Local</span> Sourcing Partnerships
      </>
    ),
  },
]

export function SustainabilityMetrics() {
  return (
    <section className="bg-white py-12 md:py-24">
      {/* Metrics Container */}
      <div className="container max-w-[1280px] px-4 md:px-8">
        <div className="border-t border-b border-border py-8 md:py-16">
          {/* Desktop: 3 columns grid */}
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
          <div className="flex flex-col gap-12 md:hidden">
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
                <p className="text-base font-semibold text-foreground text-center">
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
