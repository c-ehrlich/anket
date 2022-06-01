import { Paper } from "@mantine/core";

export default function LegendContainerPieChart({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Paper
      radius='md'
      style={{
        position: 'absolute',
        bottom: '12px',
        right: '4px',
        margin: '8px',
        padding: '8px',
        boxShadow: '1px 1px 10px -4px',
      }}
    >
      <div className='title'>{title}</div>
      {children}
      <style jsx>{`
        .title {
          font-size: 16px;
          margin-bottom: 10px;
          font-weight: 300;
        }
      `}</style>
    </Paper>
  );
}