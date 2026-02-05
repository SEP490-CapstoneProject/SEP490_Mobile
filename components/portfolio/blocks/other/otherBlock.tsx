import Hobby from "./otherOne";
import OtherSix from "./otherSix";
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
    case "OTHERSIX":
      return <OtherSix data={data} />;
    default:
      return null;
  }
}
