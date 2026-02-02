import ExperienceOne from "./experienceOne";

type Props = {
  data: any;
  variant: string;
};

export default function ExperienceBlock({ data, variant }: Props) {
  switch (variant) {
    case "EXPERIENCEONE":
      return <ExperienceOne data={data} />;

    default:
      return null;
  }
}
