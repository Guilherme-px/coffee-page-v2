export interface ScheduleRow {
    days: number[];
    label: string;
    open: string;
    close: string;
}

export function findTodayIndex(rows: ScheduleRow[], day: number): number {
    return rows.findIndex((row) => row.days.includes(day));
}
