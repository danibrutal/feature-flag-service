import Link from "next/link";
import { mockReports } from "@/lib/reports/mockReports";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function ReportsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Car Damage Reports"
        description="Create, review and update vehicle damage reports."
        action={
          <Link href="/reports/new">
            <Button>Create report</Button>
          </Link>
        }
      />

      <Stack>
        {mockReports.map((report) => (
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
