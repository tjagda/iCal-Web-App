/**
 * Summary. Calendar js module
 * Description. Collection of functions for frontend
 * 
 * @author Josh Agda
 * @version 0.1
 */

import ICAL from 'ical.js';

export function getAllComponents(iCalStr) {
    let jCal = ICAL.parse(iCalStr);
    let jCalProp = new ICAL.Component(jCal);
    return jCalProp.getAllSubcomponents("vevent");
}
