export const WEATHER_ICON_MAP: { [key: number]: string } = {
  0: 'icon-sunny.webp',
  1: 'icon-partly-cloudy.webp',
  2: 'icon-partly-cloudy.webp',
  3: 'icon-overcast.webp',
  45: 'icon-fog.webp',
  48: 'icon-fog.webp',
  51: 'icon-drizzle.webp',
  53: 'icon-drizzle.webp',
  55: 'icon-drizzle.webp',
  56: 'icon-drizzle.webp',
  57: 'icon-drizzle.webp',
  61: 'icon-rain.webp',
  63: 'icon-rain.webp',
  65: 'icon-rain.webp',
  66: 'icon-rain.webp',
  67: 'icon-rain.webp',
  71: 'icon-snow.webp',
  73: 'icon-snow.webp',
  75: 'icon-snow.webp',
  77: 'icon-snow.webp',
  80: 'icon-rain.webp',
  81: 'icon-rain.webp',
  82: 'icon-rain.webp',
  85: 'icon-snow.webp',
  86: 'icon-snow.webp',
  95: 'icon-storm.webp',
  96: 'icon-storm.webp',
  99: 'icon-storm.webp'
};

// Optional helper function
export function getWeatherIcon(code: number): string {
  return WEATHER_ICON_MAP[code] ?? 'icon-sunny.webp';
}
