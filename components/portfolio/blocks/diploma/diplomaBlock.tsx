import DiplomaOne from "./diplomaOne";

type Props = {
  data: any;
  variant: string;
};

export default function DiplomaBlock({ data, variant }: Props) {
  switch (variant) {
    case "DIPLOMAONE":
      return <DiplomaOne data={data} />;

    default:
      return null;
  }
}
