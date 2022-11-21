import React, { ReactNode, useState } from 'react';
// import HelpTopic from '../../admin/help/helpTopic/helpTopic';
// import { QuestionCircleOutlined } from '@ant-design/icons';

import styles from './pageHeader.module.scss';
import { EditorContextProvider } from '../hoursSharedContext';
// import { useTranslation } from 'react-i18next';

interface IPageHeaderProps {
    caption: string;
    subLine?: string;
    summary?: string;
    children?: ReactNode;
    className?: string;
    helpTopic?: string;
    buttonsClassName?: string;
}

const PageHeader: React.FC<IPageHeaderProps> = (props: IPageHeaderProps) => {
    // const { t } = useTranslation();
    const [helpVisible, setHelpVisible] = useState<boolean>(false);

    return (
        <div className={styles.header + ' ' + props.className}>
            <div className={styles.headerInner}>
                <div className={styles.headerCaption}>
                    <h2>{props.caption}</h2>
                    {/* {props.helpTopic &&
                        <QuestionCircleOutlined title={t('pageHeader.helpTooltip')} onClick={() => setHelpVisible(!helpVisible)} style={{ fontSize: '1.5em', color: '#fffff', display: 'table-cell', paddingLeft: '0.8em', verticalAlign: 'middle' }} />
                    } */}
                </div>
            </div>
            <div className={styles.headerInner}>
                <div>
                    <EditorContextProvider>

                        {/* {props.helpTopic && helpVisible &&
                            <HelpTopic topic={props.helpTopic as string}></HelpTopic>
                        } */}
                    </EditorContextProvider>
                </div>
            </div>
            <div className={styles.headerInner}>
                <div className={styles.headerSubline}>{props.subLine}</div>
                <div className={styles.headerButtons + ' ' + props.buttonsClassName}>{props.children}</div>
                <div className={styles.headerSummary}>{props.summary}</div>
            </div>
        </div>
    );
};

export default PageHeader;
