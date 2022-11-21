import React, { ReactNode, useState } from "react";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

interface IHeaderColumnProps {
  sortField: string;
  sortFieldMember?: string;
  sortState?: string;
  sortDescending: boolean;
  className?: string;
  onClick: (
    sortField: string,
    sortDescending: boolean,
    sortFieldMember?: string
  ) => void;
  children?: ReactNode;
}

const HeaderColumn: React.FC<IHeaderColumnProps> = (
  props: IHeaderColumnProps
) => {
  const [sortDescendingState, setSortDescendingState] = useState<boolean>(
    props.sortDescending
  );
  const ascDesc: boolean =
    props.sortFieldMember !== undefined
      ? props.sortState === props.sortFieldMember
      : props.sortState === props.sortField;
  return (
    <div
      onClick={() => {
        setSortDescendingState(!sortDescendingState);
        props.onClick(
          props.sortField,
          !sortDescendingState,
          props.sortFieldMember
        );
      }}
      className={props.className}
    >
      {props.children}
      {ascDesc &&
        (sortDescendingState ? (
          <CaretDownOutlined
            onClick={() => setSortDescendingState(!sortDescendingState)}
          />
        ) : (
          <CaretUpOutlined
            onClick={() => setSortDescendingState(!sortDescendingState)}
          />
        ))}
    </div>
  );
};
export default HeaderColumn;
