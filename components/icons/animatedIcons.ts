export type AnimatedIconType =
  | "problem"
  | "solution"
  | "up"
  | "down"
  | "unknown"
  | "none";

export interface AnimatedIconSequence {
  type: AnimatedIconType;
  urls: string[];
  defaultInterval?: number;
  label: string;
}

export const problemSequence: AnimatedIconSequence = {
  type: "problem",
  urls: [
    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744177227/problem-1_parbly.svg",
    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744177227/problem-2_lxidte.svg",
    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744177227/problem-3_vnjp3a.svg",
    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744177228/problem-4_zzod3m.svg",
    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744177228/problem-5_knoanl.svg",
  ],
  label: "Problem indicator",
};

export const solutionSequence: AnimatedIconSequence = {
  type: "solution",
  urls: [
    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744177813/solution-1_jj64ip.svg",
    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744177813/solution-2_x0ryne.svg",
    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744177814/solution-3_vgzypm.svg",
  ],
  defaultInterval: 250,
  label: "Solution indicator",
};

export const upSequence: AnimatedIconSequence = {
  type: "up",
  urls: [
    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744733147/up-1_dmrosk.svg",
    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744733147/up-2_tlned7.svg",
    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744733147/up-3_evnpuw.svg",
    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744733147/up-4_jiostn.svg",
  ],
  label: "Upward trend",
};

export const downSequence: AnimatedIconSequence = {
  type: "down",
  urls: [
    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744693006/down-1_k7jerc.svg",
    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744693084/down-2_gyozcg.svg",
    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744693007/down-3_z5mmdh.svg",
    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744693083/down-4_hxgof2.svg",
  ],
  label: "Downward trend",
};

export const unknownSequence: AnimatedIconSequence = {
  type: "unknown",
  urls: [],
  label: "Unknown status",
};

export const noneSequence: AnimatedIconSequence = {
  type: "none",
  urls: [],
  label: "No status indicator",
};

export const animatedIcons = {
  problem: problemSequence,
  solution: solutionSequence,
  up: upSequence,
  down: downSequence,
  unknown: unknownSequence,
  none: noneSequence,
};
