import AwardOne from "./awardOne";

type Props = {
  data: any;
  variant: string;
};

export default function AwardBlock({ data, variant }: Props) {
  switch (variant) {
    case "AWARDONE":
      return <AwardOne data={data} />;

    default:
      return null;
  }
}
