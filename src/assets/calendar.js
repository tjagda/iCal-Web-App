/**
 * Summary. Calendar js module
 * Description. Collection of variables + functions for frontend
 * 
 * @author Josh Agda
 * @version 0.1
 */

import ICAL from 'ical.js';

export const monthArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

export function getAllComponents(iCalStr) {
    let jCal = ICAL.parse(iCalStr);
    let jCalProp = new ICAL.Component(jCal);
    return jCalProp.getAllSubcomponents("vevent");
}
