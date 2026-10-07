interface ClubPageProps {
  params: {
    clubId: string;
  };
}

export default function ClubDetailPage({ params }: ClubPageProps) {
  return (
    <section className="container mx-auto px-4 md:px-6 py-20">
      <h1 className="text-3xl font-bold tracking-tight">Club: {params.clubId}</h1>
      <p className="mt-4 text-muted-foreground">This is a placeholder club details page for {params.clubId}.</p>
    </section>
  );
}
