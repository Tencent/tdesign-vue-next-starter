type ColorToken = Record<string, string>;
type ColorSeries = Record<string, ColorToken>;

const BACKGROUND_TOKEN: ColorSeries = {
  BLUE_GREY: {
    '@gray-color-1': '#F1F2F5',
    '@gray-color-2': '#EBEDF1',
    '@gray-color-3': '#E3E6EB',
    '@gray-color-4': '#D6DBE3',
    '@gray-color-5': '#BCC4D0',
    '@gray-color-6': '#97A3B7',
    '@gray-color-7': '#7787A2',
    '@gray-color-8': '#5F7292',
    '@gray-color-9': '#4B5B76',
    '@gray-color-10': '#3C485C',
    '@gray-color-11': '#2C3645',
    '@gray-color-12': '#232A35',
    '@gray-color-13': '#1C222B',
    '@gray-color-14': '#13161B',
  },
  NEUTRAL_GREY: {
    '@gray-color-1': '#F3F3F3',
    '@gray-color-2': '#EEEEEE',
    '@gray-color-3': '#E7E7E7',
    '@gray-color-4': '#DCDCDC',
    '@gray-color-5': '#C5C5C5',
    '@gray-color-6': '#A6A6A6',
    '@gray-color-7': '#8B8B8B',
    '@gray-color-8': '#777777',
    '@gray-color-9': '#5E5E5E',
    '@gray-color-10': '#4B4B4B',
    '@gray-color-11': '#383838',
    '@gray-color-12': '#2C2C2C',
    '@gray-color-13': '#242424',
    '@gray-color-14': '#181818',
  },
};

const COLOR_TOKEN: ColorSeries = {
  DEFAULT: {
    '@brand-color': '#0052D9',
    '@brand-color-1': '#ECF2FE',
    '@brand-color-2': '#D4E3FC',
    '@brand-color-3': '#BBD3FB',
    '@brand-color-4': '#96BBF8',
    '@brand-color-5': '#699EF5',
    '@brand-color-6': '#4787F0',
    '@brand-color-7': '#266FE8',
    '@brand-color-8': '#0052D9',
    '@brand-color-9': '#0034B5',
    '@brand-color-10': '#001F97',
  },
  CYAN: {
    '@brand-color': '#0594FA',
    '@brand-color-1': '#ECF2FE',
    '@brand-color-2': '#D4E3FC',
    '@brand-color-3': '#BBD3FB',
    '@brand-color-4': '#96BBF8',
    '@brand-color-5': '#699EF5',
    '@brand-color-6': '#4787F0',
    '@brand-color-7': '#266FE8',
    '@brand-color-8': '#0052D9',
    '@brand-color-9': '#0034B5',
    '@brand-color-10': '#001F97',
  },
  GREEN: {
    '@brand-color': '#00A870',
    '@brand-color-1': '#ECF2FE',
    '@brand-color-2': '#D4E3FC',
    '@brand-color-3': '#BBD3FB',
    '@brand-color-4': '#96BBF8',
    '@brand-color-5': '#699EF5',
    '@brand-color-6': '#4787F0',
    '@brand-color-7': '#266FE8',
    '@brand-color-8': '#0052D9',
    '@brand-color-9': '#0034B5',
    '@brand-color-10': '#001F97',
  },
  ORANGE: {
    '@brand-color': '#ED7B2F',
    '@brand-color-1': '#ECF2FE',
    '@brand-color-2': '#D4E3FC',
    '@brand-color-3': '#BBD3FB',
    '@brand-color-4': '#96BBF8',
    '@brand-color-5': '#699EF5',
    '@brand-color-6': '#4787F0',
    '@brand-color-7': '#266FE8',
    '@brand-color-8': '#0052D9',
    '@brand-color-9': '#0034B5',
    '@brand-color-10': '#001F97',
  },
  RED: {
    '@brand-color': '#E34D59',
    '@brand-color-1': '#ECF2FE',
    '@brand-color-2': '#D4E3FC',
    '@brand-color-3': '#BBD3FB',
    '@brand-color-4': '#96BBF8',
    '@brand-color-5': '#699EF5',
    '@brand-color-6': '#4787F0',
    '@brand-color-7': '#266FE8',
    '@brand-color-8': '#0052D9',
    '@brand-color-9': '#0034B5',
    '@brand-color-10': '#001F97',
  },
  PINK: {
    '@brand-color': '#ED49B4',
    '@brand-color-1': '#ECF2FE',
    '@brand-color-2': '#D4E3FC',
    '@brand-color-3': '#BBD3FB',
    '@brand-color-4': '#96BBF8',
    '@brand-color-5': '#699EF5',
    '@brand-color-6': '#4787F0',
    '@brand-color-7': '#266FE8',
    '@brand-color-8': '#0052D9',
    '@brand-color-9': '#0034B5',
    '@brand-color-10': '#001F97',
  },
  PURPLE: {
    '@brand-color': '#834ec2',
    '@brand-color-1': '#f3e0ff',
    '@brand-color-2': '#e6c4ff',
    '@brand-color-3': '#d8abff',
    '@brand-color-4': '#c68cff',
    '@brand-color-5': '#ae78f0',
    '@brand-color-6': '#9963d8',
    '@brand-color-7': '#834ec2',
    '@brand-color-8': '#6d3bac',
    '@brand-color-9': '#572796',
    '@brand-color-10': '#421381',
  },
  YELLOW: {
    '@brand-color': '#ebb105',
    '@brand-color-1': '#fff8b8',
    '@brand-color-2': '#ffe478',
    '@brand-color-3': '#fbca25',
    '@brand-color-4': '#ebb105',
    '@brand-color-5': '#d29c00',
    '@brand-color-6': '#ba8700',
    '@brand-color-7': '#a37200',
    '@brand-color-8': '#8c5f00',
    '@brand-color-9': '#754c00',
    '@brand-color-10': '#5e3a00',
  },
};

function toUnderline(name: string): string {
  return name.replace(/([A-Z])/g, '_$1').toUpperCase();
}

export function getGreyColor(type: string): ColorToken {
  const name = toUnderline(type);
  return BACKGROUND_TOKEN[name] || {};
}

export function getBrandColor(type: string): ColorToken {
  const name = toUnderline(type);
  return COLOR_TOKEN[name] || COLOR_TOKEN.DEFAULT;
}

export function getColorList(colorArray: [ColorToken]): string[] {
  const pureColorList = [];
  colorArray.map((colorToken) => Object.keys(colorToken).map((key) => pureColorList.push(colorToken[key])));

  return pureColorList;
}
