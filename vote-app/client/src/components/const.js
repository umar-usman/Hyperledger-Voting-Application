export const URL =  window.location.protocol+"//"+window.location.hostname;
var api = URL+':8080';
if(window.location.hostname!='location')
  api = 'http://localhost:3002'
export const API=api;
