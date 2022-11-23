import { render } from "@testing-library/react";
import React from "react";
import HeaderColumn from "../TulevaHeaderColumn/TulevaHeaderColumn";
import TulevaPage from "../TulevaPage/TulevaPage";
import { IBaseEntity } from "../../types";
import TulevaEditor from "../TulevaEditor/";
import TulevaMetaData from "../TulevaMetaData/TulevaMetaData";
import TulevaPageHeader from "../TulevaPageHeader/TulevaPageHeader";

const item2: IBaseEntity = {
  id: "test2",
  createdBy: { userID: "test2", name: "test2", email: "test2" },
  editedBy: { userID: "test2", name: "test2", email: "test2" },
  isDirty: false,
};

let items = [
  {
    id: "1",
    subject: "Wert 1",
    description:
      "A - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, recusandae neque! Corporis distinctio atque natus ea molestias in doloribus, ratione eius, tenetur aliquam saepe aspernatur dicta rem voluptas error nam.",
  },
  {
    id: "2",
    subject: "Wert 2",
    description:
      "B - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, recusandae neque! Corporis distinctio atque natus ea molestias in doloribus, ratione eius, tenetur aliquam saepe aspernatur dicta rem voluptas error nam.",
  },
  {
    id: "3",
    subject: "Wert 3",
    description:
      "E - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, recusandae neque! Corporis distinctio atque natus ea molestias in doloribus, ratione eius, tenetur aliquam saepe aspernatur dicta rem voluptas error nam.",
  },
];

describe("header column matches snapshot", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(
      <HeaderColumn
        sortField="test"
        sortDescending={true}
        sortState="test"
        onClick={() => {}}
      >
        Test
      </HeaderColumn>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("header page matches snapshot", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<TulevaMetaData item={item2} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("Header Column", () => {
  it("is truthy", () => {
    expect(HeaderColumn).toBeTruthy();
  });
});

describe("Page Header", () => {
  it("is truthy", () => {
    expect(TulevaPageHeader).toBeTruthy();
  });
});

describe("Meta Data", () => {
  it("is truthy", () => {
    expect(TulevaMetaData).toBeTruthy();
  });
});

describe("Page", () => {
  it("is truthy", () => {
    expect(TulevaPage).toBeTruthy();
  });
});

describe("Tuleva Editor", () => {
  it("is truthy", () => {
    expect(TulevaEditor).toBeTruthy();
  });
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const renderViewer = (item: any) => {
  return <></>;
};

const renderEditor = (item: any) => {
  return <>{item}</>;
};

const renderListHeader = () => {
  return <></>;
};

const renderFilter = () => {
  return <></>;
};
describe("header page matches snapshot", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(
      <TulevaPage
        dataSource={items}
        loading={false}
        onAddNew={() => {}}
        onDelete={() => {}}
        onExit={() => {}}
        onSave={() => {}}
        onRenderView={(item) => renderViewer(item)}
        onRenderEdit={(item) => renderEditor(item)}
        onRenderListHeader={() => renderListHeader()}
        onRenderFilter={() => renderFilter()}
        createRights={true}
        deleteRights={false}
        editRights={false}
        listRights={true}
        caption={"Tests"}
        helpTopic="news"
        showAsModal={true}
        hideCopyButton={true}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
