import ActivityOne from "./activityOne";

type Props = {
  data: any;
  variant: string;
};

export default function ActivityBlock({ data, variant }: Props) {
  switch (variant) {
    case "ACTIVITYONE":
      return <ActivityOne data={data} />;

    default:
      return null;
  }
}
