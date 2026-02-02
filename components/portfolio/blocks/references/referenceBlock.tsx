import ReferenceOne from "./referenceOne";

type Props = {
  data: any;
  variant: string;
};

export default function ReferenceBlock({ data, variant }: Props) {
  switch (variant) {
    case "REFERENCEONE":
      return <ReferenceOne data={data} />;

    default:
      return null;
  }
}
