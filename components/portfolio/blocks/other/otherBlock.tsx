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
    case "OTHERSIX":
      return <OtherSix data={data} />;
    case "OTHERSEVEN":
      return <OtherSeven data={data} />;
    default:
      return null;
  }
}
