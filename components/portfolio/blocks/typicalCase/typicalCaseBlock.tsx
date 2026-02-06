import TypicalCaseOne from "./typicalCaseOne";

type Props = {
  data: any;
  variant: string;
};

export default function TypicalCaseBlock({ data, variant }: Props) {
  switch (variant) {
    case "TYPICALCASEONE":
      return <TypicalCaseOne data={data} />;
    default:
      return null;
  }
}
