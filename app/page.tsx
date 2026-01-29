import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="max-w-md mx-auto bg=blue"> 
        <h1>CPRG 306: Web Development 2 Assignments</h1>

        <p style={{ marginTop: "12px" }}>
          <Link href="/week-2">Go to week 2</Link>
        </p>

        <p>
          <Link href="/week-3">Go to week 3</Link>
        </p>
      </main>
    </div>
  );
}

