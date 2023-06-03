import React, { useRef, useEffect, useState, forwardRef } from "react";

const containerDefaultProps = {
  style: {
    height: 100,
    width: 200,
    border: "1px solid lightgray",
  },
};
const canvasDefaultProps = {
  style: {
    height: "100%",
    width: "100%",
  },
};
const buttonDefaultProps = {
  show: true,
  title: "Save",
  style: {
    minHeight: 48,
    minWidth: 100,
    borderRadius: 4,
    border: "1px solid #3cb043",
    background: "white",
    fontSize: 20,
    fontWeight: 500,
  },
};
export const Draw = forwardRef(
  (
    {
      containerProps = containerDefaultProps,
      canvasProps = canvasDefaultProps,
    },
    canvasRef
  ) => {
    const divRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [strokes, setStrokes] = useState([]);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const startDrawing = (event) => {
        const { offsetX, offsetY } = getCoordinates(event, canvas);
        setIsDrawing(true);
        setStrokes((prevStrokes) => [
          ...prevStrokes,
          [{ x: offsetX, y: offsetY }],
        ]);
      };

      const draw = (event) => {
        if (!isDrawing) return;

        const { offsetX, offsetY } = getCoordinates(event, canvas);
        setStrokes((prevStrokes) => {
          const lastStroke = prevStrokes[prevStrokes.length - 1];
          return [
            ...prevStrokes.slice(0, -1),
            [...lastStroke, { x: offsetX, y: offsetY }],
          ];
        });
        redraw();
      };

      const stopDrawing = () => {
        setIsDrawing(false);
      };

      const getCoordinates = (event, element) => {
        const rect = element.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        return { offsetX, offsetY };
      };

      const redraw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        strokes.forEach((stroke) => {
          ctx.beginPath();
          stroke.forEach(({ x, y }, index) => {
            if (index === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          });
          ctx.stroke();
        });
      };

      const handleResize = () => {
        canvas.width = divRef.current.clientWidth;
        canvas.height = divRef.current.clientHeight;
        redraw();
      };
      handleResize();

      canvas.addEventListener("mousedown", startDrawing);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseup", stopDrawing);
      canvas.addEventListener("mouseout", stopDrawing);

      // Clean up event listener on component unmount
      return () => {
        canvas.removeEventListener("mousedown", startDrawing);
        canvas.removeEventListener("mousemove", draw);
        canvas.removeEventListener("mouseup", stopDrawing);
        canvas.removeEventListener("mouseout", stopDrawing);
      };
    }, [isDrawing, strokes]);
    return (
      <div ref={divRef} {...containerProps}>
        <canvas ref={canvasRef} {...canvasProps} />
      </div>
    );
  }
);
