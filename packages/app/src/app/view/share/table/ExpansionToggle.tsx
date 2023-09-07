import React from "react";

export function ExpansionToggle({
  expanded,
  setExpanded,
  expandKey,
  children,
  "data-test": dataTest,
  ...rest
}: React.PropsWithChildren<{
  expanded: string;
  setExpanded: (_key: string) => void;
  expandKey: string;
  "data-test": string;
}>) {
  const tdClassNames = ["pf-c-table__compound-expansion-toggle"];
  if (expanded === expandKey) {
    tdClassNames.push("pf-m-expanded");
  }

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <td className={tdClassNames.join(" ")} {...rest}>
      <button
        type="button"
        className="pf-c-table__button pf-m-link"
        onClick={() => setExpanded(expanded !== expandKey ? expandKey : "")}
        data-test={dataTest}
      >
        {children}
      </button>
    </td>
  );
}