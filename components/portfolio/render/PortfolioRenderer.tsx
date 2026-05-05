import BlockRenderer from "./BlockRenderer";

type Portfolio = {
  blocks: any[];
  rank?: number;
};

export default function PortfolioRenderer({ blocks, rank }: Portfolio) {
  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <>
      {sortedBlocks.map((block) => (
        <BlockRenderer key={block.id} block={block} rank={rank} />
      ))}
    </>
  );
}
