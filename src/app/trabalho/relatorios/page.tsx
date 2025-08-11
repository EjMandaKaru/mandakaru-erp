"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserPlus,
  Users,
  FilePlus,
  FileText,
  Download,
  Trash2,
  Calendar,
  LogOut,
  ClipboardList,
} from "lucide-react";

/* ---------------- Types ---------------- */

type Member = {
  id: string;
  name: string;
  email?: string;
  enrolledAt: string; // ISO
  status: "active" | "inactive";
  offboardDate?: string; // ISO
  offboardReason?: string;
};

type AttendanceRecord = {
  id: string;
  memberId: string;
  date: string; // ISO yyyy-mm-dd
  status: "present" | "absent";
  note?: string;
};

type Doc = {
  id: string;
  name: string;
  category: "Termo de compromisso" | "Termo de retirada" | "Ata";
  uploadedAt: string;
  url: string;
  memberId?: string | null;
};

/* ---------------- Schemas ---------------- */

const memberSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email().optional(),
});

type MemberForm = z.infer<typeof memberSchema>;

const attendanceSchema = z.object({
  memberId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: z.enum(["present", "absent"]),
  note: z.string().optional(),
});

type AttendanceForm = z.infer<typeof attendanceSchema>;

/* ---------------- Component ---------------- */

export default function GestaoMembrosPage() {
  // members
  const [members, setMembers] = useState<Member[]>([
    // exemplo inicial
    {
      id: cryptoId(),
      name: "Ana Silva",
      email: "ana@exemplo.com",
      enrolledAt: new Date().toISOString(),
      status: "active",
    },
    {
      id: cryptoId(),
      name: "Pedro Souza",
      email: "pedro@exemplo.com",
      enrolledAt: new Date().toISOString(),
      status: "active",
    },
  ]);

  const memberForm = useForm<MemberForm>({
    resolver: zodResolver(memberSchema),
    defaultValues: { name: "", email: "" },
  });

  function addMember(data: MemberForm) {
    const m: Member = {
      id: cryptoId(),
      name: data.name,
      email: data.email,
      enrolledAt: new Date().toISOString(),
      status: "active",
    };
    setMembers((p) => [m, ...p]);
    memberForm.reset();
  }

  function offboardMember(id: string, date: string, reason?: string) {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status: "inactive",
              offboardDate: date,
              offboardReason: reason,
            }
          : m
      )
    );
  }

  function reinstateMember(id: string) {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status: "active",
              offboardDate: undefined,
              offboardReason: undefined,
            }
          : m
      )
    );
  }

  function removeMember(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    // Optionally remove related docs/attendance — not done here to keep data for reports
  }

  // attendance
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

  const attendanceForm = useForm<AttendanceForm>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      memberId: members[0]?.id ?? "",
      date: todayISO(),
      status: "present",
      note: "",
    },
  });

  function addAttendance(data: AttendanceForm) {
    setAttendance((p) => [
      ...p,
      {
        id: cryptoId(),
        memberId: data.memberId,
        date: data.date,
        status: data.status,
        note: data.note,
      },
    ]);
    attendanceForm.reset({
      memberId: data.memberId,
      date: data.date,
      status: "present",
      note: "",
    });
  }

  function removeAttendance(id: string) {
    setAttendance((p) => p.filter((a) => a.id !== id));
  }

  // docs
  const [docs, setDocs] = useState<Doc[]>([]);

  function handleDocUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    memberId?: string | null
  ) {
    const list = e.target.files;
    if (!list) return;
    const arr = Array.from(list).map((f) => {
      const id = cryptoId();
      return {
        id,
        name: f.name,
        category: categorizeByName(f.name),
        uploadedAt: new Date().toISOString(),
        url: URL.createObjectURL(f),
        memberId: memberId ?? null,
      } as Doc;
    });
    setDocs((p) => [...arr, ...p]);
    e.currentTarget.value = "";
  }

  function removeDoc(id: string) {
    const doc = docs.find((d) => d.id === id);
    if (doc) URL.revokeObjectURL(doc.url);
    setDocs((p) => p.filter((d) => d.id !== id));
  }

  // Reports - month selection
  const [reportMonth, setReportMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; // yyyy-mm
  });

  const reportData = useMemo(() => {
    const [y, m] = reportMonth.split("-").map(Number);
    const start = new Date(y, m - 1, 1);
    const end = new Date(y, m, 0); // last day

    const inRange = (isoDate: string) => {
      const d = new Date(isoDate + "T00:00:00");
      return d >= start && d <= end;
    };

    // attendance summary per member
    const summary = members.map((mem) => {
      const memAttendance = attendance.filter(
        (a) => a.memberId === mem.id && inRange(a.date)
      );
      const present = memAttendance.filter(
        (x) => x.status === "present"
      ).length;
      const absent = memAttendance.filter((x) => x.status === "absent").length;
      return { member: mem, present, absent, records: memAttendance };
    });

    const monthDocs = docs.filter((d) => inRange(d.uploadedAt.split("T")[0]));
    const monthOffboards = members.filter(
      (m) => m.offboardDate && inRange(m.offboardDate)
    );

    return { summary, monthDocs, monthOffboards, start, end };
  }, [reportMonth, members, attendance, docs]);

  function downloadCSVReport() {
    const { summary, monthDocs, monthOffboards, start, end } = reportData;
    const lines: string[] = [];
    lines.push(
      `Relatório de Membros,Período,${formatDate(start)} a ${formatDate(end)}`
    );
    lines.push("");
    lines.push("Resumo de Presença");
    lines.push("Nome,Email,Presentes,Faltas");
    for (const s of summary) {
      lines.push(
        `${escapeCsv(s.member.name)},${escapeCsv(s.member.email ?? "")},${
          s.present
        },${s.absent}`
      );
    }
    lines.push("");
    lines.push("Desligamentos");
    lines.push("Nome,Data,Motivo");
    for (const d of monthOffboards) {
      lines.push(
        `${escapeCsv(d.name)},${d.offboardDate ?? ""},${escapeCsv(
          d.offboardReason ?? ""
        )}`
      );
    }
    lines.push("");
    lines.push("Documentos Enviados");
    lines.push("Nome,Categoria,AnexadoPor,Data");
    for (const f of monthDocs) {
      const member = members.find((m) => m.id === f.memberId);
      lines.push(
        `${escapeCsv(f.name)},${f.category},${escapeCsv(member?.name ?? "—")},${
          f.uploadedAt
        }`
      );
    }

    const blob = new Blob([lines.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio_membros_${reportMonth}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ---------------- Render ---------------- */

  return (
    <div className="overflow-auto ml-3 h-[80vh] container bg-base-200 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center gap-3">
          <Users size={32} />
          <div>
            <h1 className="text-2xl font-bold">Gestão de Membros</h1>
            <p className="text-sm text-muted-foreground">
              Cadastro, presença, desligamentos, documentos e relatórios.
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: cadastro / docs upload */}
          <div className="lg:col-span-1 space-y-4">
            {/* add member */}
            <div className="bg-base-100 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2 mb-3">
                <UserPlus size={18} />
                <h3 className="font-semibold">Cadastrar Membro</h3>
              </div>
              <form
                onSubmit={memberForm.handleSubmit(addMember)}
                className="space-y-3"
              >
                <input
                  className="input input-bordered w-full"
                  placeholder="Nome"
                  {...memberForm.register("name")}
                />
                <input
                  className="input input-bordered w-full"
                  placeholder="Email (opcional)"
                  {...memberForm.register("email")}
                />
                <div className="flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    Cadastrar
                  </button>
                </div>
              </form>
            </div>

            {/* upload doc */}
            <div className="bg-base-100 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2 mb-3">
                <FilePlus size={18} />
                <h3 className="font-semibold">Upload de Documentos</h3>
              </div>
              <div className="space-y-2">
                <label className="label">
                  <span className="label-text">
                    Selecione Membro (opcional)
                  </span>
                </label>
                <select
                  className="select select-bordered w-full"
                  id="doc-member-select"
                >
                  <option value="">— Nenhum —</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>

                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={(e) => {
                    const sel = (
                      document.getElementById(
                        "doc-member-select"
                      ) as HTMLSelectElement
                    )?.value;
                    handleDocUpload(e, sel ?? null);
                  }}
                />

                <div className="text-xs text-muted-foreground">
                  Categorias detectadas automaticamente; arquivos ficam locais
                  (simulação).
                </div>
              </div>
            </div>

            {/* reports */}
            <div className="bg-base-100 p-4 rounded-xl shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ClipboardList size={18} />
                  <h3 className="font-semibold">Relatório Mensal</h3>
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="month"
                    value={reportMonth}
                    onChange={(e) => setReportMonth(e.target.value)}
                    className="input input-bordered input-sm"
                  />
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={downloadCSVReport}
                  >
                    <Download size={14} /> CSV
                  </button>
                </div>
              </div>

              <div className="mt-3 text-sm text-muted-foreground">
                Gera CSV com resumo de presença, desligamentos e documentos do
                mês. Quer Excel/PDF real? Posso integrar SheetJS / jsPDF.
              </div>
            </div>
          </div>

          {/* Middle: attendance form + list */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-base-100 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={18} />
                <h3 className="font-semibold">Registrar Presença / Falta</h3>
              </div>

              <form
                onSubmit={attendanceForm.handleSubmit(addAttendance)}
                className="grid md:grid-cols-4 gap-3 items-end"
              >
                <div className="md:col-span-1">
                  <label className="label">
                    <span className="label-text">Membro</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...attendanceForm.register("memberId")}
                  >
                    <option value="">Selecione</option>
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Data</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    {...attendanceForm.register("date")}
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...attendanceForm.register("status")}
                  >
                    <option value="present">Presente</option>
                    <option value="absent">Falta</option>
                  </select>
                </div>
                <div>
                  <button type="submit" className="btn btn-primary w-full">
                    Registrar
                  </button>
                </div>

                <div className="md:col-span-4">
                  <label className="label">
                    <span className="label-text">Observação (opcional)</span>
                  </label>
                  <input
                    className="input input-bordered w-full"
                    {...attendanceForm.register("note")}
                  />
                </div>
              </form>

              {/* attendance list */}
              <div className="mt-4">
                <h4 className="font-medium">Últimos Registros</h4>
                <div className="mt-2 space-y-2">
                  {attendance.length === 0 ? (
                    <div className="text-sm text-muted-foreground">
                      Nenhum registro
                    </div>
                  ) : (
                    attendance
                      .slice()
                      .reverse()
                      .map((a) => {
                        const m = members.find((x) => x.id === a.memberId);
                        return (
                          <div
                            key={a.id}
                            className="flex items-center justify-between bg-base-200 p-2 rounded"
                          >
                            <div>
                              <div className="font-medium">
                                {m?.name ?? "—"}{" "}
                                <span className="text-xs text-muted-foreground">
                                  ({a.date})
                                </span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {a.status === "present" ? "Presente" : "Falta"}{" "}
                                {a.note ? `— ${a.note}` : ""}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                className="btn btn-ghost btn-xs"
                                onClick={() => removeAttendance(a.id)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              </div>
            </div>

            {/* member list + offboard */}
            <div className="bg-base-100 p-4 rounded-xl shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <h3 className="font-semibold">Membros</h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  {members.length} cadastrados
                </div>
              </div>

              <div className="space-y-2">
                {members.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between gap-3 bg-base-200 p-3 rounded"
                  >
                    <div>
                      <div className="font-medium">
                        {m.name}{" "}
                        {m.status === "inactive" && (
                          <span className="text-xs text-error">
                            {" "}
                            (Desligado)
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {m.email ?? "—"} • Cadastrado{" "}
                        {formatDate(new Date(m.enrolledAt))}
                      </div>
                      {m.offboardDate && (
                        <div className="text-xs text-muted-foreground">
                          Desligado em {formatDate(new Date(m.offboardDate))} —{" "}
                          {m.offboardReason}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {m.status === "active" ? (
                        <>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => {
                              const date = prompt(
                                "Data de desligamento (YYYY-MM-DD)",
                                todayISO()
                              );
                              if (!date) return;
                              const reason = prompt(
                                "Motivo do desligamento (opcional)"
                              );
                              offboardMember(m.id, date, reason ?? "");
                            }}
                            title="Desligar membro"
                          >
                            <LogOut size={14} />
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => reinstateMember(m.id)}
                        >
                          Reintegrar
                        </button>
                      )}

                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => {
                          if (confirm("Remover membro permanentemente?"))
                            removeMember(m.id);
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* documents list */}
            <div className="bg-base-100 p-4 rounded-xl shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileText size={18} />
                  <h3 className="font-semibold">Documentos</h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  {docs.length} arquivos
                </div>
              </div>

              <div className="space-y-2">
                {docs.length === 0 ? (
                  <div className="text-sm text-muted-foreground">
                    Nenhum documento
                  </div>
                ) : (
                  docs.map((d) => {
                    const m = members.find((x) => x.id === d.memberId);
                    return (
                      <div
                        key={d.id}
                        className="flex items-center justify-between bg-base-200 p-2 rounded"
                      >
                        <div>
                          <div className="font-medium">{d.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {d.category} • {m?.name ?? "—"} •{" "}
                            {formatDate(new Date(d.uploadedAt))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            className="btn btn-ghost btn-xs"
                            href={d.url}
                            download={d.name}
                          >
                            <Download size={14} />
                          </a>
                          <button
                            className="btn btn-ghost btn-xs"
                            onClick={() => removeDoc(d.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Helpers ---------------- */

function cryptoId() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof crypto !== "undefined" && (crypto as any).randomUUID)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (crypto as any).randomUUID();
  return Math.random().toString(36).slice(2, 9);
}

function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDate(d: Date | string) {
  const dt = typeof d === "string" ? new Date(d) : d;
  return dt.toLocaleDateString();
}

function categorizeByName(name: string): Doc["category"] {
  const lower = name.toLowerCase();
  if (lower.includes("termo") && lower.includes("compromisso"))
    return "Termo de compromisso";
  if (lower.includes("termo") && lower.includes("retirada"))
    return "Termo de retirada";
  if (
    lower.includes("ata") ||
    lower.includes("atas") ||
    lower.includes("reuni")
  )
    return "Ata";
  // fallback: try extension-based heuristics
  if (lower.endsWith(".pdf")) return "Ata";
  return "Ata";
}

function escapeCsv(s: string) {
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}
