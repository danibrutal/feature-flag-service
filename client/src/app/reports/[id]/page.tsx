import Link from "next/link";
import { notFound } from "next/navigation";
import { mockReports } from "@/lib/reports/mockReports";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ReportDetailPage({ params }: Props) {
  const { id } = await params;
  const report = mockReports.find((item) => item.id === id);

  if (!report) {
    notFound();
  }

  return (
    <main>
      <h1>{report.title}</h1>

      <Card>
        <p>
          <strong>Vehicle:</strong> {report.vehicle}
        </p>
        <p>
          <strong>Status:</strong> <Badge>{report.status}</Badge>
        </p>
        <p>
          <strong>Severity:</strong> {report.damageSeverity}
        </p>
        <p>{report.description}</p>

        <Link href={`/reports/${report.id}/edit`}>
          <Button>Edit report</Button>
        </Link>
      </Card>
    </main>
  );
}
