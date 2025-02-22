import {create} from "zustand";

export const useStore = create<{ collapsed: boolean; updateCollapsed: () => void }>((set) => ({
    collapsed: false,
    updateCollapsed: () => set(state => ({collapsed: !state.collapsed}))
}));
