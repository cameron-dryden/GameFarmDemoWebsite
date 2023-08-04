export interface LiveDroneData {
    flightStatus: boolean | null;
    satelliteSignal: number | null;
    windStatus: number | null;
    position: { 
        altitude: number | null;
        latitude: number | null;
        longitude: number | null;
    }
    velocity: {
        x: number | null;
        y: number | null;
        z: number | null;
    }
}