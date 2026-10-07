interface EventPageProps {
  params: {
    eventId: string;
  };
}

export default function EventDetailPage({ params }: EventPageProps) {
  return (
    <section className="container mx-auto px-4 md:px-6 py-20">
      <h1 className="text-3xl font-bold tracking-tight">Event: {params.eventId}</h1>
      <p className="mt-4 text-muted-foreground">This is a placeholder event details page for {params.eventId}.</p>
    </section>
  );
}
