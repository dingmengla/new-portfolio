"use client";

import { createContext, useContext } from "react";

type WaveContextType = {
  triggerWave: () => void;
};

export const WaveContext = createContext<WaveContextType>({
  triggerWave: () => {},
});

export const useWave = () => useContext(WaveContext);
