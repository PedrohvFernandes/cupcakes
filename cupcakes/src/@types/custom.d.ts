// Tem que colocar essa configuração aqui também, porque o Vite não reconhece o arquivo custom.d.ts, e por isso da erro de importação de arquivos com alias, como por exemplo: import { ReactComponent as Logo } from '@assets/logo.svg';
// SVG no vite 4.0 é configurado agora no vite.config.ts e aqui tambem ou qualquer d.ts

/// <reference types="vite-plugin-svgr/client" />


// declare module "*.svg" {
//   import * as React from "react";

//   const ReactComponent: React.FunctionComponent<
//     React.SVGProps<SVGSVGElement> & { title?: string }
//   >;

//   export default ReactComponent;
// }

// declare module '*.svg' {
//   import * as React from 'react';

//   export const ReactComponent: React.FunctionComponent<React.SVGProps<
//     SVGSVGElement
//   > & { title?: string }>;

//   const src: string;
//   export default src;
// }

declare module '*.svg?react' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}

// declare module '*.svg?react' {
//   import React = require('react');
//   export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
//   const src: string;
//   export default src;
// }

declare module "\*.jpg" {
  const content: string;
  export default content;
}

declare module "\*.png" {
  const content: string;
  export default content;
}

declare module "\*.json" {
  const content: string;
  export default content;
}