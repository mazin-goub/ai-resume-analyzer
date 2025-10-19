import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "~/components/feebdack/ATS";
import Details from "~/components/feebdack/Details";
import Summary from "~/components/feebdack/Summary";
import { usePuterStore } from "~/lib/puter";
import type { Route } from "./+types/resume";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumind | Resume Review" },
    { name: "description", content: "A detailed overview of your resume" },
  ];
}

const ResumePage = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const { auth, isLoading, fs, kv } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;
      const data = JSON.parse(resume);
      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;
      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);
      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);
      setFeedback(data.feedback);
    };
    loadResume();
  }, [id]);

  return (
    <main className="min-h-screen bg-gradient">
      {/* Modern Sticky Header */}
      <nav className="resume-nav bg-glass border-b border-glass-border backdrop-blur-xl sticky top-0 z-50">
        <Link
          to="/"
          className="back-button group hover:bg-purple-100/10 hover:border-purple-100/30 transition-all duration-300"
        >
          <svg className="w-4 h-4 text-gray-400 group-hover:text-purple-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-gray-300 group-hover:text-white text-sm font-semibold transition-colors">
            Back to Dashboard
          </span>
        </Link>

        {/* Status Indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-300 rounded-full border border-dark-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Analysis Complete</span>
          </div>
        </div>
      </nav>

      {/* Main Content Grid */}
      <div className="flex flex-row w-full max-lg:flex-col">
        {/* Resume Preview Panel - Sticky Glass Effect */}
        <section className="feedback-section lg:h-screen sticky top-20 lg:top-0 flex items-start justify-center py-8">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-700 w-full max-w-2xl">
              {/* Preview Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Resume Preview</h3>
                <a
                  href={resumeUrl}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-100/10 hover:bg-purple-100/20 border border-purple-100/20 rounded-lg text-purple-100 text-sm font-medium transition-all duration-300 hover:shadow-glow"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open Original
                </a>
              </div>

              {/* Preview Container */}
              <div className="relative group">
                {/* Gradient Border Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-100 to-purple-300 rounded-2xl opacity-20 blur transition-all duration-500 group-hover:opacity-40"></div>

                {/* Glass Container */}
                <div className="relative bg-glass border border-glass-border rounded-xl overflow-hidden backdrop-blur-sm">
                  <img
                    src={imageUrl}
                    className="w-full h-auto max-h-[75vh] object-contain transform group-hover:scale-105 transition-transform duration-700"
                    alt="Resume preview"
                  />

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-100/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Feedback Panel - Scrollable */}
        <section className="feedback-section py-8 max-lg:px-4">
          {/* Header with Score Badge */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-5xl max-sm:text-3xl font-bold text-white mb-2">
                Resume Analysis
              </h2>
              <p className="text-gray-400 text-lg">
                AI-powered insights to improve your resume
              </p>
            </div>

            {feedback?.ATS?.score && (
              <div className="flex flex-col items-end">
                <div className="text-2xl font-bold text-white">Overall Score</div>
                <div className="text-4xl font-bold text-gradient bg-gradient-to-r from-purple-100 to-purple-300">
                  {Math.round(feedback.ATS.score)}%
                </div>
              </div>
            )}
          </div>

          {feedback ? (
            <div className="space-y-8 animate-in fade-in duration-700">
              {/* Summary Section */}
              <div className="transform hover:scale-[1.01] transition-transform duration-300">
                <Summary feedback={feedback} />
              </div>

              {/* ATS Score Section */}
              <div className="transform hover:scale-[1.01] transition-transform duration-300">
                <ATS
                  score={feedback.ATS.score || 0}
                  suggestions={feedback.ATS.tips || []}
                />
              </div>

              {/* Detailed Analysis */}
              <div className="transform hover:scale-[1.01] transition-transform duration-300">
                <Details feedback={feedback} />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-8 border-t border-dark-300">
                <Link to='/' className="flex-1 bg-purple-100 hover:bg-purple-200 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-glow text-center">
                  Return to Dashboard
                </Link>
                <Link
                  to="/upload"
                  className="flex-1 bg-dark-300 hover:bg-dark-400 border border-dark-400 text-white font-semibold py-4 px-6 rounded-xl text-center transition-all duration-300"
                >
                  Analyze Another Resume
                </Link>
              </div>
            </div>
          ) : (
            /* Loading State */
            <div className="flex flex-col items-center justify-center py-16 space-y-8">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-100 to-purple-300 rounded-full animate-pulse flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="absolute inset-0 border-4 border-transparent border-t-purple-100 rounded-full animate-spin"></div>
              </div>
              <div className="text-center space-y-3">
                <h3 className="text-2xl font-semibold text-white">Analyzing Your Resume</h3>
                <p className="text-gray-400">Our AI is carefully reviewing your resume for optimization opportunities...</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ResumePage;
