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

export default async function NewReportPage() {
  const flags = await getFeatureFlags();
  return (
    <AppShell>
      <PageHeader
        title="Create Damage Report"
        description="Capture the vehicle, damage details and current report status."
      />

      <Card>
        <form>
          <Stack>
            <Input name="title" placeholder="Report title" />
            <Input name="vehicle" placeholder="Vehicle" />
            <Textarea name="description" placeholder="Describe the damage" />

            <FeatureGate flags={flags} flag={FLAGS.SHOW_PHOTO_UPLOAD}>
              <Input type="file" name="photo" />
            </FeatureGate>

            <Button type="submit">Submit report</Button>
          </Stack>
        </form>
      </Card>
    </AppShell>
  );
}
