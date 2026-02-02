import Hobby from "./otherOne";

type Props = {
  data: any;
  variant: string;
};

export default function OtherBlock({ data, variant }: Props) {
  switch (variant) {
    case "OTHERONE":
      return <Hobby data={data} />;

    default:
      return null;
  }
}
