import BlockRenderer from "./blockRenderer";

type Portfolio = {
  blocks: any[];
};

export default function PortfolioRenderer({ blocks }: Portfolio) {
  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <>
      {sortedBlocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
}
