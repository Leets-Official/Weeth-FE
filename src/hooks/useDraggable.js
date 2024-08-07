import { useState, useCallback } from 'react';

// 이벤트 실행에 제한을 둬서 성능 초적화
const throttle = (func, delay) => {
  let timer;
  if (!timer) {
    timer = setTimeout(function () {
      timer = null;
      func();
    }, delay);
  }
};

// eslint-disable-next-line import/prefer-default-export
export const useDraggable = (scrollerRef) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [totalX, setTotalX] = useState(0);

  // 드래그 중 예상치 못한 이벤트 실행 방지
  const preventUnexpectedEffects = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // 드래그 시작 위치 기록
  const onDragStart = (e) => {
    preventUnexpectedEffects(e);
    setIsDragging(true);
    const x = e.clientX;
    setStartX(x);
    if (scrollerRef.current && 'scrollLeft' in scrollerRef.current) {
      setTotalX(x + scrollerRef.current.scrollLeft);
    }
  };

  // 드래그 일정거리 이상일 경우 클릭 이벤트 발생하지 않도록 처리
  const onDragEnd = (e) => {
    if (!isDragging) return;
    if (!scrollerRef.current) return;

    setIsDragging(false);

    const endX = e.clientX;
    const childNodes = [...(scrollerRef.current?.childNodes || [])];
    const dragDiff = Math.abs(startX - endX);

    if (dragDiff > 10) {
      childNodes.forEach((child) => {
        child.addEventListener('click', preventUnexpectedEffects);
      });
    } else {
      childNodes.forEach((child) => {
        child.removeEventListener('click', preventUnexpectedEffects);
      });
    }
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    throttle(function () {
      preventUnexpectedEffects(e);

      const scrollLeft = totalX - e.clientX;

      if (scrollerRef.current && 'scrollLeft' in scrollerRef.current) {
        // eslint-disable-next-line no-param-reassign
        scrollerRef.current.scrollLeft = scrollLeft;
      }
    }, 100);
  };

  return {
    onMouseDown: onDragStart,
    onMouseMove: onDragMove,
    onMouseUp: onDragEnd,
    onMouseLeave: onDragEnd,
  };
};
