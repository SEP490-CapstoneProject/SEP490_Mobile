import AchievementOne from "./achievementOne";

type Props = {
  data: any;
  variant: string;
};

export default function AchievementBlock({ data, variant }: Props) {
  switch (variant) {
    case "ACHIEVEMENTONE":
      return <AchievementOne data={data} />;

    default:
      return null;
  }
}
