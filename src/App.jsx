import { Outlet } from "react-router-dom";
import SubmissionForm from "./components/SubmissionForm";
import CollectionProvider from "./hooks/CollectionProvider";
import CollectionMenu from "./components/CollectionMenu";

export default function App() {
  return (
    <CollectionProvider>
      <div className="drawer lg:drawer-open">
        <input id="drawer" type="checkbox" className="drawer-toggle"></input>
        <div className="drawer-content">
          {/* Page Content */}
          <header className="gap-4 navbar">
            <label htmlFor="drawer" className="btn btn-ghost lg:hidden">
              <i className="fa-solid fa-bars fa-lg"></i>
            </label>
            <h1 className="text-xl text-center font-semibold lg:hidden">
              DnD Card Creator
            </h1>
          </header>
          <main className="px-2">
            <Outlet />
          </main>
          <footer className="my-4 ">
            <p className="text-xs text-center">
              Copyright @ Zachary Maynor 2023
            </p>
          </footer>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          {/* sidebar content */}

          <div className="hidden my-4 px-4 lg:flex flex-col gap-4">
            <h1 className="text-xl font-semibold">DnD Card Creator</h1>
            <div className="px-2 flex flex-col gap-2">
              <SubmissionForm />
              <CollectionMenu />
            </div>
          </div>
        </div>
      </div>
    </CollectionProvider>
  );
}
