import Link from "next/link";
import { mockReports } from "@/lib/reports/mockReports";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function ReportsPage() {
  return (
    <main>
      <h1>Car Damage Reports</h1>

      <Link href="/reports/new">
        <Button>Create report</Button>
      </Link>

      {mockReports.map((report) => (
        <Card key={report.id}>
          <h2>{report.title}</h2>
          <p>{report.vehicle}</p>
          <Badge>{report.status}</Badge>

          <p>{report.description}</p>

          <Link href={`/reports/${report.id}`}>View report</Link>
        </Card>
      ))}
    </main>
  );
}
