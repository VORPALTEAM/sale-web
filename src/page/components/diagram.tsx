import React from "react";

const MainDiagram = () => {
  const lineWidth = 2;
  const radius = 197;
  const data = [
    {
      value: 50,
      color: "transparent",
    },
    {
      value: 10,
      color: "#FF7A00",
    },
    {
      value: 15,
      color: "#CC00FF",
    },
    {
      value: 25,
      color: "#00C2FF",
    },
  ];

  const generateDiagram = () => {
    const sectors = [];
    const circles = [];
    const strokeWidth = lineWidth;
    const startPoint = "top";
    const radiusValue = radius;
    const fullSize = 2 * radiusValue;
    const length = 2 * Math.PI * radius;
    const offsetRatio = {
      top: 0.25,
      right: 0,
      left: 0.5,
      bottom: -0.25,
    };
    const chartOffset = length * offsetRatio[startPoint];
    data.forEach((sectorData, sectorIndex) => {
      // Длина сектора
      const width = (length * sectorData.value) / 100;
      // Смещение сектора от начальной точки
      let offset = chartOffset;

      if (sectorIndex > 0) {
        let prevSector = sectors[sectorIndex - 1];
        offset = prevSector.offset - prevSector.width;
      }

      sectors.push({
        ...sectorData,
        width,
        offset,
      });
    });

    const circle = (sector: (typeof sectors)[0]) => {
      return (
        <circle
          cx={radius + lineWidth / 2}
          cy={radius + lineWidth / 2}
          r={radius}
          strokeDasharray={`${sector.width} ${length - sector.width}`}
          strokeDashoffset={sector.offset}
          stroke={sector.color}
          strokeWidth={lineWidth}
        ></circle>
      );
    };

    sectors.forEach((s) => {
      circles.push(circle(s));
    });

    return circles;
  };

  return (
    <div className="centralDiagram">
      <svg
        viewBox="0 0 250 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "20vw",
          height: "40vw",
          marginLeft: 60,
        }}
      >
        {generateDiagram()}
        <line
          x1={radius + 1}
          y1="-11"
          x2={radius + 1}
          y2="14"
          stroke="#00FFFF"
        />
        <line
          x1={radius + 1}
          y1="382"
          x2={radius + 1}
          y2="407"
          stroke="#00FFFF"
        />
      </svg>
    </div>
  );
};

export default MainDiagram;
