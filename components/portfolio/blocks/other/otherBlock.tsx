import OtherEight from "./otherEight";
import OtherFive from "./otherFive";
import OtherFour from "./otherFour";
import Hobby from "./otherOne";
import OtherSeven from "./otherSeven";
import OtherSix from "./otherSix";
import OtherThree from "./otherThree";
import OtherTwo from "./otherTwo";

type Props = {
  data: any;
  variant: string;
};

export default function OtherBlock({ data, variant }: Props) {
  switch (variant) {
    case "OTHERONE":
      return <Hobby data={data} />;
    case "OTHERTWO":
      return <OtherTwo data={data} />;
    case "OTHERTHREE":
      return <OtherThree data={data} />;
    case "OTHERFOUR":
      return <OtherFour data={data} />;
    case "OTHERFIVE":
      return <OtherFive data={data} />;
    case "OTHERSIX":
      return <OtherSix data={data} />;
    case "OTHERSEVEN":
      return <OtherSeven data={data} />;
    case "OTHEREIGHT":
      return <OtherEight data={data} />;
    default:
      return null;
  }
}
