/**
 * File Upload Field Component
 * Handles file uploads with validation and preview
 */

"use client";

import { useState, useRef } from "react";
import { Upload, X, File } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadFieldProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxSize?: number; // in MB
  allowedTypes?: string[];
}

const DEFAULT_ALLOWED_TYPES = [
  "doc",
  "docx",
  "pdf",
  "zip",
  "rar",
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "avif",
  "xls",
  "xlsx",
];

const MAX_FILE_SIZE = 20; // 20MB

export function FileUploadField({
  files,
  onFilesChange,
  maxSize = MAX_FILE_SIZE,
  allowedTypes = DEFAULT_ALLOWED_TYPES,
}: FileUploadFieldProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      return `File size exceeds ${maxSize}MB`;
    }

    // Check file type
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !allowedTypes.includes(fileExtension)) {
      return `File type not allowed. Allowed: ${allowedTypes.join(", ")}`;
    }

    return null;
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles || newFiles.length === 0) return;

    setError("");
    const fileArray = Array.from(newFiles);

    // Validate each file
    for (const file of fileArray) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    // Add new files to existing files
    onFilesChange([...files, ...fileArray]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
    setError("");
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="w-full">
      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        className={cn(
          "relative w-full px-4 py-3 bg-white border-2 border-dashed rounded-lg cursor-pointer transition-all",
          dragActive
            ? "border-primary bg-primary/5"
            : files.length > 0
            ? "border-gray-200 bg-white"
            : "border-gray-200 hover:border-gray-300",
          error && "border-red-500"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleChange}
          accept={allowedTypes.map((type) => `.${type}`).join(",")}
          className="hidden"
        />

        {files.length === 0 ? (
          <div className="flex items-center gap-3 text-gray-500">
            <Upload className="w-5 h-5" />
            <span className="text-sm">Upload your files (optional)</span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-700">
              <Upload className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">
                {files.length} file{files.length > 1 ? "s" : ""} uploaded
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onFilesChange([]);
                setError("");
              }}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <File className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="ml-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* File Requirements */}
      <p className="mt-2 text-xs text-gray-500">
        Max {maxSize}MB. Allowed: {allowedTypes.slice(0, 6).join(", ")}
        {allowedTypes.length > 6 && `, +${allowedTypes.length - 6} more`}
      </p>
    </div>
  );
}
