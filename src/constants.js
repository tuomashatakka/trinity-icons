
import { catalog } from './models/IconCatalog'
import { updatePreviewStyles } from './utils'

export const INPUT_TYPE_CHECKBOX = 'checkbox'
export const INPUT_TYPE_RADIO    = 'radio'

export const ACTION = {
  search:  value => catalog().query(value.trim()),
  variant: value => catalog().updateVariants(...value),
  stroke:  () => updatePreviewStyles(),
  color:   () => updatePreviewStyles(),
  size:    () => updatePreviewStyles(),
}
export const PREVIEW_SIZE = {
  xsmall: '24px',
  small:  '48px',
  medium: '80px',
  large:  '160px',
  huge:   '320px',
}
export const SIZE_FACTOR = {
  xsmall: 10,
  small:  8,
  medium: 6,
  large:  4,
  huge:   2,
}
