import React from "react";
import {Select as PfSelect, SelectOption} from "@patternfly/react-core";

type SelectProps = React.ComponentProps<typeof PfSelect>;
type Props = Omit<SelectProps, "isOpen" | "toggle" | "onSelect" | "onFilter">;

export const Select = (
  props: Props & {
    id?: string;
    variant?: "single" | "typeahead";
    placeholderText?: string;
    onSelect: (_value: string) => void;
    selections?: string | string[];
    isDisabled?: boolean;
    typeAheadAriaLabel?: string;
    onClear?: (event: React.MouseEvent) => void;
    onFilter?: (_value: string) => void;
    isGrouped?: boolean;
    customBadgeText?: string | number;
    validated?: "error" | "default";
    "data-test"?: string;
  } & ({optionsValues: string[]} | {children: React.ReactNode}),
) => {
  const {onSelect, onFilter, ...restProps} = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const select = React.useCallback(
    (
      _event?: React.MouseEvent | React.ChangeEvent,
      value?: string | number,
    ) => {
      onSelect(`${value}` ?? "");
      setIsOpen(false);
    },
    [onSelect],
  );

  const filter = onFilter
    ? (_event: React.ChangeEvent<HTMLInputElement> | null, value: string) => {
        onFilter(value);
        return undefined;
      }
    : null;

  if ("optionsValues" in restProps) {
    restProps.children = restProps.optionsValues.map(o => (
      <SelectOption key={o} value={o} />
    ));
    restProps.optionsValues = [];
  }

  let cleanProps;
  if ("optionsValues" in restProps) {
    cleanProps = (
      Object.keys(restProps) as Array<keyof typeof restProps>
    ).reduce(
      (accumulator, key) => ({
        ...accumulator,
        ...(key !== "optionsValues"
          ? {[key]: restProps[key]}
          : {
              children: restProps.optionsValues.map(o => (
                <SelectOption key={o} value={o} />
              )),
            }),
      }),
      {},
    );
  } else {
    cleanProps = restProps;
  }

  const pfProps: SelectProps = {
    ...cleanProps,
    ...(filter !== null ? {onFilter: filter} : {}),
    toggle: () => setIsOpen(!isOpen),
    isOpen,
    onSelect: select,
  };

  if ("data-test" in props && props["data-test"]) {
    return (
      <span data-test={props["data-test"]}>
        <PfSelect {...pfProps} />
      </span>
    );
  }
  /* eslint-disable react/jsx-props-no-spreading */
  return <PfSelect {...pfProps} />;
};
