function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8 shadow-sm">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800">
          Enterprise Prompt Engineering Platform
        </h2>
      </div>

      <div className="rounded-full bg-blue-600 px-4 py-2 text-white">
        MVP
      </div>
    </header>
  );
}

export default Header;