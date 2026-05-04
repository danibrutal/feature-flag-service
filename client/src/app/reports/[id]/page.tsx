import Link from "next/link";
import { notFound } from "next/navigation";
import { mockReports } from "@/lib/reports/mockReports";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Stack } from "@/components/layout/Stack";
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
    <AppShell>
      <PageHeader
        title={report.title}
        description="Review the submitted vehicle damage report."
        action={
          <Link href={`/reports/${report.id}/edit`}>
            <Button>Edit report</Button>
          </Link>
        }
      />

      <Card>
        <Stack>
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
        </Stack>
      </Card>
    </AppShell>
  );
}
