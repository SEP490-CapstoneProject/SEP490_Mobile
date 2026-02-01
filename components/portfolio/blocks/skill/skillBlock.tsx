import SkillOne from "./skillOne";

type Props = {
  data: any;
  variant: string;
};

export default function SkillBlock({ data, variant }: Props) {
  switch (variant) {
    case "SKILLONE":
      return <SkillOne data={data} />;

    default:
      return null;
  }
}
