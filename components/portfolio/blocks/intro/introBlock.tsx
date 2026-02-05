import IntroOne from "./introOne";
import IntroTwo from "./introTwo";

type Props = {
  data: any;
  variant: string;
};

export default function IntroBlock({ data, variant }: Props) {
  switch (variant) {
    case "INTROONE":
      return <IntroOne data={data} />;
    case "INTROTWO":
      return <IntroTwo data={data} />;
    default:
      return null;
  }
}
