const TIMEZONE = "America/Toronto";

const WEEKDAY = { open: 7, close: 19 };
const WEEKEND = { open: 8, close: 18 };

const DAYS = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
} as const;

const pad = (n: number) => String(n).padStart(2, "0");

export interface ClockParts {
    day: number;
    hour: number;
    minute: number;
}

export function cafeClock(date: Date, tz = TIMEZONE): ClockParts {
    const fmt = new Intl.DateTimeFormat("en-CA", {
        timeZone: tz,
        hourCycle: "h23",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
    const get = (type: string) =>
        fmt.formatToParts(date).find((p) => p.type === type)?.value ?? "";

    return {
        day: DAYS[get("weekday") as keyof typeof DAYS],
        hour: Number(get("hour")),
        minute: Number(get("minute")),
    };
}

export function isOpenAt({ day, hour, minute }: ClockParts): boolean {
    const { open, close } = day === 0 || day === 6 ? WEEKEND : WEEKDAY;
    const h = hour + minute / 60;
    return h >= open && h < close;
}

export function useOpenStatus() {
    const now = ref<Date | null>(null);
    let timer: ReturnType<typeof setInterval> | undefined;

    onMounted(() => {
        now.value = new Date();
        timer = setInterval(() => (now.value = new Date()), 30_000);
    });
    onScopeDispose(() => clearInterval(timer));

    const clock = computed(() => (now.value ? cafeClock(now.value) : null));
    const isOpen = computed(() =>
        clock.value ? isOpenAt(clock.value) : false,
    );
    const label = computed(() => {
        if (!clock.value) return "--:--";
        return `${pad(clock.value.hour)}:${pad(clock.value.minute)}`;
    });

    return { isOpen, label };
}
