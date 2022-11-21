import { IBaseEntity } from "./../types/baseEntity";
import { useState } from "react";
import { createContainer } from "react-tracked";

export type sharedContextState = {
  isValid: boolean;
  item: IBaseEntity;
};

const useContextState = () =>
  useState<sharedContextState>({ isValid: false, item: {} });

export const {
  Provider: EditorContextProvider,
  useTrackedState: useEditorContext,
  useUpdate: useSetEditorContext,
} = createContainer(useContextState);
