import React from 'react';
import Svg,{Path,Circle,Rect,Ellipse,Polygon,G} from 'react-native-svg';
import {C} from '../theme';
export type IconName='home'|'planet'|'trophy'|'paw'|'arrow'|'back'|'close'|'check'|'bolt'|'flame'|'search'|'trash'|'star'|'flag'|'book'|'refresh'|'lock'|'shield'|'leaf'|'globe'|'heart'|'info'|'settings'|'external'|'chevron'|'volume'|'sparkles'|'calendar'|'bookmark'|'brain'|'play'|'coins'|'filter';
type Props={name:IconName;size?:number;color?:string;filled?:boolean};
export function Icon({name,size=24,color=C.ink,filled=false}:Props) {
  const fill=filled?color:'none';
  const glyph:Record<IconName,React.ReactNode>={
    home:<><Path d="M3 10.5 12 3l9 7.5M5 9v11h5v-6h4v6h5V9" fill={filled?color:'none'}/></>,
    planet:<><Path d="M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z" fill={filled?color:'none'}/><Path d="M9.5 9a2.6 2.6 0 1 1 3.4 2.5c-.9.35-1.4.9-1.4 1.8v.2M11.5 17h.01" stroke={filled?C.white:color}/></>,
    trophy:<><Path d="M7 3h10v6a5 5 0 0 1-10 0ZM7 5H3v3a4 4 0 0 0 4 4M17 5h4v3a4 4 0 0 1-4 4M12 14v5M8 21h8" fill={fill}/></>,
    paw:<><Path d="M12 11c-2.8 0-3.7 2.7-5.5 4.5C4.2 18 6 21 8.4 20.2c2.5-.8 4.7-.8 7.2 0C18 21 19.8 18 17.5 15.5 15.7 13.7 14.8 11 12 11Z" fill={fill}/><Ellipse cx="5" cy="9" rx="1.8" ry="2.4"/><Ellipse cx="10" cy="5.5" rx="1.8" ry="2.4"/><Ellipse cx="15.5" cy="6" rx="1.8" ry="2.4"/><Ellipse cx="20" cy="10" rx="1.6" ry="2.1"/></>,
    arrow:<Path d="M4 12h16m-6-6 6 6-6 6"/>,
    back:<Path d="M20 12H4m6-6-6 6 6 6"/>,
    close:<Path d="m6 6 12 12M6 18 18 6"/>,
    check:<Path d="m5 12 4.5 4.5L19 7"/>,
    bolt:<Path d="m14 2-9 12h7l-2 8 9-13h-7Z" fill={fill}/>,
    flame:<Path d="M13 2c2 6-1 7-1 9 3 0 4-2 4-4 7 7 4 15-4 15S1 14 6 9c0 3 2 4 3 3-1-4 1-7 4-10Z" fill={fill}/>,
    search:<><Circle cx="10.5" cy="10.5" r="6.5"/><Path d="m16 16 5 5"/></>,
    trash:<><Path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7"/></>,
    star:<Path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z" fill={fill}/>,
    flag:<><Path d="M5 22V3c5-4 9 4 14 0v11c-5 4-9-4-14 0"/><Path d="m8 8 3-2 4 3-3 2Z" strokeWidth="1"/></>,
    book:<><Path d="M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Zm0 0v15M5 8h3M5 12h3m8-4h3m-3 4h3"/></>,
    refresh:<><Path d="M20 8a8 8 0 0 0-14-3L3 8m0-5v5h5m-4 8a8 8 0 0 0 14 3l3-3m0 5v-5h-5"/></>,
    lock:<><Rect x="5" y="10" width="14" height="11" rx="3"/><Path d="M8 10V6a4 4 0 0 1 8 0v4M12 15v2"/></>,
    shield:<><Path d="M12 2 3 6v6c0 5 6 8 9 10 3-2 9-5 9-10V6Z"/><Path d="m8 12 3 3 5-6"/></>,
    leaf:<><Path d="M21 3C9 1 2 5 3 13c1 8 16 13 18-10ZM4 21 17 7M10 15v-5m0 5h5"/></>,
    globe:<><Circle cx="12" cy="12" r="9"/><Ellipse cx="12" cy="12" rx="4" ry="9"/><Path d="M3 12h18"/></>,
    heart:<Path d="M12 21 3.5 13C-3 6 7-1 12 6c5-7 15 0 8.5 7Z" fill={fill}/>,
    info:<><Circle cx="12" cy="12" r="9"/><Path d="M12 11v6M12 7h.01"/></>,
    settings:<><Path d="m10 2-.7 3-2.6 1-2.5-1-2 3 2 2v4l-2 2 2 3 2.5-1 2.6 1L10 22h4l.7-3 2.6-1 2.5 1 2-3-2-2v-4l2-2-2-3-2.5 1-2.6-1L14 2Z"/><Circle cx="12" cy="12" r="3"/></>,
    external:<><Path d="M14 3h7v7m0-7L10 14M10 4H4v16h16v-6"/></>,
    chevron:<Path d="m9 5 7 7-7 7"/>,
    volume:<><Path d="m11 3-6 5H2v8h3l6 5ZM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></>,
    sparkles:<><Path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z" fill={fill}/><Path d="M21 2v4m-2-2h4"/></>,
    calendar:<><Rect x="3" y="5" width="18" height="16" rx="3"/><Path d="M7 2v6m10-6v6M3 11h18m-13 4h1m5 0h1m-7 3h1"/></>,
    bookmark:<Path d="M6 3h12v18l-6-4-6 4Z" fill={fill}/>,
    brain:<><Path d="M9 4a4 4 0 0 0-6 3 4 4 0 0 0 1 7 4 4 0 0 0 5 5V4Zm6 0a4 4 0 0 1 6 3 4 4 0 0 1-1 7 4 4 0 0 1-5 5V4Z"/><Path d="M9 8H6m3 5H5m10-5h3m-3 5h4"/></>,
    play:<Path d="m8 5 11 7-11 7Z" fill={fill}/>,
    coins:<><Ellipse cx="9" cy="7" rx="6" ry="3"/><Path d="M3 7v5c0 2 3 3 6 3s6-1 6-3V7M5 15v3c0 2 3 3 6 3s6-1 6-3v-4"/><Path d="M15 10c3 .2 5 1.2 5 2.5 0 1.5-2.5 2.5-5.5 2.5"/></>,
    filter:<Path d="M3 5h18l-7 8v6l-4 2v-8Z" fill={fill}/>,
  };
  return <Svg width={size} height={size} viewBox="0 0 24 24" accessible={false}>
    <G fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{glyph[name]}</G>
  </Svg>;
}
