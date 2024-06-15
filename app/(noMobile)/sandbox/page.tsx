"use client";
import { PageHeader, PageHeaderHeading } from "@/app/_components/PageHeader";
import { RefObject, useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeRendererOptions {
  width?: number;
  height?: number;
  ref: RefObject<HTMLDivElement>;
}

export class ThreeRenderer {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  constructor({ width = 800, height = 800, ref }: ThreeRendererOptions) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    // this.renderer.shadowMap.enabled = true;
    ref.current?.appendChild(this.renderer.domElement);

    // const geometry = new THREE.BoxGeometry();
    // const material =
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(),
      // new THREE.MeshPhongMaterial({ color: 0x00ff00 })
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    );

    // cube.receiveShadow = true;
    cube.name = "cube";
    this.scene.add(cube);

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // directionalLight.position.set(5, 0, 5);
    // directionalLight.castShadow = true;
    // directionalLight.shadow.mapSize.width = 1024;
    // directionalLight.shadow.mapSize.height = 1024;
    // directionalLight.shadow.camera.near = 0.5;
    // directionalLight.shadow.camera.far = 500;
    // directionalLight.shadow.camera.left = -50;
    // directionalLight.shadow.camera.right = 50;
    // directionalLight.shadow.camera.top = 50;
    // directionalLight.shadow.camera.bottom = -50;
    // this.scene.add(directionalLight);

    // const ambientLight = new THREE.AmbientLight(0x707070);
    // this.scene.add(ambientLight);
  }

  public loop(): void {
    const renderScene = () => {
      const cube = this.scene.getObjectByName("cube");
      if (cube) {
        cube.rotation.x += 0.02;
        cube.rotation.y += 0.01;
      }

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(renderScene);
    };

    renderScene();
  }
}

export default function Sandbox() {
  const ref = useRef<HTMLDivElement>(null);

  const width = 800;
  const height = 800;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const renderer = new ThreeRenderer({ width, height, ref });
      renderer.loop();

      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <main className="container relative">
      <PageHeader>
        <PageHeaderHeading className="block">Sandbox</PageHeaderHeading>
      </PageHeader>
      <section
        ref={ref}
        className="z-30 flex flex-wrap justify-center gap-x-2 gap-y-4"
      />
    </main>
  );
}
