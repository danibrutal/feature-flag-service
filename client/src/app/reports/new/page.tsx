import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export default function NewReportPage() {
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

            <Button type="submit">Submit report</Button>
          </Stack>
        </form>
      </Card>
    </AppShell>
  );
}
