export default function WelcomeBanner() {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg">
      <h2 className="text-3xl font-bold">
        Welcome to Mr. Prompt Studio
      </h2>

      <p className="mt-3 max-w-3xl text-blue-100">
        Build, improve, evaluate, convert and standardize prompts across your
        organization using enterprise prompt engineering best practices.
      </p>
    </section>
  );
}