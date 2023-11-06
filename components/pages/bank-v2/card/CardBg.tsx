import Image from 'next/image'
import cardBg2 from '../images/card-bg.jpg'
import cardBg from '../images/card-bg-2.jpg'
import { useFormContext, useWatch } from 'react-hook-form'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { useRef } from 'react'
import { fadeCss } from '../const'

function CardBg() {
  const {control} = useFormContext()
  const accountType = useWatch({
    control,
    name: 'accountType'
  })
  const bgRef = useRef<HTMLDivElement>(null)

  return (
    <div css={fadeCss}>
      <SwitchTransition>
        <CSSTransition
          key={`accountType-${accountType}`}
          classNames='fade'
          timeout={350}
          nodeRef={bgRef}
        >
          <div ref={bgRef}>
            {
              accountType === 1 ? (
                <Image
                  alt="card-background-2"
                  src={cardBg2}
                  objectFit='cover'
                  layout='responsive'
                />
              ) : (
                <Image
                  alt="card-background"
                  src={cardBg}
                  objectFit='cover'
                  layout='responsive'
                />
              )
            }
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}

export default CardBg
