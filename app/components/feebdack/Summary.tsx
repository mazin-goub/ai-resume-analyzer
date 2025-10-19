import ScoreGauge from "../ScoreGauge";

const ScoreBadge = ({ score }: { score: number }) => {
  const badgeColor =
    score > 69
      ? "bg-green-500/20 border border-green-500/30"
      : score > 49
        ? "bg-yellow-500/20 border border-yellow-500/30"
        : "bg-red-500/20 border border-red-500/30";
  const textColor =
    score > 69
      ? "text-green-400"
      : score > 49
        ? "text-yellow-400"
        : "text-red-400";
  const badgeText =
    score > 69 ? "Strong" : score > 49 ? "Good Start" : "Needs Work";

  return (
    <div className={`score-badge px-3 py-1 rounded-full backdrop-blur-sm ${badgeColor}`}>
      <p className={`text-xs ${textColor} font-semibold`}>{badgeText}</p>
    </div>
  );
};

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 69
      ? "text-green-400"
      : score > 49
        ? "text-yellow-400"
        : "text-red-400";

  return (
    <div className="resume-summary">
      <div className="category bg-dark-200 border border-dark-300">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p className="text-2xl text-white">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-2xl text-white">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-dark-200/50 rounded-2xl border border-dark-300 backdrop-blur-sm w-full">
      <div className="flex flex-row max-sm:flex-col items-center p-4 gap-8">
        <ScoreGauge score={feedback.overallScore} />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-white">Your Resume Score</h2>
          <p className="text-sm text-gray-400">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>
      <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
      <Category title="Content" score={feedback.content.score} />
      <Category title="Structure" score={feedback.structure.score} />
      <Category title="Skills" score={feedback.skills.score} />
    </div>
  );
};

export default Summary;