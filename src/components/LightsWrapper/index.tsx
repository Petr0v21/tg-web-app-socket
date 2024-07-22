import { CSSProperties } from "react";
import Image from "next/image";
import LightSvg from "../../../public/background/light.svg";
import "./index.css";
import { LightProps, LightsWrapperProps } from "@/utils/types";

const calculateStyles = ({ index, l }: LightProps): CSSProperties => {
  const size = (Math.floor(Math.random() * 128) + 82) * index * 0.1;
  const styles: CSSProperties = {
    height: size,
    width: size,
    opacity: index > index - 3 ? Math.random() * (1 - 0.3) : 0,
    top: (index + 1) * 45,
    animation: `float 3.5s ${
      Math.random() * (2.5 - 1) + 1
    }s ease-in-out infinite`,
  };
  switch (index) {
    case 0:
    case 1:
    case l - 1:
      index % 2
        ? (styles.left = `${Math.random() * (35 - 30) + 30}%`)
        : (styles.right = `${Math.random() * (35 - 30) + 30}%`);
      break;
    default:
      index % 2
        ? (styles.left = `${Math.random() * (25 - 10)}%`)
        : (styles.right = `${Math.random() * (25 - 10)}%`);
  }
  return styles;
};

export const Light: React.FC<LightProps> = (props) => (
  <Image
    alt="light"
    src={LightSvg}
    height={64}
    width={64}
    className="light"
    style={calculateStyles(props)}
  />
);

const LightsWrapper: React.FC<LightsWrapperProps> = ({
  children,
  lightNumber,
}) => {
  return (
    <div className="light-wrapper">
      {Array.from({ length: lightNumber }).map((_, index) => (
        <Light key={index} index={index} l={lightNumber} />
      ))}

      {children}
    </div>
  );
};

export default LightsWrapper;
