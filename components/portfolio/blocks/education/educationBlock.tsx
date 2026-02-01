import EducationOne from "./educationOne";

type Props = {
  data: any;
  variant: string;
};

export default function EducationBlock({ data, variant }: Props) {
  switch (variant) {
    case "EDUCATIONONE":
      return <EducationOne data={data} />;

    default:
      return null;
  }
}
