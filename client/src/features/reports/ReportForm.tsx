"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { FeatureGate } from "@/lib/feature-flags/FeatureGate";
import { FLAGS } from "@/lib/feature-flags/flags";
import type { FeatureFlags } from "@/lib/feature-flags/types";
import {
  createReport,
  updateReport,
  type DamageReport,
} from "@/lib/reports/api";

type Props = {
  report?: DamageReport;
  flags: FeatureFlags;
};

export function ReportForm({ report, flags }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(report);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);

    const payload = {
      title: String(formData.get("title")),
      vehicle: String(formData.get("vehicle")),
      description: String(formData.get("description")),
      damage_severity: String(formData.get("damage_severity")) as
        | "low"
        | "medium"
        | "high",
    };

    try {
      if (report) {
        await updateReport(String(report.id), payload);
        router.push(`/reports/${report.id}`);
      } else {
        const createdReport = await createReport(payload);
        router.push(`/reports/${createdReport.id}`);
      }

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        {error && <p>{error}</p>}

        <Input
          name="title"
          placeholder="Report title"
          defaultValue={report?.title}
          required
        />

        <Input
          name="vehicle"
          placeholder="Vehicle"
          defaultValue={report?.vehicle}
          required
        />

        <select
          name="damage_severity"
          defaultValue={report?.damage_severity ?? "low"}
          required
        >
          <option value="low">Low severity</option>
          <option value="medium">Medium severity</option>
          <option value="high">High severity</option>
        </select>

        <Textarea
          name="description"
          placeholder="Describe the damage"
          defaultValue={report?.description}
          required
        />

        <FeatureGate flags={flags} flag={FLAGS.SHOW_PHOTO_UPLOAD}>
          <Input type="file" name="photo" />
        </FeatureGate>

        <Button type="submit">
          {isEditing ? "Update report" : "Create report"}
        </Button>
      </Stack>
    </form>
  );
}
