import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FeatureGate } from "@/lib/feature-flags/FeatureGate";
import { FLAGS } from "@/lib/feature-flags/flags";
import { getFeatureFlags } from "@/lib/feature-flags/getFeatureFlags";
import { getReport } from "@/lib/reports/api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ReportDetailPage({ params }: Props) {
  const { id } = await params;
  const report = await getReport(id);

  const flags = await getFeatureFlags();

  if (!report) {
    notFound();
  }

  return (
    <AppShell>
      <PageHeader
        title={report.title}
        description="Review the submitted vehicle damage report."
        action={
          <FeatureGate flags={flags} flag={FLAGS.ALLOW_REPORT_UPDATE}>
            <Link href={`/reports/${report.id}/edit`}>
              <Button>Edit report</Button>
            </Link>
          </FeatureGate>
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
          <FeatureGate flags={flags} flag={FLAGS.SHOW_DAMAGE_SEVERITY_BADGE}>
            <p>
              <strong>Severity:</strong> {report.damage_severity}
            </p>
          </FeatureGate>
          <FeatureGate flags={flags} flag={FLAGS.SHOW_INTERNAL_NOTES_PANEL}>
            <Card>
              <h2>Internal notes</h2>
              <p>Only visible when this flag is enabled.</p>
            </Card>
          </FeatureGate>
          <p>{report.description}</p>
        </Stack>
      </Card>
    </AppShell>
  );
}
