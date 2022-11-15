import {AssignmentDto} from '../dtos/resources/play.dto';
import {Alignment} from '../dtos/types/alignment';
import {Formation} from '../dtos/types/formation';
import {Position} from '../dtos/types/position';

const createAssignment = (
  alignment: Alignment,
  depthChartPosition: Position,
  depthChartSlot: number,
): AssignmentDto => {
  return new AssignmentDto().init({
    alignment,
    depthChartPosition,
    depthChartSlot,
  });
};

export const FormationAssignments: {
  [Formation.Kickoff]: AssignmentDto[];
  [Formation.KickoffReturn]: AssignmentDto[];
} = {
  [Formation.Kickoff]: [
    createAssignment(Alignment.KickoffKicker, Position.K, 1),
    createAssignment(Alignment.KickoffStreaker1, Position.LB, 3),
    createAssignment(Alignment.KickoffStreaker2, Position.LB, 4),
    createAssignment(Alignment.KickoffStreaker3, Position.LB, 5),
    createAssignment(Alignment.KickoffStreaker4, Position.LB, 6),
    createAssignment(Alignment.KickoffStreaker5, Position.S, 3),
    createAssignment(Alignment.KickoffStreaker6, Position.S, 4),
    createAssignment(Alignment.KickoffStreaker7, Position.WR, 3),
    createAssignment(Alignment.KickoffStreaker8, Position.WR, 4),
    createAssignment(Alignment.KickoffStreaker9, Position.WR, 5),
    createAssignment(Alignment.KickoffStreaker10, Position.RB, 2),
  ],
  [Formation.KickoffReturn]: [
    createAssignment(Alignment.KickoffReturner, Position.WR, 1),
    createAssignment(Alignment.KickoffBlocker1, Position.TE, 1),
    createAssignment(Alignment.KickoffBlocker2, Position.TE, 2),
    createAssignment(Alignment.KickoffBlocker3, Position.TE, 3),
    createAssignment(Alignment.KickoffBlocker4, Position.FB, 1),
    createAssignment(Alignment.KickoffBlocker5, Position.RB, 2),
    createAssignment(Alignment.KickoffBlocker6, Position.RB, 3),
    createAssignment(Alignment.KickoffBlocker7, Position.WR, 2),
    createAssignment(Alignment.KickoffBlocker8, Position.WR, 3),
    createAssignment(Alignment.KickoffBlocker9, Position.WR, 4),
    createAssignment(Alignment.KickoffBlocker10, Position.WR, 5),
  ],
};
