import ProjectOne from "./projectOne";
import ProjectThree from "./projectThree";
import ProjectTwo from "./projectTwo";

type Props = {
  data: any;
  variant: string;
};

export default function ProjectBlock({ data, variant }: Props) {
  switch (variant) {
    case "PROJECTONE":
      return <ProjectOne data={data} />;
    case "PROJECTTWO":
      return <ProjectTwo data={data} />;
    case "PROJECTTHREE":
      return <ProjectThree data={data} />;
    default:
      return null;
  }
}
