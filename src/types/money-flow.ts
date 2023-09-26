/** 一条记录 */
export interface FlowRecord {
  id: number | string;
  tag?: string; // 类别
  dir: number; // -1 支出 / 1收入
  balance: string; // 金额
  time: number;
}

export const TimeRange = {
  Today: { value: "Today", label: "今日" },
  ThisWeek: { value: "ThisWeek", label: "本周" },
  ThisMonth: { value: "ThisMonth", label: "本月" },
  ThisQuarter: { value: "ThisQuarter", label: "本季度" },
  ThisYear: { value: "ThisYear", label: "本年度" },
};
