import { useEffect, useRef, useState, useCallback } from "react";
import { DeviceEventEmitter, Platform } from "react-native";

/**
 * Custom hook for Android TV D-pad navigation.
 * Listens for D-pad key events and manages focused index in a grid.
 *
 * @param {number} itemCount - Total number of focusable items
 * @param {number} columns  - Number of columns in the grid layout
 * @param {Function} onSelect - Called with focusedIndex when center/select is pressed
 * @returns {{ focusedIndex: number }}
 */
export default function useTVDpad({ itemCount, columns = 1, onSelect }) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const focusedRef = useRef(0);
  const isTV = Platform.isTV;

  useEffect(() => {
    focusedRef.current = focusedIndex;
  }, [focusedIndex]);

  const handleKeyEvent = useCallback(
    (event) => {
      if (!event) return;
      // Only handle ACTION_DOWN (0)
      if (event.eventKeyAction !== undefined && event.eventKeyAction !== 0) return;

      const current = focusedRef.current;
      const row = Math.floor(current / columns);
      const col = current % columns;

      switch (event.eventType) {
        case "left": {
          if (col > 0) setFocusedIndex(current - 1);
          break;
        }
        case "right": {
          if (col < columns - 1 && current + 1 < itemCount)
            setFocusedIndex(current + 1);
          break;
        }
        case "up": {
          if (row > 0) setFocusedIndex(current - columns);
          break;
        }
        case "down": {
          let next = current + columns;
          // If exact position doesn't exist, snap to last item in next row
          if (next >= itemCount && current < itemCount - 1) {
            next = itemCount - 1;
          }
          if (next < itemCount) setFocusedIndex(next);
          break;
        }
        case "select": {
          if (onSelect) onSelect(current);
          break;
        }
        default:
          break;
      }
    },
    [itemCount, columns, onSelect]
  );

  useEffect(() => {
    if (!isTV) return;

    // Listen for BOTH the built-in RN event and our custom native module event
    const sub1 = DeviceEventEmitter.addListener("onHWKeyEvent", handleKeyEvent);
    const sub2 = DeviceEventEmitter.addListener("onTVKeyEvent", handleKeyEvent);

    return () => {
      sub1.remove();
      sub2.remove();
    };
  }, [isTV, handleKeyEvent]);

  return { focusedIndex };
}
