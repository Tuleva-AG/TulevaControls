import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DeleteOutlined,
  CopyOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Modal, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { IBaseEntity } from "../../types/baseEntity";
import styles from "./tulevaEditor.module.scss";
import { useEditorContext } from "../tulevaSharedContext";
import TulevaMetaData from "../TulevaMetaData/TulevaMetaData";

export type PartProps = {
  children: React.ReactNode;
};

interface ITulevaEditorProps {
  item: IBaseEntity;
  onSave: (item: IBaseEntity) => void;
  onClick?: (item: IBaseEntity) => void;
  onDelete: (id: string | undefined) => void;
  onCopyItem?: (id: string | undefined) => void;
  editMode: boolean;
  hideEditButton?: boolean;
  hideDeleteButton?: boolean;
  hideCopyButton?: boolean;
  hideExitButton?: boolean;
  hideSaveButton?: boolean;
  hideMetaData?: boolean;
  onExit: (item: IBaseEntity) => void;

  editor?: React.FC<PartProps>;
  onRenderEdit: (item: IBaseEntity) => React.ReactNode;
  onRenderView?: (item: IBaseEntity) => React.ReactNode;

  deleteRights?: boolean;
  editRights?: boolean;

  showAsModal?: boolean;
  stayInEditMode?: boolean;
  confirmOnSave?: boolean;
  confirmOnSaveMessage?: string;
  wrapButtons: boolean;

  onRenderEditorFooter?: (
    item: IBaseEntity,
    closeEditor: (e: any) => void
  ) => React.ReactNode;
  additionalEditButtons?: (item: IBaseEntity) => JSX.Element;
  additionalViewButtons?: (item: IBaseEntity) => JSX.Element;

  editorTitle?: string;
  onRenderEditorCaption?: (item: IBaseEntity) => React.ReactNode;
  labelSave?: string;
  labelCancel?: string;
  labelConfirmDelete?: string;
  labelYes?: string;
  labelNo?: string;
  labelDeleteEntry?: string;
  labelCopy?: string;
  labelEdit?: string;

  customEditButtonContent?: JSX.Element;
}

const TulevaEditor: React.FC<ITulevaEditorProps> = (props) => {
  const getEditorContext = useEditorContext();
  const [editMode, setEditMode] = useState(props.editMode);
  const [itemState, setItemState] = useState(props.item);
  const [confirmState, setConfirmState] = useState<boolean>(false);

  let deletePerms = true;
  if (props.deleteRights != undefined) {
    deletePerms = props.deleteRights;
  }
  let editPerms = true;
  if (props.editRights != undefined) {
    editPerms = props.editRights;
  }

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
  let labelEdit = props.labelEdit ? props.labelEdit : "Bearbeiten";

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

  function renderDefaultViewButtons(): React.ReactNode {
    const editButtonContent = props.customEditButtonContent ? (
      props.customEditButtonContent
    ) : (
      <EditOutlined />
    );

    return (
      <div className={props.wrapButtons ? styles.wrappedButtons : ""}>
        {!props.hideEditButton && (
          <Button
            className={styles.addNew}
            shape="circle"
            size="middle"
            title={labelEdit}
            icon={editButtonContent}
            onClick={toggleEditMode}
          />
        )}
        {!props.hideCopyButton && (
          <Button
            className={styles.addNew}
            shape="circle"
            size="middle"
            title={labelCopy}
            icon={<CopyOutlined />}
            onClick={() => props.onCopyItem && props.onCopyItem(props.item.id)}
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
        {props.additionalViewButtons && props.additionalViewButtons(props.item)}
      </div>
    );
  }

  return (
    <div className={styles.editorInner}>
      <div className={styles.inputArea}>
        {editMode && itemState && (
          <>
            {props.showAsModal && (
              <>
                {props.onRenderView && (
                  <div
                    className={styles.display + " " + styles.viewTable}
                    onClick={toggleEditMode}
                  >
                    <div className={styles.viewRow}>
                      {props.onRenderView(props.item)}
                    </div>
                  </div>
                )}

                <Modal
                  title={
                    props.onRenderEditorCaption
                      ? props.onRenderEditorCaption(props.item)
                      : props.editorTitle
                  }
                  open={editMode}
                  onOk={toggleEditMode}
                  onCancel={exitEditMode}
                  width={1000}
                  bodyStyle={{ marginBottom: "30px" }}
                  closable={false}
                  maskClosable={false}
                  okButtonProps={{ disabled: !getEditorContext.isValid }}
                  okText={labelSave}
                  cancelText={labelCancel}
                  //additional buttons for modal footer
                  footer={
                    props.onRenderEditorFooter
                      ? props.onRenderEditorFooter(props.item, toggleEditMode)
                      : undefined
                  }
                >
                  {props.onRenderEdit(props.item)}
                  {!props.hideMetaData && (
                    <TulevaMetaData item={props.item}></TulevaMetaData>
                  )}
                </Modal>
              </>
            )}
            {!props.showAsModal && (
              <>
                {props.onRenderEdit(props.item)}
                {!props.hideMetaData && (
                  <TulevaMetaData item={props.item}></TulevaMetaData>
                )}
              </>
            )}
          </>
        )}
        {itemState && !editMode && props.onRenderView && (
          <div
            className={styles.display + " " + styles.viewTable}
            onClick={(e: any) => {
              props.onClick ? props.onClick(props.item) : toggleEditMode(e);
            }}
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
                  open={confirmState}
                  placement="topRight"
                  onOpenChange={handleVisibleChange}
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
              {/* additional buttons fro inline editing  */}
              {props.additionalEditButtons &&
                props.additionalEditButtons(props.item)}
            </>
          )}
          {props.item && editMode && props.showAsModal && (
            <>{renderDefaultViewButtons()}</>
          )}
          {!editMode && renderDefaultViewButtons()}
        </div>
      </div>
    </div>
  );
};

export default TulevaEditor;
