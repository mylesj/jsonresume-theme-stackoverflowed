import { SimpleIcon } from 'simple-icons'
import * as icons from 'simple-icons/icons'

import { capitalise } from './capitalise'

export const getIconSvg = (key: string): string | null =>
    (icons as Record<string, SimpleIcon>)[`si${capitalise(key)}`].svg
