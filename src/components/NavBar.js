export default function NavBar() {
  return (
    <div className="bg-white">
      <div className="container mx-auto flex gap-2 justify-between items-center h-12">
        <div className="flex items-center gap-2">
          <img
            src="https://flowbite.com/images/logo.svg"
            alt="https://flowbite.com/images/logo.svg"
          />
          <span className="text-xl font-medium uppercase">
            Flowbite Dark Remover
          </span>
        </div>
        <nav className="flex items-center">
          <a
            href="http://santokhan.github.io"
            className="font-medium hover:underline hover:underline-offset-4 decoration-2"
          >
            Home
          </a>
        </nav>
      </div>
    </div>
  );
}
