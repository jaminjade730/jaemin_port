import type { Project } from "./types";
import { lonz } from "./lonz";
import { ikeaHejPark } from "./ikea-hej-park";
import { koreaTravel } from "./korea-travel";
import { variway } from "./variway";
import { lov3Room } from "./lov3-room";

export type {
  Project,
  ProjectCategory,
  ProjectLayout,
  ProjectCallout,
  ProjectGlanceItem,
  ProjectCompareSide,
  ProjectLearned,
} from "./types";

export const projects: Project[] = [
  lonz,
  ikeaHejPark,
  koreaTravel,
  variway,
  lov3Room,
];
