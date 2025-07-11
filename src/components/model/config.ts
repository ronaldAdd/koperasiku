export interface IConfig {
  document?: {
    fileType?: string;
    key?: string;
    title?: string;
    url?: string;
    info?: {
      owner?: string;
      uploaded?: string;
    };
    permissions?: {
      comment?: boolean;
      copy?: boolean;
      download?: boolean;
      edit?: boolean;
      fillForms?: boolean;
      modifyContentControl?: boolean;
      modifyFilter?: boolean;
      print?: boolean;
      review?: boolean;
    };
  };
  documentType?: string;
  editorConfig?: {
    actionLink?: string;
    callbackUrl?: string;
    createUrl?: string;
    lang?: string;
    mode?: string;
    region?: string;
    user?: {
      id?: string;
      name?: string;
    };
    customization?: {
      autosave?: boolean;
      comments?: boolean;
      compactToolbar?: boolean;
      help?: boolean;
      hideRightMenu?: boolean;
      plugins?: boolean;
      toolbarNoTabs?: boolean;
      zoom?: number;
    };
  };
  events?: {
    onAppReady?: (event: any) => void;
    onDocumentStateChange?: (event: any) => void;
    onMetaChange?: (event: any) => void;
    onDocumentReady?: (event: any) => void;
    onInfo?: (event: any) => void;
    onWarning?: (event: any) => void;
    onError?: (event: any) => void;
    onRequestSharingSettings?: (event: any) => void;
    onRequestRename?: (event: any) => void;
    onMakeActionLink?: (event: any) => void;
    onRequestInsertImage?: (event: any) => void;
    onRequestSaveAs?: (event: any) => void;
    onRequestMailMergeRecipients?: (event: any) => void;
    onRequestCompareFile?: (event: any) => void;
    onRequestEditRights?: (event: any) => void;
    onRequestHistory?: (event: any) => void;
    onRequestHistoryClose?: (event: any) => void;
    onRequestHistoryData?: (event: any) => void;
    onRequestRestore?: (event: any) => void;
    onRequestSelectSpreadsheet?: (event: any) => void;
    onRequestSelectDocument?: (event: any) => void;
    onRequestUsers?: (event: any) => void;
  };
  height?: string;
  type?: string;
  width?: string;
}