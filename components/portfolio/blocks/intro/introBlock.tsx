import IntroOne from "./introOne";

type Props = {
  data: any;
  variant: string;
};

export default function IntroBlock({ data, variant }: Props) {
  switch (variant) {
    case "INTROONE":
      return <IntroOne data={data} />;

    default:
      return null;
  }
}
