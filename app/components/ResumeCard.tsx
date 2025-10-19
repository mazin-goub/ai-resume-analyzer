import { useEffect, useState } from "react";
import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({ resume }: { resume: Resume }) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(resume.imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };
    loadResume();
    setScore(resume.feedback.overallScore);
  }, [resume.imagePath]);
  return (
    <Link
      to={`/resume/${resume.id}`}
      className="resume-card animate-in fade-in duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Header with improved layout */}
      <div className="resume-card-header">
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          {resume.companyName && (
            <h2 className="font-bold text-xl text-white group-hover:text-purple-100 transition-colors duration-300 truncate">
              {resume.companyName}
            </h2>
          )}
          {resume.jobTitle && (
            <h3 className="text-lg text-gray-400 group-hover:text-gray-300 transition-colors duration-300 truncate">
              {resume.jobTitle}
            </h3>
          )}
          {!resume.companyName && !resume.jobTitle && (
            <h2 className="text-xl font-bold text-white group-hover:text-purple-100 transition-colors duration-300">
              Resume Review
            </h2>
          )}

          {/* Metadata row */}


        </div>

        {/* Score with enhanced presentation */}
        <div className="flex-shrink-0 relative">
          <div className="absolute -inset-2 bg-purple-100/10 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
          <ScoreCircle score={score} />
        </div>
      </div>

      {/* Resume preview with modern frame */}
      {resumeUrl && (
        <div className="relative group/image">
          {/* Gradient border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-100 to-purple-300 rounded-2xl opacity-20 group-hover:opacity-40 blur transition-all duration-300"></div>

          {/* Main image container */}
          <div className="relative bg-dark-300 rounded-xl overflow-hidden border border-dark-400">
            <div className="absolute inset-0 bg-gradient-to-t from-dark-200/80 to-transparent z-10"></div>

            {/* Resume image */}
            <img
              src={resumeUrl}
              alt="Resume preview"
              className="w-full h-[300px] max-sm:h-[200px] object-cover object-top transform group-hover/image:scale-105 transition-transform duration-500"
            />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-purple-100/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-black/60 rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Status indicator */}
          <div className="absolute top-4 right-4 z-20">
            <div className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${score >= 80 ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
              score >= 60 ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}>
              {score >= 80 ? 'Strong' : score >= 60 ? 'Moderate' : 'Needs Work'}
            </div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
