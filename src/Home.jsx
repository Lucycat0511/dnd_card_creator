import SpellCardContainer from "./components/SpellCardContainer";
import SubmissionForm from "./components/SubmissionForm";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="lg:hidden">
        <SubmissionForm />
      </div>
      <SpellCardContainer />
    </div>
  );
}
