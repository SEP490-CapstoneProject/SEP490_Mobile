import TeachingOne from "./teachingOne";

type Props = {
  data: any;
  variant: string;
};

export default function TeachingBlock({ data, variant }: Props) {
  switch (variant) {
    case "TEACHINGONE":
      return <TeachingOne data={data} />;
    default:
      return null;
  }
}
