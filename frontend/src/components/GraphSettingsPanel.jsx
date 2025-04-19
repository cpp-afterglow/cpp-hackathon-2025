import React from "react";

const GraphSettingsPanel = ({ students, configs, updateConfig, generateGraph }) => {
  return (
    <div className="graph-settings">
      {configs.map((config, i) => (
        <div className="graph-column" key={i}>
          <select onChange={e => updateConfig(i, "studentId", e.target.value)} value={config.studentId}>
            <option value="all">All Students</option>
            {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <select onChange={e => updateConfig(i, "dateRange", e.target.value)} value={config.dateRange}>
            <option value="all">All Time</option>
            <option value="month">Past Month</option>
            <option value="week">Past Week</option>
            <option value="day">Daily</option>
          </select>
          <select onChange={e => updateConfig(i, "dataType", e.target.value)} value={config.dataType}>
            <option value="score">Total Score</option>
            <option value="mood">Mood Score (Slider)</option>
            <option value="form">Journal Score (Form)</option>
            <option value="color">Mood Color</option>
          </select>
          <select onChange={e => updateConfig(i, "graphType", e.target.value)} value={config.graphType}>
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="box">Box Plot</option>
          </select>
        </div>
      ))}
      <button onClick={generateGraph}>Generate Graph</button>
    </div>
  );
};

export default GraphSettingsPanel;
