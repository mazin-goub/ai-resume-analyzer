import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { AIResponseFormat } from "~/constants";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";
import type { Route } from "./+types/upload";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumind | Upload Resume" },
    { name: "description", content: "Upload your resume to get feedback" },
  ];
}

const UploadPage = () => {
  const { auth, isLoading, error, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [statusText, setStatusText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/upload");
    }
  }, [isLoading]);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;
    if (!file) {
      return;
    }
    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setStatusText("Uploading the file...");
    const uploadedFile = await fs.upload([file]);

    if (!uploadedFile) {
      setStatusText("Error: Failed to upload file");
      return;
    }

    setStatusText("Converting to image...");
    const imageFile = await convertPdfToImage(file);

    if (!imageFile.file) {
      setStatusText("Error: Failed to convert PDF to image");
      return;
    }

    setStatusText("Uploading the image...");
    const uploadedImage = await fs.upload([imageFile.file]);

    if (!uploadedImage) {
      setStatusText("Error: Failed to upload image");
      return;
    }

    setStatusText("Preparing data...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName: companyName,
      jobTitle: jobTitle,
      jobDescription: jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analyzing...");
    const feedback = await ai.feedback(
      uploadedFile.path,
      `You are an expert in ATS (Applicant Tracking System) and resume analysis.
      Please analyze and rate this resume and suggest how to improve it.
      The rating can be low if the resume is bad.
      Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
      If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
      If available, use the job description for the job user is applying to to give more detailed feedback.
      If provided, take the job description into consideration.
      The job title is: ${jobTitle}
      The job description is: ${jobDescription}
      Provide the feedback using the following format:
      ${AIResponseFormat}
      Return the analysis as an JSON object, without any other text and without the backticks.
      Do not include any other text or comments.`
    );

    if (!feedback) {
      setStatusText("Error: Failed to analyze resume");
      return;
    }

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;
    data.feedback = JSON.parse(feedbackText);

    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analysis complete, redirecting...");
    navigate(`/resume/${uuid}`);
  };

  return (
    <main className="bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full" />
            </>
          ) : (
            <h2>Drop your resume for an ATS score and improvement tips.</h2>
          )}
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="Company Name"
                  id="company-name"
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="Job Title"
                  id="job-title"
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  name="job-description"
                  id="job-description"
                  placeholder="Job Description"
                  rows={5}
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-description">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              {file && (
                <button className="primary-button" type="submit">
                  Save & Analyze Resume
                </button>
              )}
            </form>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-dark-300">
        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-purple-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="font-semibold text-white mb-2">Secure & Private</h3>
          <p className="text-gray-400 text-sm">Your data is encrypted and never shared</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-purple-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-white mb-2">Instant Results</h3>
          <p className="text-gray-400 text-sm">Get detailed feedback in seconds</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-purple-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-white mb-2">Actionable Insights</h3>
          <p className="text-gray-400 text-sm">Clear recommendations to improve your resume</p>
        </div>
      </div>
      <br /><br />
    </main>
  );
};

export default UploadPage;
