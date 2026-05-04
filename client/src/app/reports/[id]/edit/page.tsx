import { notFound } from "next/navigation";
import { mockReports } from "@/lib/reports/mockReports";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { FeatureGate } from "@/lib/feature-flags/FeatureGate";
import { FLAGS } from "@/lib/feature-flags/flags";
import { getFeatureFlags } from "@/lib/feature-flags/getFeatureFlags";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditReportPage({ params }: Props) {
  const { id } = await params;
  const report = mockReports.find((item) => item.id === id);
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
        <form>
          <Stack>
            <Input name="title" defaultValue={report.title} />
            <Input name="vehicle" defaultValue={report.vehicle} />
            <Textarea name="description" defaultValue={report.description} />
            <FeatureGate flags={flags} flag={FLAGS.SHOW_PHOTO_UPLOAD}>
              <Input type="file" name="photo" />
            </FeatureGate>

            <Button type="submit">Update report</Button>
          </Stack>
        </form>
      </Card>
    </AppShell>
  );
}
