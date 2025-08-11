"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  // src/app/dashboard/gestao-projetos/page.tsx

  Calendar,
  FileArchive,
  FileDown,
  PlusCircle,
  Trash2,
  Layers,
  Clock,
  FolderOpenDot,
} from "lucide-react";

type ProjectFile = {
  id: string;
  name: string;
  category: "Ambiental" | "Educacional" | "Materiais Didáticos";
  size: number;
  url: string; // object URL (simulado)
  uploadedAt: string;
};

type ProjectEvent = {
  id: string;
  title: string;
  date: string; // ISO date yyyy-mm-dd
  time?: string;
  note?: string;
  projectRef?: string;
};

const eventSchema = z.object({
  title: z.string().min(2, "Título curto demais"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
  time: z.string().optional(),
  note: z.string().optional(),
  projectRef: z.string().optional(),
});

type EventForm = z.infer<typeof eventSchema>;

export default function GestaoProjetosPage() {
  // Biblioteca
  const [files, setFiles] = useState<ProjectFile[]>([]);

  function handleFilesUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list) return;
    const arr = Array.from(list).map((f) => {
      const id = cryptoRandomId();
      return {
        id,
        name: f.name,
        category: categorizeFileName(f.name),
        size: f.size,
        url: URL.createObjectURL(f),
        uploadedAt: new Date().toISOString(),
      } as ProjectFile;
    });
    setFiles((prev) => [...arr, ...prev]);
    e.currentTarget.value = "";
  }

  function removeFile(id: string) {
    setFiles((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.id !== id);
    });
  }

  // Agenda (events)
  const [events, setEvents] = useState<ProjectEvent[]>([]);

  const eventForm = useForm<EventForm>({
    resolver: zodResolver(eventSchema),
    defaultValues: { title: "", date: todayISO(), time: "", note: "" },
  });

  function addEvent(data: EventForm) {
    const ev: ProjectEvent = {
      id: cryptoRandomId(),
      title: data.title,
      date: data.date,
      time: data.time,
      note: data.note,
      projectRef: data.projectRef,
    };
    setEvents((prev) =>
      [...prev, ev].sort((a, b) => a.date.localeCompare(b.date))
    );
    eventForm.reset({ title: "", date: todayISO(), time: "", note: "" });
  }

  function removeEvent(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  // Calendar state
  const [cursor, setCursor] = useState(() => new Date());
  useEffect(() => {
    // keep time zeroed for consistent comparison
    const d = new Date(cursor);
    d.setHours(0, 0, 0, 0);
    setCursor(d);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const monthMatrix = useMemo(() => buildMonthMatrix(cursor), [cursor]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, ProjectEvent[]>();
    for (const ev of events) {
      const list = map.get(ev.date) ?? [];
      list.push(ev);
      map.set(ev.date, list);
    }
    return map;
  }, [events]);

  const [selectedDate, setSelectedDate] = useState<string>(todayISO());

  useEffect(() => {
    // keep selectedDate in month if possible
    const sel = new Date(selectedDate);
    if (
      sel.getMonth() !== cursor.getMonth() ||
      sel.getFullYear() !== cursor.getFullYear()
    ) {
      setSelectedDate(formatISODate(cursor));
    }
  }, [cursor, selectedDate]);

  // Derived list for selected day
  const selectedDayEvents = eventsByDate.get(selectedDate) ?? [];

  return (
    <div className="overflow-auto ml-3 h-[80vh] container p-6 bg-base-200">
      <header className="flex items-center gap-3">
        <FolderOpenDot size={32} />
        <div>
          <h1 className="text-2xl font-bold">Gestão de Projetos</h1>
          <p className="text-sm text-muted-foreground mb-2">
            Criar eventos, Armazenar aquivos de projeto, agenda.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-3">
        {/* Left column: calendar */}
        <div className="lg:col-span-1 bg-base-100 p-4 rounded-xl shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <h3 className="text-lg font-semibold">Agenda</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="btn btn-ghost btn-sm"
                onClick={() =>
                  setCursor(
                    (prev) =>
                      new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
                  )
                }
              >
                ◀
              </button>
              <div className="text-sm font-medium text-center">
                {cursor.toLocaleString(undefined, {
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() =>
                  setCursor(
                    (prev) =>
                      new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
                  )
                }
              >
                ▶
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-xs text-center mb-2">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
              <div key={d} className="font-medium text-muted-foreground">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {monthMatrix.map((row, rIdx) =>
              row.map((cell, cIdx) => {
                const cellISO = formatISODate(cell);
                const isCurrentMonth = cell.getMonth() === cursor.getMonth();
                const hasEvents = eventsByDate.has(cellISO);
                const isSelected = cellISO === selectedDate;
                return (
                  <button
                    key={`${rIdx}-${cIdx}`}
                    onClick={() => setSelectedDate(cellISO)}
                    className={`p-2 rounded-md text-left text-sm min-h-[56px] flex flex-col justify-between
                      ${isCurrentMonth ? "" : "opacity-50"}
                      ${
                        isSelected ? "ring-2 ring-primary" : "hover:bg-base-200"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{cell.getDate()}</span>
                      {hasEvents && <span className="badge badge-sm">●</span>}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {eventsByDate
                        .get(cellISO)
                        ?.slice(0, 2)
                        .map((e) => e.title)
                        .join(", ")}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Clock size={14} /> Eventos em {formatReadable(selectedDate)}
            </h4>
            <div className="mt-2 space-y-2">
              {selectedDayEvents.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  Nenhum evento
                </div>
              ) : (
                selectedDayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="flex items-start justify-between gap-2 bg-base-200 p-2 rounded"
                  >
                    <div>
                      <div className="font-medium">
                        {ev.title}{" "}
                        {ev.time ? (
                          <span className="text-xs text-muted-foreground">
                            — {ev.time}
                          </span>
                        ) : null}
                      </div>
                      {ev.note && (
                        <div className="text-xs text-muted-foreground">
                          {ev.note}
                        </div>
                      )}
                      {ev.projectRef && (
                        <div className="text-xs italic text-muted-foreground">
                          Ref: {ev.projectRef}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => removeEvent(ev.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Middle column: event form + library upload */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add Event */}
          <div className="bg-base-100 p-4 rounded-xl shadow">
            <div className="flex items-center gap-2 mb-3">
              <Layers size={18} />
              <h3 className="text-lg font-semibold">Adicionar Evento</h3>
            </div>
            <form
              onSubmit={eventForm.handleSubmit(addEvent)}
              className="grid md:grid-cols-4 gap-3 items-end"
            >
              <div className="md:col-span-2">
                <label className="label">
                  <span className="label-text">Título</span>
                </label>
                <input
                  {...eventForm.register("title")}
                  className="input input-bordered w-full"
                />
                {eventForm.formState.errors.title && (
                  <div className="text-xs text-error mt-1">
                    {String(eventForm.formState.errors.title.message)}
                  </div>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Data</span>
                </label>
                <input
                  type="date"
                  {...eventForm.register("date")}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Hora</span>
                </label>
                <input
                  type="time"
                  {...eventForm.register("time")}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="md:col-span-4">
                <label className="label">
                  <span className="label-text">Observações</span>
                </label>
                <input
                  {...eventForm.register("note")}
                  placeholder="Notas, link da reunião, local..."
                  className="input input-bordered w-full"
                />
              </div>

              <div className="md:col-span-3">
                <label className="label">
                  <span className="label-text">
                    Referência do Projeto (opcional)
                  </span>
                </label>
                <input
                  {...eventForm.register("projectRef")}
                  placeholder="ID ou nome do projeto"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="md:col-span-1">
                <button type="submit" className="btn btn-primary w-full">
                  <PlusCircle size={16} /> Adicionar
                </button>
              </div>
            </form>
          </div>

          {/* Biblioteca de Projetos */}
          <div className="bg-base-100 p-4 rounded-xl shadow">
            <div className="flex items-center gap-2 mb-3">
              <FileArchive size={18} />
              <h3 className="text-lg font-semibold">Biblioteca de Projetos</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-3 items-end">
              <div className="md:col-span-2">
                <label className="label">
                  <span className="label-text">Selecionar arquivos</span>
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFilesUpload}
                  className="file-input file-input-bordered w-full"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Aceita vários arquivos — simulação local (arquivos não
                  persistidos).
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Categoria padrão</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  defaultValue="Materiais Didáticos"
                  onChange={() => {}}
                >
                  <option>Ambiental</option>
                  <option>Educacional</option>
                  <option>Materiais Didáticos</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              {files.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  Nenhum arquivo enviado
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table table-compact w-full">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Enviado</th>
                        <th>Size</th>
                        <th className="text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map((f) => (
                        <tr key={f.id}>
                          <td>{f.name}</td>
                          <td>{f.category}</td>
                          <td>{new Date(f.uploadedAt).toLocaleString()}</td>
                          <td>{formatBytes(f.size)}</td>
                          <td className="text-right">
                            <a
                              className="btn btn-ghost btn-xs mr-2"
                              href={f.url}
                              download={f.name}
                            >
                              <FileDown size={14} />
                            </a>
                            <button
                              className="btn btn-ghost btn-xs"
                              onClick={() => removeFile(f.id)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="mt-3 text-sm text-muted-foreground">
              Biblioteca organizada por categorias — pronto para integrar com
              storage (S3/Backblaze/Neon).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Helpers -------------------- */

function cryptoRandomId() {
  // Purista: usa Web Crypto se disponível
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof crypto !== "undefined" && (crypto as any).randomUUID) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (crypto as any).randomUUID();
  }
  return Math.random().toString(36).slice(2, 9);
}

function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return formatISODate(d);
}
function formatISODate(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function formatReadable(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}

function buildMonthMatrix(cursor: Date) {
  // Returns array of 6 rows × 7 days (Date instances) covering the month grid
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startDay = firstOfMonth.getDay(); // 0..6 (Sun..Sat)
  // Start from previous month's tail
  const startDate = new Date(year, month, 1 - startDay);
  const matrix: Date[][] = [];
  // eslint-disable-next-line prefer-const
  let current = new Date(startDate);
  for (let r = 0; r < 6; r++) {
    const row: Date[] = [];
    for (let c = 0; c < 7; c++) {
      row.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    matrix.push(row);
  }
  return matrix;
}

function categorizeFileName(name: string): ProjectFile["category"] {
  const lower = name.toLowerCase();
  if (
    lower.includes("ambient") ||
    lower.includes("meio") ||
    lower.includes("ecologia")
  )
    return "Ambiental";
  if (
    lower.includes("prof") ||
    lower.includes("curso") ||
    lower.includes("didat")
  )
    return "Materiais Didáticos";
  return "Educacional";
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const v = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  return `${v} ${sizes[i]}`;
}
