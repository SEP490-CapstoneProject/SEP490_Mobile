import AchievementBlock from "../blocks/achievements/achievementBlock";
import ActivityBlock from "../blocks/activities/activityBlock";
import CertificateBlock from "../blocks/certificate/certificateBlock";
import EducationBlock from "../blocks/education/educationBlock";
import ExperienceBlock from "../blocks/experience/experienceBlock";
import IntroBlock from "../blocks/intro/introBlock";
import OtherBlock from "../blocks/other/otherBlock";
import ProjectBlock from "../blocks/project/projectBlock";
import ReferenceBlock from "../blocks/references/referenceBlock";
import SkillBlock from "../blocks/skill/skillBlock";

export default function BlockRenderer({ block }: { block: any }) {
  const { type, variant, data } = block;

  switch (type) {
    case "INTRO":
      return <IntroBlock data={data} variant={variant} />;
    case "SKILL":
      return <SkillBlock data={data} variant={variant} />;
    case "EDUCATION":
      return <EducationBlock data={data} variant={variant} />;
    case "CERTIFICATE":
      return <CertificateBlock data={data} variant={variant} />;
    case "EXPERIENCE":
      return <ExperienceBlock data={data} variant={variant} />;
    case "PROJECT":
      return <ProjectBlock data={data} variant={variant} />;
    case "ACHIEVEMENT":
      return <AchievementBlock data={data} variant={variant} />;
    case "ACTIVITY":
      return <ActivityBlock data={data} variant={variant} />;
    case "OTHER":
      return <OtherBlock data={data} variant={variant} />;
    case "REFERENCE":
      return <ReferenceBlock data={data} variant={variant} />;
    default:
      return null;
  }
}
