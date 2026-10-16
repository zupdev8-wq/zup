export const C = {
  ink:'#111214', muted:'#6E7077', cream:'#FBFAF7', white:'#FFFFFF',
  yellow:'#F4C318', lemon:'#FFF2A8', pink:'#F28EB8', pinkLight:'#FBE1EC',
  green:'#6CD29F', greenLight:'#DEF5E9', blue:'#75BCEE', blueLight:'#DDEFFA',
  line:'#E5E4DF', silver:'#F0F1F2', orange:'#F2A452', red:'#C64B62',
  success:'#15945F', shadow:'#181818', charcoal:'#222327', soft:'#F7F5EF',
} as const;
export const shadow = {shadowColor:C.shadow,shadowOpacity:0.055,shadowRadius:16,shadowOffset:{width:0,height:7},elevation:2};
export const MAX_WIDTH = 760;
export const round = (n:number)=>({borderRadius:n});
