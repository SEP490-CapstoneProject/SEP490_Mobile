import CertificateBlock from "../blocks/certificate/certificateBlock";
import EducationBlock from "../blocks/education/educationBlock";
import IntroBlock from "../blocks/intro/introBlock";
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
    default:
      return null;
  }
}
