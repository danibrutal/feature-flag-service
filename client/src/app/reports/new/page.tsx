import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { ReportForm } from "@/features/reports/ReportForm";
import { getFeatureFlags } from "@/lib/feature-flags/getFeatureFlags";

export default async function NewReportPage() {
  const flags = await getFeatureFlags();

  return (
    <AppShell>
      <PageHeader
        title="Create Damage Report"
        description="Capture the vehicle, damage details and current report status."
      />

      <Card>
        <ReportForm flags={flags} />
      </Card>
    </AppShell>
  );
}
