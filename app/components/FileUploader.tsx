import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: 20 * 1024 * 1024,
    });

  const file = acceptedFiles[0] ?? null;
  const formatSize = (b: number) =>
    b
      ? `${(b / 1024 ** Math.floor(Math.log(b) / Math.log(1024))).toFixed(2)} ${["Bytes", "KB", "MB", "GB"][Math.floor(Math.log(b) / Math.log(1024))]
      }`
      : "";

  return (
    <div className="w-full">
      <div
        {...getRootProps({
          className: `uploader-drag-area relative overflow-hidden border-2 border-dashed transition-all duration-500 ${isDragActive
              ? "border-purple-100 bg-purple-100/10 shadow-glow"
              : "border-gray-600 hover:border-purple-100 hover:bg-purple-100/5 hover:shadow-glow"
            } rounded-2xl backdrop-blur-sm`,
        })}
      >
        <input {...getInputProps()} />

        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-100/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10 space-y-6 cursor-pointer p-8">
          {/* Animated upload icon */}
          <div className="mx-auto w-20 h-20 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-purple-100/10 rounded-2xl transform rotate-45 transition-transform duration-500 group-hover:rotate-12"></div>
            <div className="relative">
              <svg
                className="w-12 h-12 text-purple-100 transition-transform duration-300 hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
          </div>

          {file ? (
            // Selected file state - Modern card design
            <div
              className="uploader-selected-file bg-dark-300/80 border border-gray-700 rounded-xl p-4 backdrop-blur-sm hover:border-purple-100/50 transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* File type icon with gradient */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-300 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-dark-300"></div>
                  </div>

                  {/* File info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-white truncate max-w-xs">
                      {file.name}
                    </p>
                    <div className="flex items-center space-x-3 mt-1">
                      <p className="text-sm text-gray-400">
                        {formatSize(file.size)}
                      </p>
                      <span className="text-gray-600">•</span>
                      <p className="text-sm text-green-400 font-medium">
                        Ready to upload
                      </p>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileSelect?.(null);
                  }}
                  className="p-2 cursor-pointer hover:bg-red-500/20 rounded-lg transition-all duration-200 group/remove"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover/remove:text-red-400 transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Progress bar for visual interest */}
              <div className="mt-3">
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <div className="bg-gradient-to-r from-purple-100 to-purple-300 h-1 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>
          ) : (
            // Default upload state
            <div className="text-center space-y-3">
              <div>
                <p className="text-xl font-semibold text-white mb-2">
                  {isDragActive ? "Drop your resume here" : "Choose your resume"}
                </p>
                <p className="text-lg text-gray-400">
                  <span className="font-medium text-purple-100">Click to upload</span> or drag and drop
                </p>
                <p className="text-lg text-gray-400">PDF, DOC, DOCX (max. 20MB)</p>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                <span className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-full border border-gray-700">
                  Secure Upload
                </span>
                <span className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-full border border-gray-700">
                  Instant Analysis
                </span>
                <span className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-full border border-gray-700">
                  ATS Optimized
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Floating particles effect */}
        {!file && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-4 left-10 w-2 h-2 bg-purple-100/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 right-12 w-1 h-1 bg-purple-100/20 rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-12 right-16 w-1.5 h-1.5 bg-purple-100/25 rounded-full animate-pulse delay-700"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
