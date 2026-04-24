import IntroFive from "./introFive";
import IntroFour from "./introFour";
import IntroOne from "./introOne";
import IntroThree from "./introThree";
import IntroTwo from "./introTwo";

export default function IntroBlock({ data, variant, rank }: any) {
  switch (variant) {
    case "INTROONE":
      return <IntroOne data={data} rank={rank} />;
    case "INTROTWO":
      return <IntroTwo data={data} rank={rank} />;
    case "INTROTHREE":
      return <IntroThree data={data} rank={rank} />;
    case "INTROFOUR":
      return <IntroFour data={data} rank={rank} />;
    case "INTROFIVE":
      return <IntroFive data={data} rank={rank} />;
    default:
      return null;
  }
}
