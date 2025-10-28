/**
 * Services Quote View Component
 * Service selection checkboxes and description textarea
 */

"use client";

import { cn } from "@/lib/utils";

interface ServicesQuoteViewProps {
  serviceTypes: {
    repair: boolean;
    consulting: boolean;
    reverseEngineering: boolean;
    rebuild: boolean;
  };
  description: string;
  onServiceTypeChange: (service: keyof typeof serviceTypes, checked: boolean) => void;
  onDescriptionChange: (description: string) => void;
  error?: string;
}

const SERVICE_OPTIONS = [
  {
    id: "repair" as const,
    label: "Repair",
    subtext: "Save my login details for next time.",
  },
  {
    id: "consulting" as const,
    label: "Consulting",
    subtext: "Save my login details for next time.",
  },
  {
    id: "reverseEngineering" as const,
    label: "Reverse Engineering",
    subtext: "Save my login details for next time.",
  },
  {
    id: "rebuild" as const,
    label: "Rebuild",
    subtext: "Save my login details for next time.",
  },
];

export function ServicesQuoteView({
  serviceTypes,
  description,
  onServiceTypeChange,
  onDescriptionChange,
  error,
}: ServicesQuoteViewProps) {
  return (
    <div className="space-y-8">
      {/* Service Type Selection */}
      <div>
        <h3 className="text-lg md:text-xl font-semibold text-white mb-6">
          What type of service do you need?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICE_OPTIONS.map((option) => (
            <label
              key={option.id}
              className="flex items-start gap-3 cursor-pointer group"
            >
              <div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
                <input
                  type="checkbox"
                  checked={serviceTypes[option.id]}
                  onChange={(e) => onServiceTypeChange(option.id, e.target.checked)}
                  className="peer w-5 h-5 border-2 border-gray-400 rounded bg-transparent appearance-none cursor-pointer transition-all checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-[#3d4f5c]"
                />
                <svg
                  className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-base group-hover:text-white/90 transition-colors">
                  {option.label}
                </p>
                <p className="text-gray-400 text-sm mt-1">{option.subtext}</p>
              </div>
            </label>
          ))}
        </div>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      </div>

      {/* Description Textarea */}
      <div>
        <h3 className="text-lg md:text-xl font-semibold text-white mb-4">
          What you need?
        </h3>
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Write Here"
          rows={8}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
        />
      </div>
    </div>
  );
}
