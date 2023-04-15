import { useStore } from "zustand";
import { Layout } from "../../layout";
import { AppDocument, appStore } from "../../stores/appStore";

type DocumentViewProps = {
  doc: AppDocument;
};

const DocumentView = ({ doc }: DocumentViewProps) => {
  return (
    <div>
      <div>{doc.name}</div>
      <div>{doc.description}</div>
    </div>
  );
};

export const IndexPage = () => {
  const { documents } = useStore(appStore);

  return (
    <Layout>
      <div className="bg-slate-900 text-white h-full overflow-auto flex flex-col items-center p-4">
        {documents.map((doc) => {
          return (
            <>
              <DocumentView doc={doc} key={doc.id} />
            </>
          );
        })}
      </div>
    </Layout>
  );
};
