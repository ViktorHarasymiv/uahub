import { create } from "zustand";
import { getUserLocation } from "../config/getUserLocation";
import { getAddressFromCoords } from "../config/getAddressFromCoords.";

interface LocationState {
  location: string;
  loading: boolean;
  error: string | null;
  fetchLocation: () => Promise<void>;
}

export const useLocationStore = create<LocationState>((set) => ({
  location: "",
  loading: false,
  error: null,

  fetchLocation: async () => {
    try {
      set({ loading: true, error: null });

      const coords = await getUserLocation();
      const address = await getAddressFromCoords(coords.lat, coords.lng);

      const city = address.city || address.town || address.village || "Unknown";
      const district = address.suburb || address.neighbourhood || "";

      const loc = district ? `${city}, ${district}` : city;

      set({ location: loc, loading: false });
    } catch (err) {
      set({
        location: "Unknown",
        loading: false,
        error: "Geolocation blocked",
      });
    }
  },
}));
