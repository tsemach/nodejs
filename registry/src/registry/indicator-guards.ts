import { Indicator } from "./indicator";

export function isIndicator(indicator: string | Indicator): indicator is Indicator {
  return indicator instanceof Indicator
}