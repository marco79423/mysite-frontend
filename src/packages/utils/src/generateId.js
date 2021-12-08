import {nanoid} from 'nanoid'

/**
 * 產生随機亂數 ID
 * @returns {string}
 */
export default function generateId() {
    return nanoid()
}
