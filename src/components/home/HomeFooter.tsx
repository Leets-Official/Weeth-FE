import React, { useRef } from 'react';
import { useDraggable } from '@/hooks/useDraggable';
import * as S from '@/styles/home/HomeFooter.styled';

import leets from '@/assets/images/ic_leets.svg';
import insta from '@/assets/images/ic_insta.svg';
import discord from '@/assets/images/ic_discord.svg';
import github from '@/assets/images/ic_github.svg';
import gradu from '@/assets/images/ic_gradu.svg';
import commitato from '@/assets/images/ic_commitato.svg';
import moodmate from '@/assets/images/ic_moodmate.svg';
import filling from '@/assets/images/ic_filling.svg';
import weeth from '@/assets/images/ic_weeth.svg';
import weneed from '@/assets/images/ic_weneed.svg';

const HomeFooter: React.FC = () => {
  const scrollerRef1 = useRef<HTMLDivElement | null>(null);
  const scrollerRef2 = useRef<HTMLDivElement | null>(null);

  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDraggable(scrollerRef1);
  const draggableHandlers2 = useDraggable(scrollerRef2);

  return (
    <>
      <S.StyledHomeFooter>From Leets</S.StyledHomeFooter>
      <S.ScrollContainer
        ref={scrollerRef1}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <S.GridItem href="https://www.leets.land/" target="_blank">
          <S.ImgContainer>
            <img src={leets} alt="leets" />
          </S.ImgContainer>
          홈페이지
        </S.GridItem>
        <S.GridItem
          href="https://www.instagram.com/leets.official/"
          target="_blank"
        >
          <S.ImgContainer>
            <img src={insta} alt="instagram" />
          </S.ImgContainer>
          Instagram
        </S.GridItem>
        <S.GridItem href="https://discord.gg/XvZqeAca4K" target="_blank">
          <S.ImgContainer>
            <img src={discord} alt="discord" />
          </S.ImgContainer>
          Discord
        </S.GridItem>
        <S.GridItem href="https://github.com/Leets-Official" target="_blank">
          <S.ImgContainer>
            <img src={github} alt="github" />
          </S.ImgContainer>
          Github
        </S.GridItem>
      </S.ScrollContainer>
      <S.StyledHomeFooter>Leets의 프로젝트를 둘러보세요!</S.StyledHomeFooter>
      <S.ScrollContainer
        ref={scrollerRef2}
        onMouseDown={draggableHandlers2.onMouseDown}
        onMouseMove={draggableHandlers2.onMouseMove}
        onMouseUp={draggableHandlers2.onMouseUp}
        onMouseLeave={draggableHandlers2.onMouseLeave}
      >
        <S.GridItemWithImage
          $image={weeth}
          href="https://www.leets.land/project/12"
          target="_blank"
        >
          <span>Weeth</span>
        </S.GridItemWithImage>
        <S.GridItemWithImage
          $image={commitato}
          href="https://www.leets.land/project/13"
          target="_blank"
        >
          <span>COMMITATO</span>
        </S.GridItemWithImage>
        <S.GridItemWithImage
          $image={moodmate}
          href="https://www.leets.land/project/7"
          target="_blank"
        >
          <span>moodmate</span>
        </S.GridItemWithImage>
        <S.GridItemWithImage
          $image={filling}
          href="https://www.leets.land/project/8"
          target="_blank"
        >
          <span>filling</span>
        </S.GridItemWithImage>
        <S.GridItemWithImage
          $image={weneed}
          href="https://www.leets.land/project/11"
          target="_blank"
        >
          <span>weneed</span>
        </S.GridItemWithImage>
        <S.GridItemWithImage
          $image={gradu}
          href="https://www.leets.land/project/10"
          target="_blank"
        >
          <span>Gradu</span>
        </S.GridItemWithImage>
      </S.ScrollContainer>
    </>
  );
};

export default HomeFooter;
