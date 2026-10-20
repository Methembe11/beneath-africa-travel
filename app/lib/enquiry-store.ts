"use client";

import { useSyncExternalStore } from "react";

/**
 * The "add to enquiry" selection.
 *
 * Stored in localStorage and read through useSyncExternalStore so the value
 * survives navigation and reloads without setting state inside an effect.
 * The server snapshot is always empty, so the tray simply appears once the
 * page has hydrated.
 */

const STORAGE_KEY = "ba-enquiry";

let items: string[] = [];
let loaded = false;
const listeners = new Set<() => void>();

function ensureLoaded() {
  if (loaded) return;
  loaded = true;
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      items = parsed.filter((value): value is string => typeof value === "string");
    }
  } catch {
    /* ignore malformed or unavailable storage */
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* storage may be unavailable; keep the in-memory selection */
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): string[] {
  ensureLoaded();
  return items;
}

const EMPTY: string[] = [];
function getServerSnapshot(): string[] {
  return EMPTY;
}

export function useEnquiryItems(): string[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function addItem(slug: string) {
  ensureLoaded();
  if (items.includes(slug)) return;
  items = [...items, slug];
  persist();
  emit();
}

export function removeItem(slug: string) {
  ensureLoaded();
  if (!items.includes(slug)) return;
  items = items.filter((value) => value !== slug);
  persist();
  emit();
}

export function toggleItem(slug: string) {
  ensureLoaded();
  if (items.includes(slug)) {
    removeItem(slug);
  } else {
    addItem(slug);
  }
}

export function clearItems() {
  ensureLoaded();
  if (items.length === 0) return;
  items = [];
  persist();
  emit();
}
