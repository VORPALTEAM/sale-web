import React from "react";
import ReactDOMServer from "react-dom/server";
import TokenTopSection from "./tokenTopSection";
import InfoContainer from "./infoContainer";

const MainDiagram = () => {
  const lineWidth = 2;
  const radius = 160;
  const linePrecession = 42;
  const data = [
    {
      value: (50000 / 100000) * 100,
      color: "transparent",
    },
    {
      value: Math.round((8072 / 100000) * 100),
      color: "#FF7A00",
    },
    {
      value: Math.round((10059 / 100000) * 100),
      color: "#CC00FF",
    },
    {
      value: Math.round((31869 / 100000) * 100),
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
          key={`cr_1${Math.random() * 1000000}`}
          cx={(radius + lineWidth / 2) + 40}
          cy={(radius + lineWidth / 2) + 15}
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

  const generateNotes = () => {
    const infoContainers: any[] = [];
    infoContainers.push(
      ReactDOMServer.renderToString(
        <InfoContainer
          h={"AVAILABLE:"}
          d={"30 589 200"}
          addClass={" totalInvestAmount diagramValue"}
        />
      )
    );
    infoContainers.push(
      ReactDOMServer.renderToString(
        <InfoContainer
        h={"YOU GET:"}
        d={"400 000"}
        addClass={" totalInvestAmount diagramValue"}
      />
      )
    );
    infoContainers.push(
      ReactDOMServer.renderToString(
        <InfoContainer
        h={"SOLD:"}
        d={"11 410 800"}
        addClass={" totalInvestAmount diagramValue"}
      />
      )
    );
    return(`
    <foreignObject x=${-60} y=${20} width="160" height="80">
      ${infoContainers[0]}
    </foreignObject>
    <foreignObject x=${-60} y=${280} width="160" height="80">
      ${infoContainers[1]}
    </foreignObject>
    <foreignObject x=${40} y=${330} width="160" height="80">
      ${infoContainers[2]}
    </foreignObject>`)
  };

  return (
    <div className="centralDiagram">
      <svg
        viewBox="-40 0 250 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "20vw",
          height: "40vw",
          maxWidth: 640
        }}
      >
        {generateDiagram()}
        <line
          x1={radius + linePrecession}
          y1="4"
          x2={radius + linePrecession}
          y2="29"
          stroke="#00FFFF"
          strokeWidth={1}
        />
        <line
          x1={radius + linePrecession}
          y1="324"
          x2={radius + linePrecession}
          y2="349"
          stroke="#00FFFF"
          strokeWidth={1}
        />
        <g dangerouslySetInnerHTML={{ __html: generateNotes() }} />
      </svg>
    </div>
  );
};

export default MainDiagram;
