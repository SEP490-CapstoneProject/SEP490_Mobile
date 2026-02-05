import EducationOne from "./educationOne";
import EducationTwo from "./educationTwo";

type Props = {
  data: any;
  variant: string;
};

export default function EducationBlock({ data, variant }: Props) {
  switch (variant) {
    case "EDUCATIONONE":
      return <EducationOne data={data} />;
    case "EDUCATIONTWO":
      return <EducationTwo data={data} />;
    default:
      return null;
  }
}
