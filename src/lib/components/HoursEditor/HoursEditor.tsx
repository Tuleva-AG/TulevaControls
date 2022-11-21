// import "antd/dist/antd.css";
// import "moment/locale/de";

import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DeleteOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { Button, Modal, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { IBaseEntity } from "../../types/baseEntity";
// import { useHasPermissions } from '../../common/roles/Can';
// import Rights from '../../common/roles/rights';                   --- todo
import styles from "./hoursEditor.module.scss";
import { useEditorContext } from "../hoursSharedContext";
import HoursMetaData from "../HoursMetaData/HoursMetaData";

export type PartProps = {
  children: React.ReactNode;
};

interface IHoursEditorProps {
  item: IBaseEntity;
  onSave: (item: IBaseEntity) => void;
  onDelete: (id: string | undefined) => void;
  onCopyItem?: (id: string | undefined) => void;
  editMode: boolean;
  hideDeleteButton?: boolean;
  hideCopyButton?: boolean;
  hideExitButton?: boolean;
  hideSaveButton?: boolean;
  hideMetaData?: boolean;
  onExit: (item: IBaseEntity) => void;

  editor?: React.FC<PartProps>;
  onRenderEdit: (item: IBaseEntity) => React.ReactNode;
  onRenderView: (item: IBaseEntity) => React.ReactNode;

  //   deleteRights: Rights;  --- todo
  //   editRights: Rights;    --- todo

  deleteRights?: boolean;
  editRights?: boolean;

  showAsModal?: boolean;
  stayInEditMode?: boolean;
  confirmOnSave?: boolean;
  confirmOnSaveMessage?: string;

  additionalButtons?: (item: IBaseEntity) => JSX.Element;
  labelSave?: string;
  labelCancel?: string;
  labelConfirmDelete?: string;
  labelYes?: string;
  labelNo?: string;
  labelDeleteEntry?: string;
  labelCopy?: string;
}

const HoursEditor: React.FC<IHoursEditorProps> = (props) => {
  const getEditorContext = useEditorContext();
  const [editMode, setEditMode] = useState(props.editMode);
  const [itemState, setItemState] = useState(props.item);
  const [confirmState, setConfirmState] = useState<boolean>(false);

  // --- todo
  //   const deletePerms = useHasPermissions(props.deleteRights);
  //   const editPerms = useHasPermissions(props.editRights);

  let deletePerms = true;
  if (props.deleteRights != undefined) {
    deletePerms = props.deleteRights;
  }
  let editPerms = true;
  if (props.editRights != undefined) {
    editPerms = props.editRights;
  }
  // let deletePerms = props.deleteRights ? props.deleteRights : true;
  // let editPerms = props.editRights ? props.editRights : true;

  let labelSave = props.labelSave ? props.labelSave : "Speichern";
  let labelCancel = props.labelCancel ? props.labelCancel : "Abbrechen";
  let labelConfirmDelete = props.labelConfirmDelete
    ? props.labelConfirmDelete
    : "Diesen Eintrag wirklich löschen?";
  let labelYes = props.labelYes ? props.labelYes : "Ja";
  let labelNo = props.labelNo ? props.labelNo : "Nein";
  let labelDeleteEntry = props.labelDeleteEntry
    ? props.labelDeleteEntry
    : "Eintrag löschen...";
  let labelCopy = props.labelCopy ? props.labelCopy : "Kopieren";

  const toggleEditMode = (e: any) => {
    if (!props.stayInEditMode) {
      setEditMode(!editMode && editPerms);
    }
    if (itemState.isDirty) {
      props.onSave(itemState);
      setItemState({
        ...itemState,
        isDirty: false,
      });
    }

    e.preventDefault(); // prevent scrolling to top after click
  };

  const confirm = (e: any) => {
    setConfirmState(false);
    try {
      toggleEditMode(e);
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = () => {
    setConfirmState(false);
  };

  const handleVisibleChange = (visible: boolean) => {
    if (props.confirmOnSave) {
      setConfirmState(visible);
    } else {
      toggleEditMode(undefined);
    }
  };

  const exitEditMode = (e: any) => {
    setEditMode(!editMode);
    if (itemState.id?.includes("New_")) {
      props.onDelete(itemState.id);
      return;
    }
    setItemState(props.item);

    if (props.item.id?.includes("New_")) {
      props.onExit(props.item);
    }
    e.preventDefault(); // prevent scrolling to top after click
  };

  useEffect(() => {
    setItemState(getEditorContext.item);
  }, [getEditorContext.item]);

  return (
    <div className={styles.editorInner}>
      <div className={styles.inputArea}>
        {editMode && itemState && (
          <>
            {props.showAsModal && (
              <>
                <div
                  className={styles.display + " " + styles.viewTable}
                  onClick={toggleEditMode}
                >
                  <div className={styles.viewRow}>
                    {props.onRenderView(props.item)}
                  </div>
                </div>

                <Modal
                  visible={editMode}
                  onOk={toggleEditMode}
                  onCancel={exitEditMode}
                  width={1000}
                  bodyStyle={{ marginBottom: "30px" }}
                  closable={false}
                  maskClosable={false}
                  okButtonProps={{ disabled: !getEditorContext.isValid }}
                  okText={labelSave}
                  cancelText={labelCancel}
                >
                  {props.onRenderEdit(props.item)}
                  {!props.hideMetaData && (
                    <HoursMetaData item={props.item}></HoursMetaData>
                  )}
                </Modal>
              </>
            )}
            {!props.showAsModal && (
              <>
                {props.onRenderEdit(props.item)}
                {!props.hideMetaData && (
                  <HoursMetaData item={props.item}></HoursMetaData>
                )}
              </>
            )}
          </>
        )}
        {itemState && !editMode && (
          <div
            className={styles.display + " " + styles.viewTable}
            onClick={toggleEditMode}
          >
            <div className={styles.viewRow}>
              {props.onRenderView(props.item)}
            </div>
          </div>
        )}
      </div>
      <div className={styles.buttonArea}>
        <div className={styles.buttonAreaInner}>
          {props.item && editMode && !props.showAsModal && (
            <>
              {!props.hideSaveButton && (
                <Popconfirm
                  title={props.confirmOnSaveMessage}
                  visible={confirmState}
                  placement="topRight"
                  onVisibleChange={handleVisibleChange}
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText={labelYes}
                  cancelText={labelNo}
                  disabled={!getEditorContext.isValid}
                >
                  <Button
                    shape="circle"
                    size="middle"
                    title={labelSave}
                    icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                    disabled={!getEditorContext.isValid}
                  />
                </Popconfirm>
              )}
              {!props.hideExitButton && (
                <Button
                  shape="circle"
                  size="middle"
                  title={labelCancel}
                  icon={<CloseCircleTwoTone twoToneColor="#f5222d" />}
                  onClick={exitEditMode}
                />
              )}
              {props.additionalButtons && props.additionalButtons(props.item)}
            </>
          )}
          {!editMode && (
            <>
              {!props.hideCopyButton && (
                <Button
                  className={styles.addNew}
                  shape="circle"
                  size="middle"
                  title={labelCopy}
                  icon={<CopyOutlined />}
                  onClick={() =>
                    props.onCopyItem && props.onCopyItem(props.item.id)
                  }
                />
              )}
              {!props.hideDeleteButton && (
                <Popconfirm
                  title={labelConfirmDelete}
                  placement="topRight"
                  onConfirm={() => props.onDelete(props.item.id)}
                  okText={labelYes}
                  cancelText={labelNo}
                >
                  <Button
                    className={styles.addNew}
                    shape="circle"
                    size="middle"
                    title={labelDeleteEntry}
                    icon={<DeleteOutlined />}
                    disabled={!deletePerms}
                  />
                </Popconfirm>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HoursEditor;
