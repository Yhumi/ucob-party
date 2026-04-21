import { atom } from 'nanostores';
import { Role } from '../types/pfListings';

export const showCobEnjoyersState = atom(true);
export const showCobFriendsState = atom(true);
export const showOthersState = atom(true);
export const listingSearchState = atom("");
export const roleFilterState = atom<Role[]>([Role.Tank, Role.Healer, Role.DPS]);

export const showHighlightingState = atom(true);
