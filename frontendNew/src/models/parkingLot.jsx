import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/parking_lot_uf.glb");
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group position={[-176.059, 12.046, 1167.562]} scale={6.607}>
          <group position={[-470.818, 0, -203.534]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.WindowsGlass_Texture_glass_0.geometry}
              material={materials.glass}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.WindowsGlass_Texture_Window_Img_0.geometry}
              material={materials.Window_Img}
            />
          </group>
          <group position={[0, 0, -203.534]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.InnovateHubBuilding_Grey_0.geometry}
              material={materials.Grey}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.InnovateHubBuilding_Window_Img_0.geometry}
              material={materials.Window_Img}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.InnovateHubBuilding_WhiteBright_0.geometry}
              material={materials.WhiteBright}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.InnovateHubBuilding_Brick_0.geometry}
              material={materials.Brick}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.InnovateHubBuilding_Floor_0.geometry}
              material={materials.Floor}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.InnovateHubBuilding_Wall_0.geometry}
              material={materials.Wall}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.HubLogo_Logo_0.geometry}
            material={materials.Logo}
            position={[0, 0, -203.534]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.InnovateLogo1_Logo_0.geometry}
            material={materials.Logo}
            position={[0, 0, -203.534]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lighting_White_0.geometry}
            material={materials.White}
            position={[0, 0, -203.534]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.WindowsGlass_glass_0.geometry}
            material={materials.glass}
            position={[-470.818, 0, -203.534]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ParkingLot_lambert1_0.geometry}
          material={materials.lambert1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ParkingLot_Pave3_0.geometry}
          material={materials.Pave3}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pave_Pave2_0.geometry}
          material={materials.Pave2}
          position={[0, 6.188, 178.318]}
          scale={[1031.301, 6.515, 92.479]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.vegetation_long_grass_04_0.geometry}
          material={materials.long_grass_04}
          position={[-382.337, 21.144, -83.371]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={26.741}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.vegetation1_long_grass_04_0.geometry}
          material={materials.long_grass_04}
          position={[307.487, 21.144, -83.371]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[25.076, 26.741, 26.741]}
        />
        <group
          position={[-194.863, 5.879, -33.777]}
          rotation={[-Math.PI, -0.015, -Math.PI]}
          scale={0.143}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Car_jeep1_Car_Jeep_0.geometry}
            material={materials.Car_Jeep}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Car_jeep1_Default_Material_0.geometry}
            material={materials.Default_Material}
          />
        </group>
        <group position={[-131.119, 5.879, -33.777]} scale={0.143}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Car_jeep_Car_Jeep_0.geometry}
            material={materials.Car_Jeep}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Car_jeep_Default_Material_0.geometry}
            material={materials.Default_Material}
          />
        </group>
        <group position={[-84.642, -2.422, -58.437]} scale={0.116}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ReservedParking_Grey2_0.geometry}
            material={materials.Grey2}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ReservedParking_metal_0.geometry}
            material={materials.metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ReservedParking_reserved_parking_0.geometry}
            material={materials.reserved_parking}
          />
        </group>
        <group position={[-36.838, -2.422, -58.437]} scale={0.116}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ReservedParking1_Grey2_0.geometry}
            material={materials.Grey2}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ReservedParking1_metal_0.geometry}
            material={materials.metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ReservedParking1_reserved_parking_0.geometry}
            material={materials.reserved_parking}
          />
        </group>
        <group position={[6.388, -2.422, -58.437]} scale={0.116}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ReservedParking2_Grey2_0.geometry}
            material={materials.Grey2}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ReservedParking2_metal_0.geometry}
            material={materials.metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ReservedParking2_reserved_parking_0.geometry}
            material={materials.reserved_parking}
          />
        </group>
        <group position={[220.301, 9.889, -110.597]} scale={0.108}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lamp_Brown_0.geometry}
            material={materials.Brown}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lamp_lambert4_0.geometry}
            material={materials.lambert4}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lamp_Grey3_0.geometry}
            material={materials.Grey3}
          />
        </group>
        <group position={[114.83, 9.889, -110.597]} scale={0.108}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lamp1_Brown_0.geometry}
            material={materials.Brown}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lamp1_lambert4_0.geometry}
            material={materials.lambert4}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lamp1_Grey3_0.geometry}
            material={materials.Grey3}
          />
        </group>
        <group position={[-7.895, 9.889, -110.597]} scale={0.108}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lamp2_Brown_0.geometry}
            material={materials.Brown}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lamp2_lambert4_0.geometry}
            material={materials.lambert4}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lamp2_Grey3_0.geometry}
            material={materials.Grey3}
          />
        </group>
        <group position={[-122.577, 9.889, -110.597]} scale={0.108}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lamp3_Brown_0.geometry}
            material={materials.Brown}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lamp3_lambert4_0.geometry}
            material={materials.lambert4}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lamp3_Grey3_0.geometry}
            material={materials.Grey3}
          />
        </group>
        <group position={[-254.317, 9.889, -110.597]} scale={0.108}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lamp4_Brown_0.geometry}
            material={materials.Brown}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lamp4_lambert4_0.geometry}
            material={materials.lambert4}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lamp4_Grey3_0.geometry}
            material={materials.Grey3}
          />
        </group>
        <group position={[-392.654, 9.889, -110.597]} scale={0.108}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lamp5_Brown_0.geometry}
            material={materials.Brown}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lamp5_lambert4_0.geometry}
            material={materials.lambert4}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lamp5_Grey3_0.geometry}
            material={materials.Grey3}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/parking_lot_uf.glb");