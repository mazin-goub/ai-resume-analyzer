import { cn } from "~/lib/utils";

const ATS = ({
  score,
  suggestions,
}: {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl border backdrop-blur-sm p-8 flex flex-col gap-6 transition-all duration-300 hover:transform hover:scale-[1.02]",
        score > 69
          ? "border-green-500/20 bg-green-500/10 shadow-lg shadow-green-500/10"
          : score > 49
            ? "border-yellow-500/20 bg-yellow-500/10 shadow-lg shadow-yellow-500/10"
            : "border-red-500/20 bg-red-500/10 shadow-lg shadow-red-500/10"
      )}
    >
      {/* Header with modern icon and score */}
      <div className="flex items-center gap-4">
        <div className={cn(
          "p-3 rounded-2xl backdrop-blur-sm border",
          score > 69
            ? "bg-green-500/20 border-green-500/30"
            : score > 49
              ? "bg-yellow-500/20 border-yellow-500/30"
              : "bg-red-500/20 border-red-500/30"
        )}>
          {score > 69 ? (
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          ) : score > 49 ? (
            <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-1">ATS Compatibility Score</h3>
          <div className="flex items-center gap-3">
            <div className={cn(
              "text-3xl font-bold",
              score > 69 ? "text-green-400" :
                score > 49 ? "text-yellow-400" :
                  "text-red-400"
            )}>
              {score}/100
            </div>
            <div className={cn(
              "px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border",
              score > 69 ? "bg-green-500/20 text-green-300 border-green-500/30" :
                score > 49 ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" :
                  "bg-red-500/20 text-red-300 border-red-500/30"
            )}>
              {score > 69 ? "Excellent" : score > 49 ? "Moderate" : "Needs Improvement"}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>ATS Compatibility</span>
          <span>{score}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={cn(
              "h-2 rounded-full transition-all duration-1000",
              score > 69 ? "bg-gradient-to-r from-green-400 to-green-500" :
                score > 49 ? "bg-gradient-to-r from-yellow-400 to-yellow-500" :
                  "bg-gradient-to-r from-red-400 to-red-500"
            )}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-3">
        <p className="text-lg font-medium text-white">
          How well does your resume pass through Applicant Tracking Systems?
        </p>
        <p className="text-gray-300 leading-relaxed">
          Your resume was scanned like an employer would. Here's how it performed against automated screening systems:
        </p>
      </div>

      {/* Suggestions */}
      <div className="space-y-4">
        <h4 className="font-semibold text-white text-lg">Key Findings:</h4>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 group"
              key={index}
            >
              <div className={cn(
                "p-1 rounded-lg flex-shrink-0 mt-0.5",
                suggestion.type === "good"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400"
              )}>
                {suggestion.type === "good" ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
              </div>
              <p className="text-gray-300 group-hover:text-white transition-colors leading-relaxed">
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20">
        <p className="text-purple-300 text-center font-medium">
          Want a better score? Apply the suggestions above to optimize your resume for ATS systems.
        </p>
      </div>
    </div>
  );
};

export default ATS;
