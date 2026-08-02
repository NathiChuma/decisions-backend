import average from './average';
import { ConsistencyStats, Solve } from '../../types';

const calculateConsistency = (solves: Solve[]): ConsistencyStats => {
  const validSolves = solves.filter((s) => !s.dnf);

  if (validSolves.length === 0) {
    return { excellent: 0, good: 0, fair: 0, poor: 0 };
  }





  const times = validSolves.map((s) => s.time);

  // Calculate mean
  const mean = times.reduce((sum, time) => sum + time, 0) / times.length;

  // Calculate standard deviation
  const variance = times.reduce((sum, time) => {
      return sum + Math.pow(time - mean, 2);
    }, 0) / times.length;

  const stdDev = Math.sqrt(variance);

  let excellent = 0;
  let good = 0;
  let fair = 0;
  let poor = 0;

  times.forEach((time) => {
    const distance = Math.abs(time - mean);

    if (distance <= stdDev * 0.5) {
      excellent++;
    } else if (distance <= stdDev) {
      good++;
    } else if (distance <= stdDev * 2) {
      fair++;
    } else {
      poor++;
    }
  });

  const total = times.length;

  return {
    excellent: Math.round((excellent / total) * 100),
    good: Math.round((good / total) * 100),
    fair: Math.round((fair / total) * 100),
    poor: Math.round((poor / total) * 100),
  };
};

export default calculateConsistency;
