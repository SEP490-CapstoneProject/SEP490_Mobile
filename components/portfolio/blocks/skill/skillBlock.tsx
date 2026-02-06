import SkillOne from "./skillOne";
import SkillThree from "./skillThree";
import SkillTwo from "./skillTwo";

type Props = {
  data: any;
  variant: string;
};

export default function SkillBlock({ data, variant }: Props) {
  switch (variant) {
    case "SKILLONE":
      return <SkillOne data={data} />;
    case "SKILLTWO":
      return <SkillTwo data={data} />;
    case "SKILLTHREE":
      return <SkillThree data={data} />;
    default:
      return null;
  }
}
