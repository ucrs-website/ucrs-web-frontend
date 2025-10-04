import React from 'react'
import { LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface FeaturesSectionProps {
  heading?: string
  supportingText?: string
  features: Feature[]
  layout?: 'grid' | 'list'
}

export function FeaturesSection({
  heading = 'Features',
  supportingText = 'Everything you need to grow your business',
  features,
  layout = 'grid',
}: FeaturesSectionProps) {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-[1200px] mx-auto">
          {/* Section header */}
          <div className="text-center max-w-[768px] mx-auto mb-16">
            <h2 className="text-4xl font-semibold text-foreground mb-4">
              {heading}
            </h2>
            <p className="text-xl text-muted-foreground">
              {supportingText}
            </p>
          </div>

          {/* Features grid/list */}
          <div
            className={
              layout === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-12'
            }
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-base text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
