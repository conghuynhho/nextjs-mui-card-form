import { css } from '@emotion/react'
import { useAppSelector } from '../../../../store/hooks'
import { nsBank } from '../../../../store/bankSlice'

function FocusFrame() {
  const focusElementStyle = useAppSelector(state => state[nsBank].focusCardStyles)
  const styles = css(focusElementStyle || '')

  return (
    <div className='card-item__focus'
      css={css`
        position: absolute;
        z-index: 3;
        border-radius: 5px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transition: all 0.35s cubic-bezier(0.71, 0.03, 0.56, 0.85);
        opacity: ${focusElementStyle ? 1 : 0};
        pointer-events: none;
        overflow: hidden;
        border: 2px solid rgba(255, 255, 255, 0.65);

        ${styles}

        &:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: rgb(8, 20, 47);
          height: 100%;
          border-radius: 5px;
          filter: blur(25px);
          opacity: 0.5;
        }

      `}
    />
  )
}

export default FocusFrame
