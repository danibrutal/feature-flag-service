import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { ReportForm } from "@/features/reports/ReportForm";
import { getFeatureFlags } from "@/lib/feature-flags/getFeatureFlags";
import { getReport } from "@/lib/reports/api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditReportPage({ params }: Props) {
  const { id } = await params;
  const report = await getReport(id);
  const flags = await getFeatureFlags();

  if (!report) {
    notFound();
  }

  return (
    <AppShell>
      <PageHeader
        title="Edit Damage Report"
        description={`Update details for ${report.vehicle}.`}
      />

      <Card>
        <ReportForm report={report} flags={flags} />
      </Card>
    </AppShell>
  );
}
