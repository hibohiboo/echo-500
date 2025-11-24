import mermaid from 'mermaid';
import { onMount } from 'solid-js';

interface MermaidProps {
  chart: string;
}

function Mermaid(props: MermaidProps) {
  let containerRef: HTMLDivElement | undefined;

  onMount(() => {
    const renderChart = async (): Promise<void> => {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
        },
      });

      if (containerRef) {
        const chartId = `mermaid-chart-${crypto.randomUUID()}`;
        const { svg } = await mermaid.render(chartId, props.chart);
        containerRef.innerHTML = svg;
      }
    };

    renderChart().catch((error: Error) => {
      console.error('Failed to render mermaid chart:', error);
    });
  });

  return <div ref={containerRef} />;
}

export default Mermaid;
