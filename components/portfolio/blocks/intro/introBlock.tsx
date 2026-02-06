import IntroFive from "./introFive";
import IntroFour from "./introFour";
import IntroOne from "./introOne";
import IntroThree from "./introThree";
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
    case "INTROTHREE":
      return <IntroThree data={data} />;
    case "INTROFOUR":
      return <IntroFour data={data} />;
    case "INTROFIVE":
      return <IntroFive data={data} />;
    default:
      return null;
  }
}
