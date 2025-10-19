import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "../Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
        score > 69
          ? "bg-badge-green"
          : score > 39
            ? "bg-badge-yellow"
            : "bg-badge-red"
      )}
    >
      <img
        src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score"
        className="size-4"
      />
      <p
        className={cn(
          "text-sm font-medium",
          score > 69
            ? "text-badge-green-text"
            : score > 39
              ? "text-badge-yellow-text"
              : "text-badge-red-text"
        )}
      >
        {score}/100
      </p>
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row gap-4 items-center py-2">
      <p className="text-2xl font-semibold">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};
const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex flex-col gap-6 items-center w-full">
      {/* Tips Grid - Modern Card Layout */}
      <div className="bg-dark-300/50 w-full rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-4 border border-dark-400 backdrop-blur-sm">
        {tips.map((tip, index) => (
          <div
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 group"
            key={index}
          >
            <div className={cn(
              "p-1.5 rounded-lg flex-shrink-0",
              tip.type === "good"
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
            )}>
              {tip.type === "good" ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
            </div>
            <p className="text-gray-300 group-hover:text-white transition-colors font-medium">
              {tip.tip}
            </p>
          </div>
        ))}
      </div>

      {/* Detailed Explanations */}
      <div className="flex flex-col gap-4 w-full">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={cn(
              "flex flex-col gap-3 rounded-2xl p-6 border backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-[1.02]",
              tip.type === "good"
                ? "bg-green-500/10 border-green-500/20 text-green-300 hover:shadow-lg hover:shadow-green-500/10"
                : "bg-yellow-500/10 border-yellow-500/20 text-yellow-300 hover:shadow-lg hover:shadow-yellow-500/10"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-xl border",
                tip.type === "good"
                  ? "bg-green-500/20 border-green-500/30"
                  : "bg-yellow-500/20 border-yellow-500/30"
              )}>
                {tip.type === "good" ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
              </div>
              <p className="text-xl font-semibold">{tip.tip}</p>
            </div>
            <p className="text-gray-300 leading-relaxed pl-11">{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="Tone & Style"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Skills"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
