import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <header className=" my-4">DnD Card Creator</header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
