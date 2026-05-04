import { notFound } from "next/navigation";
import { mockReports } from "@/lib/reports/mockReports";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditReportPage({ params }: Props) {
  const { id } = await params;
  const report = mockReports.find((item) => item.id === id);

  if (!report) {
    notFound();
  }

  return (
    <main>
      <h1>Edit Damage Report</h1>

      <Card>
        <form>
          <Input name="title" defaultValue={report.title} />
          <Input name="vehicle" defaultValue={report.vehicle} />
          <Textarea name="description" defaultValue={report.description} />

          <Button type="submit">Update report</Button>
        </form>
      </Card>
    </main>
  );
}
