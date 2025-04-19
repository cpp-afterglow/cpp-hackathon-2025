import React from "react";
import { ResponsiveLine } from "@nivo/line";

const GraphDisplay = ({ graphData }) => {
  if (!graphData.length) return <div className="graph-placeholder">Currently None Selected</div>;

  return (
    <div style={{ height: "100%" }}>
      <ResponsiveLine
        data={graphData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
        axisLeft={{ legend: "value", legendOffset: -40 }}
        axisBottom={{ legend: "date", legendOffset: 36 }}
        pointSize={10}
        pointBorderWidth={2}
        enableSlices="x"
        useMesh={true}
      />
    </div>
  );
};

export default GraphDisplay;
