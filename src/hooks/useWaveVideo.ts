import { useRef, useCallback, useEffect } from "react";

const BASE_SCALE = 1;
const WAVE_SCALE = 1.12;
const NORMAL_OPACITY = 0.7;
const DARK_OPACITY = 0;

export function useWaveVideo(
  videoRef: React.RefObject<HTMLVideoElement>
) {
  const isPlayingWave = useRef(false);
  const isDark = useRef(false);
  const waveQueue = useRef(0);
  const fadeTimerRef = useRef<NodeJS.Timeout>();

  const loopStart = 0;
  const loopEnd = 3;
  const waveStart = 3;

  const getScale = (video: HTMLVideoElement) => {
    const match = video.style.transform.match(/scale\(([\d.]+)\)/);
    return match ? parseFloat(match[1]) : BASE_SCALE;
  };

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 2);

  const animateScale = (
    video: HTMLVideoElement,
    from: number,
    to: number,
    duration: number
  ) => {
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOut(progress);
      const scale = from + (to - from) * eased;
      video.style.transform = `scale(${scale})`;
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  };

  const fadeOut = (
    video: HTMLVideoElement,
    duration: number,
    targetOpacity: number,
    onComplete: () => void
  ) => {
    const start = performance.now();
    const initialOpacity = parseFloat(
      video.style.opacity || String(NORMAL_OPACITY)
    );

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const opacity =
        initialOpacity + (targetOpacity - initialOpacity) * progress;
      video.style.opacity = String(opacity);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        onComplete();
      }
    };
    requestAnimationFrame(tick);
  };

  const fadeIn = (
    video: HTMLVideoElement,
    duration: number,
    onComplete?: () => void
  ) => {
    const start = performance.now();
    const initialOpacity = parseFloat(video.style.opacity || "0");

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOut(progress);
      const opacity =
        initialOpacity + (NORMAL_OPACITY - initialOpacity) * eased;
      video.style.opacity = String(opacity);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        onComplete?.();
      }
    };
    requestAnimationFrame(tick);
  };

  const startWaveZoom = (video: HTMLVideoElement) => {
    animateScale(video, getScale(video), WAVE_SCALE, 800);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.transformOrigin = "center center";
    video.style.transform = `scale(${BASE_SCALE})`;
    video.style.opacity = String(NORMAL_OPACITY);

    const playWave = () => {
      isDark.current = false;
      isPlayingWave.current = true;
      video.currentTime = waveStart;
      startWaveZoom(video);
      video.play();
    };

    const onTimeUpdate = () => {
      if (isPlayingWave.current || isDark.current) return;
      if (video.currentTime >= loopEnd) {
        video.currentTime = loopStart;
      }
    };

    const onEnded = () => {
      animateScale(video, getScale(video), BASE_SCALE, 500);

      fadeOut(video, 400, DARK_OPACITY, () => {
        video.currentTime = loopStart;
        video.pause();
        video.style.opacity = String(DARK_OPACITY);
        isDark.current = true;
        isPlayingWave.current = false;

        if (waveQueue.current > 0) {
          waveQueue.current = 0;
          fadeTimerRef.current = setTimeout(() => {
            fadeIn(video, 500, playWave);
          }, 300);
        }
      });
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef]);

  const triggerWave = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const playWave = () => {
      isDark.current = false;
      isPlayingWave.current = true;
      video.currentTime = waveStart;
      startWaveZoom(video);
      video.play();
    };

    if (isPlayingWave.current) {
      waveQueue.current += 1;
      return;
    }

    if (isDark.current) {
      fadeIn(video, 500, playWave);
      return;
    }

    playWave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef]);

  return { triggerWave };
}
