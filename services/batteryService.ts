import { useState, useEffect } from 'react';

export interface BatteryState {
  level: number; // 0 - 100
  charging: boolean;
  isReal: boolean;
}

export const useBattery = (): BatteryState => {
  const [batteryState, setBatteryState] = useState<BatteryState>({
    level: 98,
    charging: false,
    isReal: false,
  });

  useEffect(() => {
    let batteryInstance: any = null;

    const updateBattery = (battery: any) => {
      setBatteryState({
        level: Math.round(battery.level * 100),
        charging: battery.charging,
        isReal: true,
      });
    };

    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      (navigator as any).getBattery()
        .then((battery: any) => {
          batteryInstance = battery;
          updateBattery(battery);

          battery.addEventListener('levelchange', () => updateBattery(battery));
          battery.addEventListener('chargingchange', () => updateBattery(battery));
        })
        .catch(() => {
          // Fallback to simulated battery
          startSimulation();
        });
    } else {
      startSimulation();
    }

    function startSimulation() {
      // Realistic simulation: starts at 98%, subtle dynamic drain/charge
      const interval = setInterval(() => {
        setBatteryState((prev) => {
          const drain = Math.random() > 0.8 ? -1 : 0;
          const nextLevel = Math.max(12, Math.min(100, prev.level + drain));
          return {
            level: nextLevel,
            charging: nextLevel < 20,
            isReal: false,
          };
        });
      }, 45000);

      return () => clearInterval(interval);
    }

    return () => {
      if (batteryInstance) {
        batteryInstance.removeEventListener?.('levelchange', () => {});
        batteryInstance.removeEventListener?.('chargingchange', () => {});
      }
    };
  }, []);

  return batteryState;
};
