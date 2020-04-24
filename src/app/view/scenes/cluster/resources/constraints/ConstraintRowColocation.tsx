import React from "react";

import { types } from "app/store";

import { ConstraintRow } from "./ConstraintRow";
import { ConstraintCell } from "./ConstraintCell";
import { ConstraintCellResourceSet } from "./ConstraintCellResourceSet";

export const ConstraintRowColocation = ({
  constraint,
  resourceId,
}: {
  constraint: types.cluster.ConstraintColocation;
  resourceId: string;
}) => {
  if ("sets" in constraint) {
    return (
      <ConstraintRow aria-labelledby={`Colocation constraint ${constraint.id}`}>
        <ConstraintCell label="Type" value="Colocation (set)" />
        <ConstraintCellResourceSet resourceSetList={constraint.sets} />
        <ConstraintCell label="Score" value={constraint.score} />
      </ConstraintRow>
    );
  }
  return (
    <ConstraintRow aria-labelledby={`Colocation constraint ${constraint.id}`}>
      <ConstraintCell label="Type" value="Colocation" />
      <ConstraintCell
        label="With resource"
        value={
          constraint.rsc === resourceId
            ? constraint["with-rsc"]
            : constraint.rsc
        }
      />
      <ConstraintCell label="Score" value={constraint.score} />
    </ConstraintRow>
  );
};