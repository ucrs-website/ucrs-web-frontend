"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessStep {
  id: string;
  number: number;
  title: string;
  titleMobile?: string;
}

interface ServiceFeature {
  id: string;
  label: string;
  labelMobile?: string;
}

const processSteps: ProcessStep[] = [
  {
    id: "scanning",
    number: 1,
    title: "3D Scanning & CAD Modeling",
  },
  {
    id: "analysis",
    number: 2,
    title: "Material Analysis & Prototyping",
  },
  {
    id: "compliant",
    number: 3,
    title: "OEM-Compliant",
    titleMobile: "AAR-Compliant Production",
  },
];

const serviceFeatures: ServiceFeature[] = [
  {
    id: "preventative",
    label: "Preventative Maintenance Plan",
    labelMobile: "Emergency Support Plans",
  },
  {
    id: "cost",
    label: "Cost-Benefit Analysis",
  },
  {
    id: "custom",
    label: "Custom Maintenance Schedules",
  },
];

interface BreathingNewLifeProps {
  headingLine1?: string;
  headingLine2?: string;
  className?: string;
}

export function BreathingNewLife({
  headingLine1 = "Breathing New Life",
  headingLine2 = "into Legacy Parts",
  className,
}: BreathingNewLifeProps) {
  return (
    <section className={cn("bg-white py-16 lg:py-24", className)}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          {/* Heading */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl lg:text-4xl font-semibold text-[#1570EF] leading-tight tracking-tight">
              {headingLine1}
              <br />
              <span className="text-[#4D4D4D]">{headingLine2}</span>
            </h2>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            {/* Process Steps - Horizontal */}
            <div className="grid md:grid-cols-3 gap-20 mb-16 max-w-2xl mx-auto">
              {processSteps.map((step) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center max-w-[220px] shadow-sm rounded-md p-4"
                >
                  <div className="relative">
                    <svg
                      width="50"
                      height="49"
                      viewBox="0 0 50 49"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M50 31C50 40.9411 41.9411 49 32 49L5 49C2.23857 49 -3.61899e-06 46.7614 -3.37758e-06 44L-4.05209e-07 10C7.76133e-08 4.47715 4.47715 -1.65037e-07 10 3.17786e-07L45 3.37758e-06C47.7614 3.61899e-06 50 2.23858 50 5L50 31Z"
                        fill="#E3EBFB"
                      />
                      <path
                        d="M43.5 19.75L25.625 37.625L17.5 29.5"
                        stroke="#A9C5F2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {/* Numbered Circle */}
                    <div className="absolute top-[-10px] left-[-15px] flex items-center justify-center w-8 h-8 rounded-full bg-[#535862] mb-6">
                      <span className="text-lg font-bold text-white">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Step Title */}
                  <p className="text-base mt-4 font-semibold text-[#181D27] text-center leading-tight">
                    {step.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Service Features - Horizontal */}
            <div className="flex items-center justify-center gap-16 shadow-sm w-fit mx-auto p-6 rounded-md">
              {serviceFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-5 h-5 rounded bg-[#17B26A]">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium text-[#181D27]">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Process Steps - Vertical Stack */}
            <div className="flex flex-col items-center gap-12 mb-12">
              {processSteps.map((step) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center p-8 w-[80%] mx-auto rounded-md shadow-sm"
                >
                  <div className="relative">
                    <svg
                      width="50"
                      height="49"
                      viewBox="0 0 50 49"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M50 31C50 40.9411 41.9411 49 32 49L5 49C2.23857 49 -3.61899e-06 46.7614 -3.37758e-06 44L-4.05209e-07 10C7.76133e-08 4.47715 4.47715 -1.65037e-07 10 3.17786e-07L45 3.37758e-06C47.7614 3.61899e-06 50 2.23858 50 5L50 31Z"
                        fill="#E3EBFB"
                      />
                      <path
                        d="M43.5 19.75L25.625 37.625L17.5 29.5"
                        stroke="#A9C5F2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {/* Numbered Circle */}
                    <div className="absolute top-[-10px] left-[-15px] flex items-center justify-center w-8 h-8 rounded-full bg-[#535862] mb-6">
                      <span className="text-lg font-bold text-white">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  {/* Step Title */}
                  <p className="text-base mt-4 font-semibold text-[#181D27] text-center leading-tight max-w-[70%]">
                    {step.titleMobile || step.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Service Features - Vertical Stack */}
            <div className="flex flex-col items-start gap-4 max-w-[328px] mx-auto shadow-sm p-4 rounded-md">
              {serviceFeatures.map((feature, index) => (
                <div key={feature.id} className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-5 h-5 rounded bg-[#17B26A] flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium text-[#181D27]">
                    {index === 0 && feature.labelMobile
                      ? feature.labelMobile
                      : feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
