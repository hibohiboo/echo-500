export interface RobotLaw {
  number: 1 | 2 | 3;
  title: string;
  description: string;
  priority: 'highest' | 'high' | 'medium';
}

export interface CorruptedPurpose {
  isCorrupted: true;
  tagsCollected: number;
  tagsRequired: 5;
  description: string;
}

export interface Character {
  id: string;
  name: string;
  robotLaws: [RobotLaw, RobotLaw, RobotLaw];
  corruptedPurpose: CorruptedPurpose;
}
