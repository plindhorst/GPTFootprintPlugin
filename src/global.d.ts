import { SFC, SVGProps } from "react";

declare module "*.svg" {
  export const ReactComponent: SFC<SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.json" {
  const content: string;
  export default content;
}
