import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FeatureGate } from "@/lib/feature-flags/FeatureGate";
import { getFeatureFlags } from "@/lib/feature-flags/getFeatureFlags";
import { FLAGS } from "@/lib/feature-flags/flags";
import { getReports } from "@/lib/reports/api";

export default async function ReportsPage() {
  const flags = await getFeatureFlags();
  const reports = await getReports();

  return (
    <AppShell>
      <PageHeader
        title="Car Damage Reports"
        description="Create, review and update vehicle damage reports."
        action={
          <FeatureGate flags={flags} flag={FLAGS.ALLOW_REPORT_CREATE}>
            <Link href="/reports/new">
              <Button>Create report</Button>
            </Link>
          </FeatureGate>
        }
      />

      <Stack>
        {reports.map((report) => (
          <Card key={report.id}>
            <Stack>
              <div>
                <h2>{report.title}</h2>
                <p>{report.vehicle}</p>
              </div>

              <Badge>{report.status}</Badge>
              <p>{report.description}</p>

              <Link href={`/reports/${report.id}`}>View report</Link>
            </Stack>
          </Card>
        ))}
      </Stack>
    </AppShell>
  );
}
