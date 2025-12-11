/// <reference types="@react-three/fiber" />

export {};

declare module '*.glb';
declare module '*.png';

declare module 'meshline' {
  import { BufferGeometry, Material } from 'three';
  
  export class MeshLineGeometry extends BufferGeometry {
    setPoints(points: number[] | Float32Array): void;
  }
  
  export class MeshLineMaterial extends Material {
    color?: string | number;
    depthTest?: boolean;
    resolution?: [number, number];
    useMap?: boolean;
    map?: any;
    repeat?: [number, number];
    lineWidth?: number;
  }
}

declare module '@react-three/fiber' {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: {
        ref?: React.Ref<any>;
        [key: string]: any;
      };
      meshLineMaterial: {
        color?: string | number;
        depthTest?: boolean;
        resolution?: [number, number];
        useMap?: boolean;
        map?: any;
        repeat?: [number, number];
        lineWidth?: number;
        ref?: React.Ref<any>;
        [key: string]: any;
      };
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: {
        ref?: React.Ref<any>;
        [key: string]: any;
      };
      meshLineMaterial: {
        color?: string | number;
        depthTest?: boolean;
        resolution?: [number, number];
        useMap?: boolean;
        map?: any;
        repeat?: [number, number];
        lineWidth?: number;
        ref?: React.Ref<any>;
        [key: string]: any;
      };
    }
  }
}

