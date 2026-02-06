import ActivityBlock from "../blocks/activities/activityBlock";
import AwardBlock from "../blocks/award/awardBlock";
import DiplomaBlock from "../blocks/diploma/diplomaBlock";
import EducationBlock from "../blocks/education/educationBlock";
import ExperimentBlock from "../blocks/experiment/experimentBlock";
import IntroBlock from "../blocks/intro/introBlock";
import OtherBlock from "../blocks/other/otherBlock";
import ProjectBlock from "../blocks/project/projectBlock";
import ReferenceBlock from "../blocks/references/referenceBlock";
import ResearchBlock from "../blocks/research/researchBLock";
import SkillBlock from "../blocks/skill/skillBlock";
import TeachingBlock from "../blocks/teaching/teachingBlock";

export default function BlockRenderer({ block }: { block: any }) {
  const { type, variant, data } = block;
  switch (type) {
    case "INTRO":
      return <IntroBlock data={data} variant={variant} />;
    case "SKILL":
      return <SkillBlock data={data} variant={variant} />;
    case "EDUCATION":
      return <EducationBlock data={data} variant={variant} />;
    case "DIPLOMA":
      return <DiplomaBlock data={data} variant={variant} />;
    case "EXPERIMENT":
      return <ExperimentBlock data={data} variant={variant} />;
    case "PROJECT":
      return <ProjectBlock data={data} variant={variant} />;
    case "AWARD":
      return <AwardBlock data={data} variant={variant} />;
    case "ACTIVITIES":
      return <ActivityBlock data={data} variant={variant} />;
    case "OTHERINFO":
      return <OtherBlock data={data} variant={variant} />;
    case "REFERENCE":
      return <ReferenceBlock data={data} variant={variant} />;
    case "RESEARCH":
      return <ResearchBlock data={data} variant={variant} />;
    case "TEACHING":
      return <TeachingBlock data={data} variant={variant} />;
    default:
      return null;
  }
}
