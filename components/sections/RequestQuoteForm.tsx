'use client'

import React, { useState } from 'react'
import { User, Building2, Mail, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface ServiceType {
  id: string
  label: string
  description: string
}

const serviceTypes: ServiceType[] = [
  {
    id: 'repair',
    label: 'Repair',
    description: 'Assembly repair and rebuild services',
  },
  {
    id: 'reverse-engineering',
    label: 'Reverse Engineering',
    description: 'Obsolescence management solutions',
  },
  {
    id: 'consulting',
    label: 'Consulting',
    description: 'Expert maintenance planning',
  },
  {
    id: 'rebuild',
    label: 'Rebuild',
    description: 'Complete locomotive rebuild programs',
  },
]

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Mexico',
  'Brazil',
  'Other',
]

const countryCodes = [
  { code: '+1', country: 'US/CA', flag: '🇺🇸' },
  { code: '+30', country: 'GR', flag: '🇬🇷' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
]

interface RequestQuoteFormProps {
  headingLine1?: string
  headingLine2?: string
  onSubmit?: (data: FormData) => void
  className?: string
}

export function RequestQuoteForm({
  headingLine1 = 'Quick Quote,',
  headingLine2 = 'Zero Headache',
  onSubmit,
  className,
}: RequestQuoteFormProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [countryCode, setCountryCode] = useState('+1')
  const [fileName, setFileName] = useState<string>('')

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    onSubmit?.(formData)
    // Handle form submission (API call will be added later)
    console.log('Form submitted:', Object.fromEntries(formData))
  }

  return (
    <section className={cn('bg-[#3E4C5E] py-16 lg:py-24 relative overflow-hidden', className)}>
      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,300 Q250,250 500,300 T1000,300 L1000,1000 L0,1000 Z"
            fill="currentColor"
            className="text-white"
            opacity="0.05"
          />
          <path
            d="M0,500 Q250,450 500,500 T1000,500 L1000,1000 L0,1000 Z"
            fill="currentColor"
            className="text-white"
            opacity="0.05"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-[900px] mx-auto">
          {/* Header */}
          <div className="mb-8 lg:mb-12">
            <p className="text-xs lg:text-sm font-medium text-white/70 uppercase tracking-wider mb-3">
              REQUEST FOR QUOTE
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
              {headingLine1} {headingLine2}
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  required
                  className="pl-10 h-12 bg-white border-0 rounded-lg text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Company Name */}
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  required
                  className="pl-10 h-12 bg-white border-0 rounded-lg text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="pl-10 h-12 bg-white border-0 rounded-lg text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Select Country */}
              <Select name="country" required>
                <SelectTrigger className="h-12 bg-white border-0 rounded-lg text-gray-900">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country.toLowerCase()}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Phone Number with Country Code */}
              <div className="flex gap-2">
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="w-24 h-12 bg-white border-0 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((cc) => (
                      <SelectItem key={cc.code} value={cc.code}>
                        {cc.flag} {cc.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="(555) 000-0000"
                  required
                  className="flex-1 h-12 bg-white border-0 rounded-lg text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* File Upload */}
              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  name="files"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-2 h-12 px-4 bg-white border-0 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <Upload className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {fileName || 'Upload your files (optional)'}
                  </span>
                </label>
              </div>
            </div>

            {/* Service Type Selection */}
            <div className="space-y-4">
              <h3 className="text-lg lg:text-xl font-medium text-white">
                What type of service do you need?
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {serviceTypes.map((service) => (
                  <div key={service.id} className="flex items-start gap-3">
                    <Checkbox
                      id={service.id}
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={() => handleServiceToggle(service.id)}
                      className="mt-1 border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-[#3E4C5E]"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={service.id}
                        className="text-base font-medium text-white cursor-pointer"
                      >
                        {service.label}
                      </Label>
                      <p className="text-sm text-white/60 mt-1">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What You Need */}
            <div className="space-y-4">
              <h3 className="text-lg lg:text-xl font-medium text-white">What you need?</h3>
              <Textarea
                name="message"
                placeholder="Write Here"
                required
                rows={6}
                className="bg-white border-0 rounded-xl text-gray-900 placeholder:text-gray-400 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-start">
              <Button
                type="submit"
                size="lg"
                className="h-12 px-8 text-base font-semibold rounded-lg min-w-[160px]"
              >
                Confirm
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
