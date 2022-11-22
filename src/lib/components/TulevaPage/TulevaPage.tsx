import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, List, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { IBaseEntity } from "../../types";
import TulevaEditor from "../TulevaEditor";
import { PartProps } from "../TulevaEditor/TulevaEditor";
import { EditorContextProvider } from "../tulevaSharedContext";
import PageHeader from "../TulevaPageHeader";
import styles from "./tulevaPage.module.scss";

export interface ITulevaPageProps {
  caption?: string;
  helpTopic?: string;
  deleteRights?: boolean;
  editRights?: boolean;
  createRights?: boolean;
  listRights?: boolean;

  hideDeleteButton?: boolean;
  hideExitButton?: boolean;
  hideSaveButton?: boolean;
  hideCopyButton?: boolean;
  hideMetaData?: boolean;
  loading: boolean;
  onGetEditMode?: (item: IBaseEntity) => boolean;

  onRenderEdit: (item: IBaseEntity) => JSX.Element;
  onRenderView: (item: IBaseEntity) => JSX.Element;
  onRenderListHeader: () => JSX.Element;
  onRenderFilter: () => JSX.Element;
  onRenderHeaderButtons?: () => JSX.Element;
  dataSource?: IBaseEntity[];

  onSave: (item: IBaseEntity | any, id: string) => void;
  onDelete: (id: string | undefined) => void;
  onCopyItem?: (id: string | undefined) => void;

  onAddNew?: () => void;
  showAsModal?: boolean;
  stayInEditMode?: boolean;
  confirmOnSave?: boolean;
  confirmOnSaveMessage?: string;

  onExit: (item: IBaseEntity) => void;

  additionalButtons?: (item: IBaseEntity) => JSX.Element;

  labelNew?: string;
}

const Header: React.FC<PartProps> = ({ children }) => <>{children}</>;

const Filter: React.FC<PartProps> = ({ children }) => <>{children}</>;

const Editor: React.FC<PartProps> = ({ children }) => <>{children}</>;

const TulevaPage: React.FC<ITulevaPageProps> = (props: ITulevaPageProps) => {
  const [data, setData] = useState<IBaseEntity[]>(
    props.dataSource as IBaseEntity[]
  );
  const createPerms = props.createRights;

  let labelNew = props.labelNew ? props.labelNew : "Neu";

  useEffect(() => {
    setData(props.dataSource as IBaseEntity[]);
  }, [props.dataSource]);

  const onSaveClick = (item: IBaseEntity | any, id: string): void => {
    if (props.onSave !== undefined) {
      props.onSave(item, id);
    }
  };

  const onGetEditMode = (item: IBaseEntity | any): boolean => {
    if (props.onGetEditMode === undefined) {
      return item.id?.includes("New_");
    } else {
      return props.onGetEditMode(item);
    }
  };

  const renderItem = (item: IBaseEntity) => {
    return (
      <List.Item key={item.id} className={styles.listItem}>
        <EditorContextProvider>
          <TulevaEditor
            item={item}
            editMode={onGetEditMode(item)}
            onSave={(saveItem) => onSaveClick(saveItem, item.id as string)}
            onDelete={() => props.onDelete(item.id)}
            onCopyItem={() => props.onCopyItem && props.onCopyItem(item.id)}
            onExit={(): void => props.onExit(item)}
            editor={Editor}
            deleteRights={props.deleteRights}
            editRights={props.editRights}
            hideDeleteButton={props.hideDeleteButton}
            hideExitButton={props.hideExitButton}
            hideSaveButton={props.hideSaveButton}
            hideMetaData={props.hideMetaData}
            hideCopyButton={props.hideCopyButton}
            showAsModal={props.showAsModal}
            stayInEditMode={props.stayInEditMode}
            confirmOnSave={props.confirmOnSave}
            confirmOnSaveMessage={props.confirmOnSaveMessage}
            onRenderView={() => props.onRenderView(item)}
            onRenderEdit={() => props.onRenderEdit(item)}
            additionalButtons={props.additionalButtons}
          ></TulevaEditor>
        </EditorContextProvider>
      </List.Item>
    );
  };

  const onAddNewClick = (): void => {
    if (props.onAddNew !== undefined) {
      props.onAddNew();
    }
  };

  const renderPageHeader = (): JSX.Element => {
    return (
      <>
        <PageHeader
          helpTopic={props.helpTopic}
          caption={props.caption as string}
          subLine={""}
          summary={""}
        >
          {!props.onRenderHeaderButtons && (
            <Button
              className={styles.addNew}
              shape="circle"
              size="middle"
              title={labelNew}
              icon={<PlusCircleOutlined />}
              onClick={onAddNewClick}
              disabled={!createPerms}
            />
          )}
          {props.onRenderHeaderButtons && props.onRenderHeaderButtons()}
        </PageHeader>
      </>
    );
  };

  const renderListHeader = (): JSX.Element => {
    return (
      <>
        <div className={styles.viewTable}>
          <div className={styles.viewRow}>{props.onRenderListHeader()}</div>
        </div>
        <div className={styles.buttonArea}></div>
      </>
    );
  };

  // if (!useHasPermissions(props.listRights)) {
  //     return <Redirect to={'/'} />;
  // }

  return (
    <div>
      <Header>{renderPageHeader()}</Header>
      <Spin spinning={props.loading} size="large">
        <Filter>{props.onRenderFilter()}</Filter>
        <List
          className={styles.cardStyle}
          size="small"
          bordered
          dataSource={data}
          header={renderListHeader()}
          renderItem={(item) => renderItem(item)}
        />
      </Spin>
    </div>
  );
};

export default TulevaPage;
