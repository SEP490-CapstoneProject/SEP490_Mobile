import ResearchOne from "./researchOne";

type Props = {
  data: any;
  variant: string;
};

export default function ResearchBlock({ data, variant }: Props) {
  switch (variant) {
    case "RESEARCHONE":
      return <ResearchOne data={data} />;
    default:
      return null;
  }
}
