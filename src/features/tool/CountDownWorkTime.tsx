import dayjs from "dayjs";

import dayjsDuration from "dayjs/plugin/duration";
import classNames from "classnames";
import styles from "./CountDownWorkTime.module.css";
import { For, createEffect, createSignal } from "solid-js";
dayjs.extend(dayjsDuration);

type Status = "init" | "playing" | "ended";
const WORK_TIME_IN_SEC = 8 * 60 * 60;

export default () => {
  const [status, setStatus] = createSignal<Status>("init");
  return (
    <div class="overflow-hidden relative p-2">
      <h1 class="mt-2 mb-8 text-3xl">下班倒计时</h1>
      <div class="flex flex-1 justify-center items-center">
        {status() === "init" && (
          <button class={styles.button} onClick={() => setStatus("playing")}>
            上班
          </button>
        )}
        {status() === "playing" && (
          <Clock duration={WORK_TIME_IN_SEC} onEnd={() => setStatus("ended")} />
        )}
        {status() === "ended" && (
          <div
            class={classNames(
              "px-4 py-2 text-8xl font-extrabold rounded text-primary dark:text-primary-light",
              styles.gradientText
            )}
          >
            下班不积极，思想有问题！
          </div>
        )}
      </div>
    </div>
  );
};

const Clock = ({
  duration,
  onEnd,
}: {
  duration: number;
  onEnd: () => void;
}) => {
  const renderDot = (active: boolean) => {
    return (
      <div
        class="my-2 border-current rounded-full w-6 h-6 border text-green-600 opacity-60 transition-all"
        classList={{ "bg-current": active }}
      />
    );
  };
  const renderDigit = (digit: string) => {
    const LEN = 4;
    const bits = ("0".repeat(LEN) + Number(digit).toString(2))
      .slice(-LEN)
      .split("");
    return (
      <div class="flex flex-col mx-2">
        <For each={bits}>{(bit) => renderDot(bit === "1")}</For>
      </div>
    );
  };
  const [secondsLeft, setSecondsLeft] = createSignal(duration);

  // 倒计时
  createEffect(() => {
    let last = Date.now();
    let _secondLeft = duration;
    const checkTime = () => {
      if (_secondLeft <= 0) {
        return;
      }
      const now = Date.now();
      const delta = Math.round((now - last) / 1000);
      if (delta >= 1) {
        _secondLeft -= delta;
        if (_secondLeft <= 0) {
          onEnd();
          _secondLeft = 0;
        }
        setSecondsLeft(_secondLeft);
        last = now;
      }
      setTimeout(checkTime, 1000);
    };
    setTimeout(checkTime, 1000);
  });

  const timeStr = () => dayjs.duration(secondsLeft() * 1000).format("HH:mm:ss");
  const parts = () => timeStr().split(":");

  return (
    <div>
      <div class="flex">
        <For each={parts()}>
          {(part) => (
            <div class="flex mx-2">{part.split("").map(renderDigit)}</div>
          )}
        </For>
      </div>
      <div class="flex justify-evenly mt-4 font-mono text-xl text-center text-opacity-80 text-primary dark:text-primary-light">
        <For each={timeStr().split("")}>{(bit) => <span>{bit}</span>}</For>
      </div>
    </div>
  );
};
