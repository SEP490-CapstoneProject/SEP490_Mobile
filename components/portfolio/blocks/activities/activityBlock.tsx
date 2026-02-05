import ActivityOne from "./activityOne";
import ActivityTwo from "./activityTwo";

type Props = {
  data: any;
  variant: string;
};

export default function ActivityBlock({ data, variant }: Props) {
  switch (variant) {
    case "ACTIVITYONE":
      return <ActivityOne data={data} />;
    case "ACTIVITYTWO":
      return <ActivityTwo data={data} />;
    default:
      return null;
  }
}
