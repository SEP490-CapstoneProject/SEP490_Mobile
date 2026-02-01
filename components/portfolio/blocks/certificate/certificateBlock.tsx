import CertificateOne from "./certificateOne";

type Props = {
  data: any;
  variant: string;
};

export default function CertificateBlock({ data, variant }: Props) {
  switch (variant) {
    case "CERTIFICATEONE":
      return <CertificateOne data={data} />;

    default:
      return null;
  }
}
