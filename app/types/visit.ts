import type { ScheduleRow } from "~/utils/schedule";

export interface VisitContact {
    label: string;
    value: string;
    href: string;
    icon: string;
}

export interface VisitSocial {
    label: string;
    href: string;
    icon: string;
}

export interface VisitData {
    schedule: ScheduleRow[];
    contacts: VisitContact[];
    socials: VisitSocial[];
}
