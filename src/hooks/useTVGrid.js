import { useEffect, useRef, useState, useCallback } from "react";
import { DeviceEventEmitter, Platform } from "react-native";

/**
 * TV D-pad hook for Netflix-style multi-section layouts.
 * Each section is a row with its own item count.
 *
 * @param {Array<number>} sections - Array of item counts per section [2, 8, 8, 16]
 * @param {Function} onSelect - Called with { section, item } when center is pressed
 * @returns {{ section: number, item: number }}
 */
export default function useTVGrid({ sections, onSelect }) {
  const [focus, setFocus] = useState({ section: 0, item: 0 });
  const focusRef = useRef({ section: 0, item: 0 });
  const isTV = Platform.isTV;

  useEffect(() => {
    focusRef.current = focus;
  }, [focus]);

  const handleKeyEvent = useCallback(
    (event) => {
      if (!event) return;
      if (event.eventKeyAction !== undefined && event.eventKeyAction !== 0) return;

      const { section, item } = focusRef.current;
      const sectionCount = sections.length;
      const itemCount = sections[section] || 0;

      switch (event.eventType) {
        case "left": {
          if (item > 0) {
            setFocus({ section, item: item - 1 });
          }
          break;
        }
        case "right": {
          if (item < itemCount - 1) {
            setFocus({ section, item: item + 1 });
          }
          break;
        }
        case "up": {
          if (section > 0) {
            const prevItems = sections[section - 1] || 1;
            setFocus({
              section: section - 1,
              item: Math.min(item, prevItems - 1),
            });
          }
          break;
        }
        case "down": {
          if (section < sectionCount - 1) {
            const nextItems = sections[section + 1] || 1;
            setFocus({
              section: section + 1,
              item: Math.min(item, nextItems - 1),
            });
          }
          break;
        }
        case "select": {
          if (onSelect) onSelect({ section, item });
          break;
        }
        default:
          break;
      }
    },
    [sections, onSelect]
  );

  useEffect(() => {
    if (!isTV) return;

    const sub1 = DeviceEventEmitter.addListener("onHWKeyEvent", handleKeyEvent);
    const sub2 = DeviceEventEmitter.addListener("onTVKeyEvent", handleKeyEvent);

    return () => {
      sub1.remove();
      sub2.remove();
    };
  }, [isTV, handleKeyEvent]);

  return focus;
}
