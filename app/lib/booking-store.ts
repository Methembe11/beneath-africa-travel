"use client";

import { useSyncExternalStore } from "react";
import type { BookingPayload } from "./submit-booking";

export type TripOverride = {
  arrival?: string;
  departure?: string;
  adults?: number;
  children?: number;
};
export type BookingItem = { slug: string; overrides?: TripOverride };
export type Trip = {
  arrival?: string;
  departure?: string;
  flexibleDates: boolean;
  adults?: number;
  children?: number;
  sizeUnconfirmed: boolean;
};
export type Contact = { name: string; email: string; phone?: string; notes?: string };
export type Step = 1 | 2 | 3 | 4 | 5;

export type BookingState = {
  open: boolean;
  step: Step;
  items: BookingItem[];
  trip: Trip;
  contact: Contact;
  submitting: boolean;
  error: string | null;
  lastSent?: BookingPayload;
};

const STORAGE_KEY = "ba-booking";
const LEGACY_KEY = "ba-enquiry";

const EMPTY_CONTACT: Contact = { name: "", email: "", phone: "", notes: "" };
const DEFAULT_TRIP: Trip = { flexibleDates: false, sizeUnconfirmed: false };

let state: BookingState = {
  open: false,
  step: 1,
  items: [],
  trip: DEFAULT_TRIP,
  contact: EMPTY_CONTACT,
  submitting: false,
  error: null,
};

let loaded = false;
const listeners = new Set<() => void>();

function storage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

function persist(): void {
  const store = storage();
  if (!store) return;
  const payload: {
    items: BookingItem[];
    trip: Trip;
    contact?: Contact;
  } = { items: state.items, trip: state.trip };
  /* Contact must not outlive a submission — only write it when it has content. */
  if (state.contact.name || state.contact.email) payload.contact = state.contact;
  try {
    store.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* quota / private mode — draft simply does not survive a reload */
  }
}

function emit(): void {
  listeners.forEach((listener) => listener());
}

function setState(patch: Partial<BookingState>): void {
  state = { ...state, ...patch };
  emit();
}

function ensureLoaded(): void {
  if (loaded) return;
  loaded = true;
  const store = storage();
  if (!store) return;
  try {
    const raw = store.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as {
        items?: BookingItem[];
        trip?: Partial<Trip>;
        contact?: Partial<Contact>;
      };
      state = {
        ...state,
        items: Array.isArray(parsed.items) ? parsed.items : [],
        trip: { ...DEFAULT_TRIP, ...(parsed.trip ?? {}) },
        contact: { ...EMPTY_CONTACT, ...(parsed.contact ?? {}) },
      };
      return;
    }
    /* One-time migration from the old enquiry tray key. */
    const legacy = store.getItem(LEGACY_KEY);
    if (legacy) {
      const slugs = JSON.parse(legacy) as unknown;
      state = {
        ...state,
        items: Array.isArray(slugs)
          ? slugs
              .filter((slug): slug is string => typeof slug === "string")
              .map((slug) => ({ slug }))
          : [],
      };
      store.removeItem(LEGACY_KEY);
      persist();
    }
  } catch {
    /* never throw on bad JSON — keep defaults */
  }
}

export function readState(): BookingState {
  ensureLoaded();
  return state;
}

export function useBooking<T>(selector: (s: BookingState) => T): T {
  const getSnapshot = () => selector(readState());
  return useSyncExternalStore(
    (callback) => {
      listeners.add(callback);
      return () => {
        listeners.delete(callback);
      };
    },
    getSnapshot,
    getSnapshot,
  );
}

export function addItem(slug: string): void {
  if (state.items.some((item) => item.slug === slug)) return;
  setState({ items: [...state.items, { slug }] });
  persist();
}

export function removeItem(slug: string): void {
  setState({ items: state.items.filter((item) => item.slug !== slug) });
  persist();
}

export function setTrip(patch: Partial<Trip>): void {
  setState({ trip: { ...state.trip, ...patch } });
  persist();
}

export function setOverride(slug: string, patch: Partial<TripOverride>): void {
  setState({
    items: state.items.map((item) =>
      item.slug === slug ? { ...item, overrides: { ...item.overrides, ...patch } } : item,
    ),
  });
  persist();
}

export function setContact(patch: Partial<Contact>): void {
  setState({ contact: { ...state.contact, ...patch } });
  persist();
}

export function openBooking(opts?: { slug?: string; step?: Step }): void {
  if (opts?.slug) addItem(opts.slug);
  setState({ open: true, step: opts?.step ?? (opts?.slug ? 2 : 1), error: null });
}

export function closeBooking(): void {
  setState({ open: false });
}

export function setStep(step: Step): void {
  setState({ step });
  persist();
}

export function submitStart(): void {
  setState({ submitting: true, error: null });
}

export function submitSuccess(payload: BookingPayload): void {
  setState({ submitting: false, error: null, lastSent: payload, contact: EMPTY_CONTACT });
  persist();
}

export function submitFailure(message: string): void {
  setState({ submitting: false, error: message });
}

export function continuePlanning(): void {
  setState({ lastSent: undefined, step: 1 });
}

export function resetDraft(): void {
  setState({
    open: false,
    step: 1,
    items: [],
    trip: DEFAULT_TRIP,
    contact: EMPTY_CONTACT,
    submitting: false,
    error: null,
    lastSent: undefined,
  });
  persist();
}
