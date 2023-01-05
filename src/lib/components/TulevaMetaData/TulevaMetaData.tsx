import moment from "moment";
import React from "react";
import { IBaseEntity } from "../../types/baseEntity";
import styles from "./tulevaMetaData.module.scss";

export interface ITulevaMetaDataProps {
  item: IBaseEntity;
  labelCreated?: string;
  labelModified?: string;
  labelCreatedby?: string;
  labelModifiedby?: string;
}

const TulevaMetaData: React.FC<ITulevaMetaDataProps> = (
  props: ITulevaMetaDataProps
) => {
  let labelCreated = props.labelCreated ? props.labelCreated : "Erstellt am: ";
  let labelModified = props.labelModified
    ? props.labelModified
    : "Geändert am: ";
  let labelCreatedby = props.labelCreatedby ? props.labelCreatedby : "von: ";
  let labelModifiedby = props.labelModifiedby ? props.labelModifiedby : "von: ";

  return (
    <div className={styles.labeledControl}>
      <div className={styles.metaDataTable}>
        <div className={styles.metaDataRow}>
          <div className={styles.metaDataLabel}>
            {labelCreated}
            {moment(props.item.created).format("lll")} {props.item.createdBy && labelCreatedby}
            {props.item.createdBy?.name}
          </div>
        </div>
        <div className={styles.metaDataRow}>
          <div>
            {labelModified}
            {moment(props.item.edited).format("lll")} {props.item.editedBy && labelModifiedby}
            {props.item.editedBy?.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TulevaMetaData;
