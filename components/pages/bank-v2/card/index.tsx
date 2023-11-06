import { css } from '@emotion/react'
import { CardBreakpoints } from '../const'
import FocusFrame from './FocusFrame'
import CardTop from './CardTop'
import CardNumber from './CardNumber'
import CardContent from './CardContent'
import { Zoom } from '@mui/material'
import CardBg from './CardBg'

function Index() {
  return (
    <Zoom in={true} timeout={400}>
      <div
        className='card-list'
        css={css`
        margin-bottom: -130px;
        @media screen and (max-width: ${CardBreakpoints.small}) {
          margin-bottom: -120px;
        }
      `}
      >
        <div
          className='card-item -active'
          css={css`
          max-width: 430px;
          height: 270px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 2;
          width: 100%;

          @media screen and (max-width: ${CardBreakpoints.small}) {
            max-width: 310px;
            height: 220px;
            width: 90%;
          }

          @media screen and (max-width: ${CardBreakpoints.smallest}) {
            height: 180px;
          }
        `}>
          <div
            className='card-item__side -front'
            css={css`
            border-radius: 15px;
            overflow: hidden;
             //box-shadow: 3px 13px 30px 0px rgba(11, 19, 41, 0.5);
            //box-shadow: 0 20px 60px 0 rgba(14, 42, 90, 0.55);
              box-shadow: rgba(0, 0, 0, 0.45) 0 4px 8px -1px, rgba(0, 0, 0, 0.26) 0 2px 8px -1px;
            transform: perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg);
            transform-style: preserve-3d;
            transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
            backface-visibility: hidden;
            height: 100%;
          `}
          >
            <FocusFrame />
            <div
              className='card-item__cover'
              css={css`
              height: 100%;
              background-color: #1c1d27;
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              border-radius: 15px;
              overflow: hidden;

              &:after {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: rgba(6, 2, 29, 0.45);
              }
            `}
            >
              <CardBg />
            </div>

            <div
              className='card-item__wrapper'
              css={css`
              font-family: "Source Code Pro", monospace;
              padding: 25px 15px 15px 20px;
              position: relative;
              z-index: 4;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              text-shadow: 7px 6px 10px rgba(14, 42, 90, 0.8);
              user-select: none;
              @media screen and (max-width: ${CardBreakpoints.small}) {
                padding: 20px 10px 10px 15px;
              }
            `}
            >
              <CardTop />

              <CardNumber />

              <CardContent />

            </div>
          </div>
        </div>
      </div>
    </Zoom>
  )
}

export default Index
