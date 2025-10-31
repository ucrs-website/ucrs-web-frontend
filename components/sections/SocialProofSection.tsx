import React from "react";
import Image from "next/image";

interface Company {
  name: string;
  src: string;
}

interface SocialProofSectionProps {
  heading?: string;
  companies?: Company[];
}

const defaultCompanies: Company[] = [
  {
    name: "OdeaoLabs",
    src: "/images/companies/social1.avif",
  },
  {
    name: "Kintsugi",
    src: "/images/companies/social2.avif",
  },
  {
    name: "Magnolia",
    src: "/images/companies/social3.avif",
  },
];

export function SocialProofSection({
  heading = "Well engaged in railway community",
  companies = defaultCompanies,
}: SocialProofSectionProps) {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-8">
        <div className="max-w-[1280px] mx-auto space-y-8">
          {/* Heading */}
          <p className="text-center text-base font-medium text-[#535862] leading-6">
            {heading}
          </p>

          {/* Company logos - 3 brands side by side */}
          <div className="flex items-center justify-center gap-8 lg:gap-12 py-4 flex-nowrap">
            {companies.map((company, index) => (
              <div key={index}>
                {company.src && (
                  <div className="relative md:h-20 h-10 w-20 md:w-40 flex-shrink-0">
                    <Image
                      src={company.src}
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
