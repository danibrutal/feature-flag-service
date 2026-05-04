import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export default function NewReportPage() {
  return (
    <main>
      <h1>Create Damage Report</h1>

      <Card>
        <form>
          <Input name="title" placeholder="Report title" />
          <Input name="vehicle" placeholder="Vehicle" />
          <Textarea name="description" placeholder="Describe the damage" />

          <Button type="submit">Submit report</Button>
        </form>
      </Card>
    </main>
  );
}
