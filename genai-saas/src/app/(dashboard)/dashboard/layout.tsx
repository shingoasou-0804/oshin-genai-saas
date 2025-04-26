import Link from "next/link";


export default function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex items-center h-16 px-4">
            <Link href="/">
                <h1 className="text-lg font-bold">AI Images Generator</h1>
            </Link>
        </div>
      </header>

      {/* dashboard */}
      <div>
        {/* sidebar */}
        <aside>
            <div></div>
        </aside>

        {/* main contents */}
        <main>{children}</main>
      </div>
    </div>
  );
}
