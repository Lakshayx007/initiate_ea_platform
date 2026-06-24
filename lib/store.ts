import { create } from "zustand";

interface UIState {
  sidebarOpen: boolean;
  searchQuery: string;
  statusFilter: string;
  hostingFilter: string;
  currentPage: number;
  rowsPerPage: number;
  selectedAppId: string | null;
  showBaseline: boolean;
  showTarget: boolean;
  toggleSidebar: () => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (filter: string) => void;
  setHostingFilter: (filter: string) => void;
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
  setSelectedAppId: (id: string | null) => void;
  toggleBaseline: () => void;
  toggleTarget: () => void;
  resetFilters: () => void;
}

export const useStore = create<UIState>((set) => ({
  sidebarOpen: true,
  searchQuery: "",
  statusFilter: "All",
  hostingFilter: "All",
  currentPage: 1,
  rowsPerPage: 10,
  selectedAppId: null,
  showBaseline: true,
  showTarget: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setStatusFilter: (filter) => set({ statusFilter: filter, currentPage: 1 }),
  setHostingFilter: (filter) => set({ hostingFilter: filter, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setRowsPerPage: (rows) => set({ rowsPerPage: rows, currentPage: 1 }),
  setSelectedAppId: (id) => set({ selectedAppId: id }),
  toggleBaseline: () => set((s) => ({ showBaseline: !s.showBaseline })),
  toggleTarget: () => set((s) => ({ showTarget: !s.showTarget })),
  resetFilters: () =>
    set({
      searchQuery: "",
      statusFilter: "All",
      hostingFilter: "All",
      currentPage: 1,
    }),
}));
