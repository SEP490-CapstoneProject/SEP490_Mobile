import SkillOne from "./skillOne";
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
    default:
      return null;
  }
}
