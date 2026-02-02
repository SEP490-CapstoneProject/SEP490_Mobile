import ProjectOne from "./projectOne";

type Props = {
  data: any;
  variant: string;
};

export default function ProjectBlock({ data, variant }: Props) {
  switch (variant) {
    case "PROJECTONE":
      return <ProjectOne data={data} />;

    default:
      return null;
  }
}
