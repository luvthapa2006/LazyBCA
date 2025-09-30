import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-4">
          <Image src="/logo.png" alt="LazyBCA Logo" width={50} height={50} />
          {/* Changed the title here */}
          <span className="text-2xl font-bold text-cyan-400">
            LazyBCA
          </span>
        </Link>
      </nav>
    </header>
  );
}