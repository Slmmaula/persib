export function StubPage({ title }: { title: string }) {
  return (
    <section className="container-page pb-24 pt-header">
      <h1 className="font-semibold text-section">{title}</h1>
      <p className="mt-4 text-muted">
        Halaman ini dibangun di langkah berikutnya.
      </p>
    </section>
  );
}
