import ExperimentOne from "./experimentOne";

type Props = {
  data: any;
  variant: string;
};

export default function ExperimentBlock({ data, variant }: Props) {
  switch (variant) {
    case "EXPERIMENTONE":
      return <ExperimentOne data={data} />;

    default:
      return null;
  }
}
