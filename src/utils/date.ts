// 获取常用时间
import dayjs, { Dayjs } from 'dayjs';

export const LAST_7_DAYS: [Dayjs, Dayjs] = [dayjs().subtract(7, 'day'), dayjs().subtract(1, 'day')];

export const LAST_30_DAYS: [Dayjs, Dayjs] = [dayjs().subtract(30, 'day'), dayjs().subtract(1, 'day')];
