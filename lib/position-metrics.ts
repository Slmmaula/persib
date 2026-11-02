import type { PlayerPosition } from "@/lib/types";

export interface PositionMetrics {
  highlightLabel: string;
  seriesTitle: string;
  seriesUnit: readonly [singular: string, plural: string];
  ringLabels: readonly [string, string];
}

export const positionMetrics: Record<PlayerPosition, PositionMetrics> = {
  goalkeeper: {
    highlightLabel: "Clean Sheets",
    seriesTitle: "Clean sheets per season",
    seriesUnit: ["clean sheet", "clean sheets"],
    ringLabels: ["Save Rate", "Pass Accuracy"],
  },
  defender: {
    highlightLabel: "Tackles Won",
    seriesTitle: "Defensive contributions per season",
    seriesUnit: ["contribution", "contributions"],
    ringLabels: ["Tackle Success", "Aerial Duels Won"],
  },
  midfielder: {
    highlightLabel: "Assists",
    seriesTitle: "Goal contributions per season",
    seriesUnit: ["contribution", "contributions"],
    ringLabels: ["Pass Accuracy", "Duels Won"],
  },
  forward: {
    highlightLabel: "Goals",
    seriesTitle: "Goals amount per season",
    seriesUnit: ["goal", "goals"],
    ringLabels: ["Conversion Rate", "Shooting Accuracy"],
  },
};
