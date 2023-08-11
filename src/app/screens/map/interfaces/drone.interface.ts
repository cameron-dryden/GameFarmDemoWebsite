export interface Drone {
  id: string;
  serialNumber: string | null;
  flightStatus: boolean | null;
  satelliteSignal: number | null;
  windStatus: number | null;
  position: {
    altitude: number;
    latitude: number;
    longitude: number;
  };
  velocity: {
    x: number | null;
    y: number | null;
    z: number | null;
  };
}
