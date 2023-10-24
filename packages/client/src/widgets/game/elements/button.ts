import { CELL_SIZE, INC_COLOR } from '../utils/constants'
import text from './text'
import { PositionType } from '../types'

const button = async function buttonRender(
  ctx: CanvasRenderingContext2D,
  textButton: string,
  size: number,
  position: PositionType,
  font = '24px Segoeprint'
) {
  ctx.strokeStyle = INC_COLOR

  await text(ctx, textButton, position.x + 10, position.y - 12, font)
  ctx.strokeRect(position.x, position.y - CELL_SIZE, size, CELL_SIZE)
}

export default button
