import moment from "moment";
import React from "react";
import { IBaseEntity } from "../../types/baseEntity";
import styles from "./hoursMetaData.module.scss";

export interface IHoursMetaDataProps {
  item: IBaseEntity;
  labelCreated?: string;
  labelModified?: string;
  labelCreatedby?: string;
  labelModifiedby?: string;
}

const HoursMetaData: React.FC<IHoursMetaDataProps> = (
  props: IHoursMetaDataProps
) => {

  let labelCreated = props.labelCreated ? props.labelCreated : 'Erstellt am: ';
  let labelModified = props.labelModified ? props.labelModified : 'Geändert am: ';
  let labelCreatedby = props.labelCreatedby ? props.labelCreatedby : 'von: ';
  let labelModifiedby = props.labelModifiedby ? props.labelModifiedby : 'von: ';

  return (
    <div className={styles.labeledControl}>
      <div className={styles.medaDataTable}>
        <div className={styles.medaDataRow}>
          <div className={styles.medaDataLabel}>
            {labelCreated}
            {moment(props.item.created).format("lll")} {labelCreatedby}
            {props.item.createdBy?.name}
          </div>
        </div>
        <div className={styles.medaDataRow}>
          <div>
            {labelModified}
            {moment(props.item.edited).format("lll")} {labelModifiedby}
            {props.item.editedBy?.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoursMetaData;
